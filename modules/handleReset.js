import { calculateTime } from "../calculateTime.js";
import { startUpdating } from "./startUpdating.js";

export function handleReset(e) {
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
}
