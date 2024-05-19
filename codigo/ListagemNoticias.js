document.addEventListener("DOMContentLoaded", function() {
    const listaNoticias = document.getElementById("noticias-lista");
    const urlNoticias = "noticias.json";

    async function buscarNoticias() {
        try {
            const response = await fetch(urlNoticias);
            if (!response.ok) {
                throw new Error('Erro ao buscar as notícias');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar as notícias:', error);
            return [];
        }
    }

    function adicionarNoticia(noticia) {
        const li = document.createElement("li");
        li.classList.add("noticia-card");

        const imagem = document.createElement("img");
        imagem.src = noticia.imagem;

        const h2 = document.createElement("h2");
        h2.textContent = noticia.titulo;

        const pFonte = document.createElement("p");
        pFonte.textContent = "Fonte da Notícia: " + noticia.fontenoticia;

        const pAutor = document.createElement("p");
        pAutor.textContent = "Autor: " + noticia.autor;

        const pData = document.createElement("p");
        pData.textContent = "Data e Hora: " + noticia.dataHora;

        const pResumo = document.createElement("p");
        pResumo.textContent = "Resumo: " + noticia.texto;

        li.appendChild(imagem);
        li.appendChild(h2);
        li.appendChild(pFonte);
        li.appendChild(pAutor);
        li.appendChild(pData);
        li.appendChild(pResumo);

        listaNoticias.appendChild(li);
    }

    buscarNoticias().then(noticias => {
        console.log('Notícias:', noticias);
        noticias.forEach(noticia => {
            adicionarNoticia(noticia);
        });
    });
});


