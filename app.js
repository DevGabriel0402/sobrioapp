// import { calculateTime } from "./modules/calculateTime.js";
// import { startUpdating } from "./modules/startUpdating.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { loadSavedDate } from "./modules/loadSavedDate.js";
import { setupModalConfig } from "./modules/modalConfig.js";

// Carregamento inicial da página
window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".container").classList.remove("hidden-container");
    document.getElementById("loading").classList.add("hidden-container");
    document.getElementById("config").classList.remove("hidden-container");
  }, 1500);

  loadSavedDate(); // Carrega a data salva ao iniciar
});

// Configuração inicial do modal
document.addEventListener("DOMContentLoaded", () => {
  const modalItem = document.getElementById("modal");
  const modalEstado = localStorage.getItem("modal");

  if (modalEstado === "modalFechado") {
    modalItem.classList.add("hidden");
  } else {
    modalItem.classList.remove("hidden");
  }
});

// Inicializa os eventos e configuração do modal
setupEventListeners();
setupModalConfig();
