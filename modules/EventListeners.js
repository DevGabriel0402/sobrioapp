import { handleCalculate } from "./handleCalculate.js";
import { handleReset } from "./handleReset.js";

export function setupEventListeners() {
  document.querySelector("#calculate").addEventListener("click", handleCalculate);
  document.querySelector("#reset").addEventListener("click", handleReset);
}
