function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    if (strDados) {
      objDados = JSON.parse(strDados);
    } else {
      objDados = { produtos: [] };
    }
    return objDados;
  }

  function listarProdutos() {
    let cards = document.getElementById('cards');
    let strHtml = '';
    let objDados = leDados();

    for (let i = 0; i < objDados.produtos.length; i++) {
      strHtml += `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="${objDados.produtos[i].imagem}" class="card-img-top" alt="${objDados.produtos[i].nome}">
            <div class="card-body">
              <h5 class="card-title">${objDados.produtos[i].nome}</h5>
              <p class="card-text">Preço: ${objDados.produtos[i].preco}</p>
              <p class="card-text">Descrição: ${objDados.produtos[i].descricao}</p>
              <p class="card-text">Telefone: ${objDados.produtos[i].telefone}</p>
              <p class="card-text">Estado: ${objDados.produtos[i].estado}</p>
            </div>
          </div>
        </div>
      `;
    }
    cards.innerHTML = strHtml;
  }

  window.onload = listarProdutos;
