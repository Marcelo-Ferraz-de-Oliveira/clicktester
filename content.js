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
  botaoFechar.addEventListener("click", function() {
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
  console.log(json)
  // exibirPopup(json); // Exibir o JSON no pop-up
}

// Função para adicionar o event listener aos elementos da página
function adicionarEventListener(element) {
  // console.log("Adicionando event listener ao elemento:", element);
  element.addEventListener("click", function (event) {
    registrarInteracao("clique", event.target);
  });

  element.addEventListener("input", function (event) {
    registrarInteracao("texto_inserido", event.target);
  });
}

// Percorrer todos os elementos da página e adicionar o event listener
function percorrerElementos(element) {
  adicionarEventListener(element);

  const filhos = element.childNodes;
  if (filhos.length > 0) {
    filhos.forEach(percorrerElementos);
  }
}

// Adicionar event listener a todos os elementos na página
percorrerElementos(document.body);
