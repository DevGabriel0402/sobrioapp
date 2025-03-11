import { calculateTime } from "../calculateTime.js";
import { startUpdating } from "./startUpdating.js";

export function handleCalculate(e) {
  e.preventDefault();
  const startDateValue = document.getElementById("start-date").value;
  const startDate = new Date(startDateValue);
  const vicioValue = document.getElementById("input-vicio").value;
  const modal = document.getElementById("modal");

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
