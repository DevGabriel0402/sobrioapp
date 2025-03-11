export function setupModalConfig() {
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
}
