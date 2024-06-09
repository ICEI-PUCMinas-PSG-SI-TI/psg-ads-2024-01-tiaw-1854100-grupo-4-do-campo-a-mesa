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
  
  function salvaDados(dados) {
    localStorage.setItem('instituições', JSON.stringify(dados));
  }
  function validarFormulario() {
    let camposObrigatorios = [
        'nome',
        'municipio',
        'uf',
        'descricao',
        'objetivo',
        'file',
        'url'
    ];

    for (let i = 0; i < camposObrigatorios.length; i++) {
        let campo = document.getElementById(camposObrigatorios[i]);
        if (!campo.value) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }
    }
    return true;
}
  function adicionarInstituicao() {
    if (!validarFormulario()) {
      return;
    }
    let objDados = leDados();
    let strNome = document.getElementById('nome').value;
    let strMunicipio = document.getElementById('municipio').value;
    let strUf = document.getElementById('uf').value;
    let strDescricao = document.getElementById('descricao').value;
    let strObjetivo = document.getElementById('objetivo').value;
    let strUrl = document.getElementById('url').value;
    let strImg = localStorage.getItem('file');
    
  
    let novaInstituição = {
      nome: strNome,
      Municipio: strMunicipio,
      descricao: strDescricao,
      uf: strUf,
      objetivo: strObjetivo,
      file: strImg,
      Url:strUrl
    };
  
    objDados.instituiçao.push(novaInstituição);
    salvaDados(objDados);
    localStorage.removeItem('file');
    alert('Instituição adicionado com sucesso!');
    atualizarListaInstituicoes();
  }

 // o campo "nome" da instituição irá aparecer em negrito
  function atualizarListaInstituicoes(){
    let objDados = leDados();
    let lista = document.getElementById('lista-instituicoes');
    lista.innerHTML = '';

    for (let i = 0; i < objDados.instituicao.length; i++) {
        let instituicao = objDados.instituicao[i];
        let listItem = document.createElement('div');
        listItem.innerHTML = `<strong>${instituicao.nome}</strong> - ${instituicao.Municipio}, ${instituicao.uf}, ${instituicao.descricao}, ${instituicao.objetivo}, ${instituicao.Url}`;
        lista.appendChild(listItem);
    }
  }


  const btnAnunciar = document.getElementById('adicionarInstituicao');
  btnAnunciar.addEventListener('click', function () {
    adicionarInstituicao();
    document.getElementById('formulário').reset(); // Limpar o formulário após a inclusão do produto
  });
  

  var fileInput = document.getElementById('file');
  fileInput.addEventListener('change', function (e) {
    var reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem('file', reader.result);
    };
    var file = e.target.files[0];
    reader.readAsDataURL(file);
  });
 
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

  document.addEventListener('DOMContentLoaded', function() {
    atualizarListaInstituicoes();
});