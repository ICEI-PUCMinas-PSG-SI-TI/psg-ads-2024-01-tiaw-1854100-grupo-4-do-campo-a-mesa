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


function salvaDados(dados) {
  localStorage.setItem('db', JSON.stringify(dados));
}

function incluirProduto() {
  let objDados = leDados();
  let strNome = document.getElementById('nome').value;
  let strPreco = document.getElementById('valor').value;
  let strDescricao = document.getElementById('descricao').value;
  let strTelefone = document.getElementById('telefone').value;
  let strEstado = document.getElementById('estado').value;
  let strImagem = localStorage.getItem('img');

  let novoProduto = {
    nome: strNome,
    preco: strPreco,
    descricao: strDescricao,
    telefone: strTelefone,
    estado: strEstado,
    imagem: strImagem
  };

  objDados.produtos.push(novoProduto);
  salvaDados(objDados);
  localStorage.removeItem('img');
  alert('Produto anunciado com sucesso!');
}

const btnAnunciar = document.getElementById('btnAnunciar');
btnAnunciar.addEventListener('click', function () {
  incluirProduto();
  document.getElementById('info-produto').reset(); // Limpar o formulário após a inclusão do produto
});

var fileInput = document.getElementById('file');
fileInput.addEventListener('change', function (e) {
  var reader = new FileReader();
  reader.onload = function () {
    localStorage.setItem('img', reader.result);
  };
  var file = e.target.files[0];
  reader.readAsDataURL(file);
});
document.getElementById('telefone').addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '');
  if (x.length > 0) {
    x = '(' + x;
  }
  if (x.length > 3) {
    x = x.slice(0, 3) + ') ' + x.slice(3);
  }
  if (x.length > 10) {
    x = x.slice(0, 10) + '-' + x.slice(10, 14);
  }
  e.target.value = x;
})
//header e footer
function toggleDropdown(event) {
  event.preventDefault();
  const dropdownContent = event.target.nextElementSibling;
  dropdownContent.classList.toggle('show');
}
// Fecha o dropdown se o usuário clicar fora dele
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};