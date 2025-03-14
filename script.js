let updateInterval = null;

window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".container").classList.remove("hidden-container");
    document.getElementById("loading").classList.add("hidden-container");
    document.getElementById("config").classList.remove("hidden-container");
    document.querySelector("footer").classList.remove("hidden-container");
   
    loadSavedDate();
  }, 1500);
});

function calculateTime(startDate) {
  const today = new Date();

  if (!startDate || isNaN(startDate.getTime()) || startDate > today) {
    document.getElementById("days").innerText = `0`;
    document.getElementById("bg-1").style.width = `0%`;
    document.getElementById("hours").innerText = `0`;
    document.getElementById("bg-2").style.width = `0%`;
    document.getElementById("minutes").innerText = `0`;
    document.getElementById("bg-3").style.width = `0%`;
    document.getElementById("seconds").innerText = `0`;
    document.getElementById("bg-4").style.width = `0%`;
    return;
  }

  const timeDiff = today - startDate;
  const secondsSober = Math.floor(timeDiff / 1000);
  const minutesSober = Math.floor(secondsSober / 60);
  const hoursSober = Math.floor(minutesSober / 60);
  const daysSober = Math.floor(hoursSober / 24);

  const remainingHours =  hoursSober % 24 ;
  const remainingMinutes = minutesSober % 60 ;
  const remainingSeconds = secondsSober % 60 ;

  document.getElementById("days").innerText = daysSober === 1 ? `${daysSober} dia` : `${daysSober} dias`;
  document.getElementById("hours").innerText = remainingHours === 1 ? `${remainingHours} hora` : `${remainingHours} horas`;
  document.getElementById("minutes").innerText = remainingMinutes === 1 ? `${remainingMinutes} minuto` : `${remainingMinutes} minutos`;
  document.getElementById("seconds").innerText = remainingSeconds === 1 ? `${remainingSeconds} segundo` : `${remainingSeconds} segundos`;

  document.getElementById("bg-1").style.width = `${Math.min((daysSober / 365) * 100, 100)}%`;
  document.getElementById("bg-2").style.width = `${(remainingHours / 23) * 100}%`;
  document.getElementById("bg-3").style.width = `${(remainingMinutes / 59) * 100}%`;
  document.getElementById("bg-4").style.width = `${(remainingSeconds / 59) * 100}%`;
}


function startUpdating(startDate) {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  updateInterval = setInterval(() => {
    calculateTime(startDate);
  }, 1000);
}


function loadSavedDate() {
  const savedDate = localStorage.getItem("soberStartDate");
  const dateInput = document.getElementById("start-date");
  const vicio = document.getElementById("vicio");
  const vicioInput = localStorage.getItem("vicio");
  const modalEstado = localStorage.getItem("modal");

  if (savedDate) {
    dateInput.value = savedDate;
    const startDate = new Date(savedDate);

    if (modalEstado === "modalFechado") {
      document.getElementById("modal").classList.add("hidden");
    } else {
      document.getElementById("modal").classList.remove("hidden");
    }

    if (vicioInput) {
      vicio.innerText = vicioInput;
    }

    calculateTime(startDate);
    startUpdating(startDate);
  }
}


function handleCalculate(e) {
  e.preventDefault();
  const startDateValue = document.getElementById("start-date").value;
  const startDate = new Date(startDateValue);
  const vicioValue = document.getElementById("input-vicio").value;

  if (!vicioValue || vicioValue === "nenhum" || !startDateValue) {
    alert("Informe um vício e uma data válida.");
    return;
  }

  document.getElementById("modal").classList.add("hidden");
  localStorage.setItem("modal", "modalFechado");
  localStorage.setItem("soberStartDate", startDateValue);
  localStorage.setItem("vicio", vicioValue);

  document.getElementById("vicio").innerText = vicioValue;

  calculateTime(startDate);
  startUpdating(startDate);
}


const handleReset = (e) => {
  e.preventDefault();

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const horas = String(hoje.getHours()).padStart(2, "0");
  const minutos = String(hoje.getMinutes()).padStart(2, "0");

  const vicioValue = document.getElementById("input-vicio").value;

  if (!vicioValue || vicioValue === "nenhum") {
    alert("Informe um vício.");
    return;
  }

  const resetTime = `${ano}-${mes}-${dia}T${horas}:${minutos}`;

  localStorage.setItem("soberStartDate", resetTime);
  localStorage.setItem("vicio", vicioValue);

  document.getElementById("start-date").value = resetTime;
  document.getElementById("vicio").innerText = vicioValue;

  const startDate = new Date(resetTime);
  calculateTime(startDate);
  startUpdating(startDate);
};


const btnCalculate = document.querySelector("#calculate");
const btnReset = document.querySelector("#reset");

if (btnCalculate) btnCalculate.addEventListener("click", handleCalculate);
if (btnReset) btnReset.addEventListener("click", handleReset);


window.addEventListener("beforeunload", () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});


const configButton = document.getElementById("config");

if (configButton) {
  configButton.addEventListener("click", (e) => {
    const modal = document.querySelector("#modal");
    modal.classList.toggle("hidden");

    if (modal.classList.contains("hidden")) {
      localStorage.setItem("modal", "modalFechado");
     
    } else {
      localStorage.setItem("modal", "modalAberto");
    }
  });
}

document.addEventListener('click', (e) => {
  const modal = document.querySelector("#modal");
  if (!modal.contains(e.target) && !configButton.contains(e.target)){
    modal.classList.add("hidden");
    localStorage.setItem("modal", "modalFechado");
    
  }
})

document.getElementById('instagram').onclick = () => {
  window.open('https://instagram.com/eu.gabrielvieira', '_blank')
}