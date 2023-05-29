
(() => {
    botaoElement = document.getElementById("ClickTesterRecord");
    botaoElement.addEventListener("click", () => {
        if (botaoElement.innerText === "Parar gravação") {
            botaoElement.innerText = "Iniciar gravação";
            chrome.runtime.sendMessage({ehParaGravar: false});
        } else {
            botaoElement.innerText = "Parar gravação";
            chrome.runtime.sendMessage({ehParaGravar: true});
        }
    });
})();