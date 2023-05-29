// Função para enviar a URL da aba ativa para o contentScript.js
const enviarURLAtiva = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const url = tabs[0].url;
    chrome.tabs.sendMessage(tabs[0].id, { url: url });
  });
}

// Executar a função enviarURLAtiva quando a extensão é instalada ou atualizada
chrome.runtime.onInstalled.addListener(enviarURLAtiva);

// Executar a função enviarURLAtiva quando a URL da aba ativa é alterada
chrome.tabs.onUpdated.addListener(enviarURLAtiva);
