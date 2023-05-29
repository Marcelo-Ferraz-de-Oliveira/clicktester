(() => {
  const IdBar = "ClickTesterBar";
  const HTMLBase = "<p>Barra de acompanhamento do ClickTester</p>";
  // Array que armazena cada interação do site
  let interacoes = [];
  let urlAtiva = ""
  let ehParaGravar = true
  // Recebe mensagem do background.js com a url,
  // usa a url como chave para o storage e
  // resgata o que já foi gravado para aquela url
  const getUrlAtiva = (url) => {
        // Ignora submit na URL
        urlAtiva = url.split("?")[0];
        console.log("Url ativa: " + urlAtiva);
        (async () => {
          resultado = await chrome.storage.local.get([urlAtiva]);
          if (resultado[urlAtiva]) {
            interacoes = JSON.parse(resultado[urlAtiva])
          }
          console.log(interacoes)
        })();
  }
  
  chrome.runtime.onMessage.addListener((request) => {
    if (request.url) { getUrlAtiva(request.url)}
    if (request.ehParaGravar) {ehParaGravar = request.ehParaGravar}
  });
  let barra = ""

  const criar_barra = () => {
    const barraElement = document.createElement("div");
    barraElement.id = IdBar;
    barraElement.style = "top: 0; width: 100%; z-index:1000000; background-color: beige; color: black; font-family: Arial, sans-serif; font-weight: bold; font-size: 16px;";
    barraElement.innerHTML = HTMLBase;
    document.body.insertAdjacentElement("afterbegin", barraElement);
    return document.getElementById(IdBar)
  }

  if (!document.getElementById(IdBar)) {
    barra = criar_barra();
  }

  // Função para registrar as interações em formato JSON
  const registrarInteracao = (eventType, element) => {
    if (!ehParaGravar) {return false}
    const elemento = {
      tagName: element.tagName,
      id: element.id,
      className: element.className,
      value: element.value,
      conteudo: element.innerHTML // Adiciona o conteúdo do elemento
    };

    const interacao = {
      tipo: eventType,
      elemento: elemento
    };

    if (interacoes) {
      if (JSON.stringify(interacoes.at(-1)) === JSON.stringify(interacao)) {
        return;
      }
    }
    interacoes = [...interacoes, interacao]
    obj = {};
    obj[urlAtiva] = JSON.stringify(interacoes);
    chrome.storage.local.set(obj)
    console.log(interacoes)
    chrome.storage.local.get(urlAtiva).then((result) => {
      console.log("Valor atual do storage: " + JSON.stringify(result))
    })
    // barra.innerHTML = HTMLBase + "\n" + JSON.stringify(interacao)

  }

  document.addEventListener("click", function (event) {
    registrarInteracao("texto selecionado", event.target);
  });
  document.addEventListener("input", function (event) {
    registrarInteracao("texto_inserido", event.target);
  });

})();
