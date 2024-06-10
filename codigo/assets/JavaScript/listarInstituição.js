function leDados() {
  let strDados = localStorage.getItem('instituições');
  let objDados = {};
  if (strDados) {
    objDados = JSON.parse(strDados);
  } else {
    objDados = { instituiçao: [] };
  }
  return objDados;
}

function listarInstituicoes() {
  let cards = document.getElementById('cards');
  let strHtml = '';
  let objDados = leDados();

  for (let i = 0; i < objDados.instituiçao.length; i++) {
    strHtml += `
        <div class="col-md-4">
          <div class="card mb-4">
            <img src="${objDados.instituiçao[i].file}" class="card-img-top" alt="${objDados.instituiçao[i].nome}">
            <div class="card-body">
              <h5 class="card-title">${objDados.instituiçao[i].nome}</h5>
              <p class="card-text">Município: ${objDados.instituiçao[i].Municipio}</p>
              <p class="card-text">Estado: ${objDados.instituiçao[i].uf}</p>
              <p class="card-text">Descrição: ${objDados.instituiçao[i].descricao}</p>
              <p class="card-text">Objetivo: ${objDados.instituiçao[i].objetivo}</p>
              <a href=${objDados.instituiçao[i].Url} target="_blank"><button>Saiba mais</button></a>

            </div>
          </div>
        </div>
      `;
  }
  cards.innerHTML = strHtml;
}
    
window.onload = listarInstituicoes;
