import { calculateTime } from "./calculateTime";
import { startUpdating } from "./modules/startUpdating";
let updateInterval = null;

window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".container").classList.remove("hidden-container");
    document.getElementById("loading").classList.add("hidden-container");
    document.getElementById("config").classList.remove("hidden-container");
  }, 1500);
});

document.addEventListener("DOMContentLoaded", () => {
  const modalItem = document.getElementById("modal");
  const modalEstado = localStorage.getItem("modal");

  if (modalEstado === "modalFechado") {
    modalItem.classList.add("hidden");
  } else {
    modalItem.classList.remove("hidden");
  }
});

// Função para calcular o tempo de sobriedade com dias, horas, minutos e segundos
// function calculateTime(startDate) {
//   const today = new Date();

//   if (!startDate || isNaN(startDate.getTime()) || startDate > today) {
//     document.getElementById("days").innerText = `0`;
//     document.getElementById("bg-1").style.width = `0%`;
//     document.getElementById("hours").innerText = `0`;
//     document.getElementById("bg-2").style.width = `0%`;
//     document.getElementById("minutes").innerText = `0`;
//     document.getElementById("bg-3").style.width = `0%`;
//     document.getElementById("seconds").innerText = `0`;
//     document.getElementById("bg-4").style.width = `0%`;
//     return;
//   }

//   const timeDiff = today - startDate;
//   const secondsSober = Math.floor(timeDiff / 1000);
//   const minutesSober = Math.floor(secondsSober / 60);
//   const hoursSober = Math.floor(minutesSober / 60);
//   const daysSober = Math.floor(hoursSober / 24) < 2 ? Math.floor(hoursSober / 24) : String(Math.floor(hoursSober / 24)).padStart(2, "0");

//   const remainingHours = hoursSober === 0 ? hoursSober % 24 : String(hoursSober % 24).padStart(2, "0");
//   const remainingMinutes = minutesSober === 0 ? minutesSober % 60 : String(minutesSober % 60).padStart(2, "0");
//   const remainingSeconds = secondsSober === 0 ? secondsSober % 60 : String(secondsSober % 60).padStart(2, "0");

//   document.getElementById("days").innerText = daysSober === 1 ? `${daysSober} dia` : `${daysSober} dias`;
//   document.getElementById("hours").innerText = remainingHours === 1 ? `${remainingHours} hora` : `${remainingHours} horas`;
//   document.getElementById("minutes").innerText = remainingMinutes === 1 ? `${remainingMinutes} minuto` : `${remainingMinutes} minutos`;
//   document.getElementById("seconds").innerText = remainingSeconds === 1 ? `${remainingSeconds} segundo` : `${remainingSeconds} segundos`;

//   const dayPercentage = Math.min((daysSober / 365) * 100, 100);
//   const hoursPercentage = (remainingHours / 23) * 100;
//   const minutesPercentage = (remainingMinutes / 59) * 100;
//   const secondsPercentage = (remainingSeconds / 59) * 100;

//   document.getElementById("bg-1").style.width = `${dayPercentage}%`;
//   document.getElementById("bg-2").style.width = `${hoursPercentage}%`;
//   document.getElementById("bg-3").style.width = `${minutesPercentage}%`;
//   document.getElementById("bg-4").style.width = `${secondsPercentage}%`;
// }

// Função para iniciar ou reiniciar o intervalo de atualização
function startUpdating(startDate) {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  updateInterval = setInterval(() => {
    calculateTime(startDate);
  }, 1000); // Atualiza a cada 1 segundo
}

// Função para carregar a data salva e calcular o tempo automaticamente
function loadSavedDate() {
  const savedDate = localStorage.getItem("soberStartDate");
  const dateInput = document.getElementById("start-date");
  const vicio = document.getElementById("vicio");
  const vicioInput = localStorage.getItem("vicio");
  const modal = localStorage.getItem("modal");

  if (savedDate) {
    dateInput.value = savedDate;
    const startDate = new Date(savedDate);
    document.getElementById("modal").classList.contains(modal);
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
  const modalOpen = document.getElementById("modal");

  if (!vicioValue) {
    alert("Informe um vício.");
    return;
  }

  localStorage.setItem("soberStartDate", startDateValue);
  localStorage.setItem("vicio", vicioValue);

  modal.classList.add("hidden");

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

  if (!vicioValue) {
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

// Carrega a data salva ao abrir a página
window.addEventListener("load", loadSavedDate);

// Vincula os eventos aos botões usando addEventListener
document.querySelector("#calculate").addEventListener("click", handleCalculate);
document.querySelector("#reset").addEventListener("click", handleReset);

// Limpa o intervalo ao fechar a página
window.addEventListener("beforeunload", () => {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});

// Configuração do modal
document.getElementById("config").addEventListener("click", () => {
  const modal = document.querySelector("#modal");
  const imgConfig = document.getElementById("img-config");
  modal.classList.toggle("hidden");

  if (modal.classList.contains("hidden")) {
    imgConfig.src = "./assets/config.svg";
    localStorage.setItem("modal", "modalFechado");
  } else {
    imgConfig.src = "./assets/arrow.svg";
    localStorage.setItem("modal", "modalAberto");
  }
});
