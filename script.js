let updateInterval = null;

window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".container").classList.remove("hidden-container");
    document.getElementById("loading").classList.add("hidden-container");
    document.getElementById("config").classList.remove("hidden-container");
  }, 1500);

  const modalItem = document.getElementById("modal");
  const modalEstado = localStorage.getItem("modal");

  if (modalEstado === "modalFechado") {
    modalItem.classList.add("hidden");
  } else {
    modalItem.classList.remove("hidden");
  }

  loadSavedDate();
});

// Função para calcular o tempo de sobriedade
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

  const remainingHours = String(hoursSober % 24).padStart(2, "0");
  const remainingMinutes = String(minutesSober % 60).padStart(2, "0");
  const remainingSeconds = String(secondsSober % 60).padStart(2, "0");

  document.getElementById("days").innerText = daysSober === 1 ? `${daysSober} dia` : `${daysSober} dias`;
  document.getElementById("hours").innerText = remainingHours === "01" ? `${remainingHours} hora` : `${remainingHours} horas`;
  document.getElementById("minutes").innerText = remainingMinutes === "01" ? `${remainingMinutes} minuto` : `${remainingMinutes} minutos`;
  document.getElementById("seconds").innerText = remainingSeconds === "01" ? `${remainingSeconds} segundo` : `${remainingSeconds} segundos`;

  document.getElementById("bg-1").style.width = `${Math.min((daysSober / 365) * 100, 100)}%`;
  document.getElementById("bg-2").style.width = `${(remainingHours / 23) * 100}%`;
  document.getElementById("bg-3").style.width = `${(remainingMinutes / 59) * 100}%`;
  document.getElementById("bg-4").style.width = `${(remainingSeconds / 59) * 100}%`;
}

// Função para iniciar ou reiniciar o intervalo de atualização
function startUpdating(startDate) {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  updateInterval = setInterval(() => {
    calculateTime(startDate);
  }, 1000);
}

// Função para carregar a data salva e calcular o tempo automaticamente
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

// Função principal ao clicar no botão de calcular
function handleCalculate(e) {
  e.preventDefault();
  const startDateValue = document.getElementById("start-date").value;
  const startDate = new Date(startDateValue);
  const vicioValue = document.getElementById("input-vicio").value;

  if (vicioValue === "nenhum") {
    alert("Informe um vício.");
    return;
  }

  document.getElementById("modal").classList.add("hidden");

  localStorage.setItem("soberStartDate", startDateValue);
  localStorage.setItem("vicio", vicioValue);

  document.getElementById("start-date").value = startDate;
  document.getElementById("vicio").innerText = vicioValue;

  calculateTime(startDate);
  startUpdating(startDate);
}

// Função para resetar o contador
const handleReset = (e) => {
  e.preventDefault();

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = hoje.getFullYear();
  const horas = String(hoje.getHours()).padStart(2, "0");
  const minutos = String(hoje.getMinutes()).padStart(2, "0");

  const vicioValue = document.getElementById("input-vicio").value;

  if (vicioValue === "nenhum") {
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

// Adiciona event listeners apenas se os elementos existirem
const btnCalculate = document.querySelector("#calculate");
const btnReset = document.querySelector("#reset");

if (btnCalculate) btnCalculate.addEventListener("click", handleCalculate);
if (btnReset) btnReset.addEventListener("click", handleReset);

// Limpa o intervalo ao fechar a página
window.addEventListener("beforeunload", () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});

// Configuração do modal
const configButton = document.getElementById("config");

if (configButton) {
  configButton.addEventListener("click", () => {
    const modal = document.querySelector("#modal");
    const imgConfig = document.getElementById("img-config");
    modal.classList.toggle("hidden");

    if (modal.classList.contains("hidden")) {
      imgConfig.src = "./assets/config.svg";

    } else {
      imgConfig.src = "./assets/arrow.svg";

    }
  });
}
