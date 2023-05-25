//const elemento = document.createElement("div")
//elemento.id = 1
//body = document.getElementBy
//document.body.insertBefore(p, document.body.firstChild);
(() => {
  let interacoes = []
  function exibirPopup(json) {
    const popup = document.createElement("div");
    popup.innerHTML = `
    <div style="position: fixed; top: 10px; right: 10px; padding: 10px; background-color: white; border: 1px solid black; z-index: 9999;">
    <pre>${json}</pre>
    <button id="fechar-popup" style="margin-top: 10px;">Fechar</button>
    </div>
    `;
    document.body.appendChild(popup);

    const botaoFechar = popup.querySelector("#fechar-popup");
    botaoFechar.addEventListener("click", function () {
      document.body.removeChild(popup);
    });
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

    const json = JSON.stringify(interacao);
    if (interacoes) {
      if (JSON.stringify(interacoes.at(-1)) !== JSON.stringify(interacao)) {
        interacoes = [...interacoes, interacao]
        console.log(interacoes)
      }
    }
    // exibirPopup(json); // Exibir o JSON no pop-up
  }

  document.addEventListener("click", function (event) {
    registrarInteracao("texto selecionado", event.target);
  });
  //TODO: adicionar input apenas para elemento input, talvez?
  document.addEventListener("input", function (event) {
    registrarInteracao("texto_inserido", event.target);
  });

})();
