import { calculateTime } from "../calculateTime.js";
import { startUpdating } from "./startUpdating.js";

export function loadSavedDate() {
  const savedDate = localStorage.getItem("soberStartDate");
  const dateInput = document.getElementById("start-date");
  const vicio = document.getElementById("vicio");
  const vicioInput = localStorage.getItem("vicio");

  if (savedDate) {
    dateInput.value = savedDate;
    const startDate = new Date(savedDate);
    if (vicioInput) {
      vicio.innerText = vicioInput;
    }
    calculateTime(startDate);
    startUpdating(startDate);
  }
}
