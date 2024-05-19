// Função para adicionar notícia
function adicionarNoticia() {
    var titulo = document.getElementById("titulo").value;
    var texto = document.getElementById("texto").value;
    var autor = document.getElementById("autor").value;
    var dataHora = document.getElementById("dataHora").value;
    var fontenoticia = document.getElementById("fonte").value;
    var fileInput = document.getElementById("file");
    var imagem = "";

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            imagem = e.target.result;
            salvarNoticia(titulo, texto, autor, dataHora, fontenoticia, imagem);
        };
        reader.readAsDataURL(file);
    } else {
        salvarNoticia(titulo, texto, autor, dataHora, fontenoticia, imagem);
    }
}

function salvarNoticia(titulo, texto, autor, dataHora, fontenoticia, imagem) {
    if (titulo && dataHora && texto && autor && fontenoticia && imagem) {
        var noticia = { titulo: titulo, texto: texto, dataHora: dataHora, autor: autor, fontenoticia: fontenoticia, imagem: imagem };

        var noticias = JSON.parse(localStorage.getItem("noticias")) || [];
        noticias.push(noticia);
        localStorage.setItem("noticias", JSON.stringify(noticias));

        mostrarNoticias();

        // Limpar campos após adicionar notícia
        document.getElementById("titulo").value = "";
        document.getElementById("dataHora").value = "";
        document.getElementById("texto").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("fonte").value = "";
        document.getElementById("file").value = "";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para mostrar as notícias
function mostrarNoticias() {
    var listaNoticias = document.getElementById("lista-noticias");
    listaNoticias.innerHTML = "";

    var noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias.forEach(function(noticia, index) {
        var divNoticia = document.createElement("div");
        divNoticia.classList.add("noticia");

        var titulo = document.createElement("h3");
        titulo.textContent = noticia.titulo;

        var dataHora = document.createElement("p");
        dataHora.textContent = noticia.dataHora;

        var texto = document.createElement("p");
        texto.textContent = noticia.texto;

        var autor = document.createElement("p");
        autor.textContent = noticia.autor;

        var fontenoticia = document.createElement("p");
        fontenoticia.textContent = noticia.fontenoticia;

        if (noticia.imagem) {
            var img = document.createElement("img");
            img.src = noticia.imagem;
            divNoticia.appendChild(img);
        }

        var btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", function() {
            excluirNoticia(index);
        });

        var btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", function() {
            editarNoticia(index);
        });

        divNoticia.appendChild(titulo);
        divNoticia.appendChild(dataHora);
        divNoticia.appendChild(texto);
        divNoticia.appendChild(autor);
        divNoticia.appendChild(fontenoticia);
        divNoticia.appendChild(btnExcluir);
        divNoticia.appendChild(btnEditar);
        listaNoticias.appendChild(divNoticia);
    });
}

// Função para excluir notícia
function excluirNoticia(index) {
    var noticias = JSON.parse(localStorage.getItem("noticias"));
    noticias.splice(index, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    mostrarNoticias();
}

function editarNoticia(index) {
    var noticias = JSON.parse(localStorage.getItem("noticias"));
    var noticia = noticias[index];
    var novoTitulo = prompt("Digite o novo título da notícia:", noticia.titulo);
    var novadata = prompt("Digite a nova data de publicação da notícia:", noticia.dataHora);
    var novoTexto = prompt("Digite o novo texto da notícia:", noticia.texto);
    var novoautor = prompt("Insira o nome do novo autor:", noticia.autor);
    var novafonte = prompt("Insira a nova fonte da notícia:", noticia.fontenoticia);

    if (novoTitulo !== null && novadata !== null && novoTexto !== null && novoautor !== null && novafonte !== null) {
        noticia.titulo = novoTitulo;
        noticia.dataHora = novadata;
        noticia.texto = novoTexto;
        noticia.autor = novoautor;
        noticia.fontenoticia = novafonte;
        localStorage.setItem("noticias", JSON.stringify(noticias));
        mostrarNoticias();
    }
}

mostrarNoticias();
//conteúdo do cabeçalho e rodapé
function toggleDropdown(event) {
    event.preventDefault();
    const dropdownContent = event.target.nextElementSibling;
    dropdownContent.classList.toggle('show');
}

// Fecha o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
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