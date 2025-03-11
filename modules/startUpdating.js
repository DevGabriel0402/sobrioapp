import { calculateTime } from "../calculateTime.js";

let updateInterval = null;

export function startUpdating(startDate) {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  updateInterval = setInterval(() => {
    calculateTime(startDate);
  }, 1000);

  // Limpa o intervalo ao fechar a página
  window.addEventListener("beforeunload", () => {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
  });
}
