//const elemento = document.createElement("div")
//elemento.id = 1
//body = document.getElementBy
//document.body.insertBefore(p, document.body.firstChild);
(() => {
  var interacoes = [];
  // var sessao = "";
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   var activeTab = tabs[0];
  //   sessao = activeTab.url
  //   console.log(sessao)
  // });
  var sessao = "ClickTesterSessao";
  (async () => {
    resultado = await chrome.storage.local.get([sessao]);
    if (resultado[sessao]) {
      interacoes = JSON.parse(resultado[sessao])
    }
    console.log(interacoes)
  })();


  const IdBar = "ClickTesterBar";
  const HTMLBase = "<p>Barra de acompanhamento do ClickTester</p>";
  var barra = ""
  const criar_barra = () => {
    const elemento = document.createElement("div");
    elemento.id = IdBar;
    elemento.style = "top: 0; width: 100%; z-index:1000000; background-color: beige; color: black; font-family: Arial, sans-serif; font-weight: bold; font-size: 16px;";
    elemento.innerHTML = HTMLBase;
    document.body.insertAdjacentElement("afterbegin", elemento);
    return document.getElementById(IdBar)
  }

  if (!document.getElementById(IdBar)) {
    barra = criar_barra();
  }

  // Função para registrar as interações em formato JSON
  function registrarInteracao(eventType, element) {
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
    obj[sessao] = JSON.stringify(interacoes);
    chrome.storage.local.set(obj).then(() => {
      console.log("Storage setado para: " + JSON.stringify(interacoes))
    })
    console.log(interacoes)
    chrome.storage.local.get(sessao).then((result) => {
      console.log("Valor atual do storage: " + JSON.stringify(result))
    })
    // barra.innerHTML = HTMLBase + "\n" + JSON.stringify(interacao)

  }

  document.addEventListener("click", function (event) {
    registrarInteracao("texto selecionado", event.target);
  });
  //TODO: adicionar input apenas para elemento input, talvez?
  document.addEventListener("input", function (event) {
    registrarInteracao("texto_inserido", event.target);
  });

})();
