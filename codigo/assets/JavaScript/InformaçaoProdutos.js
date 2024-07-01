function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    if (strDados) {
        try {
            objDados = JSON.parse(strDados);
        } catch (error) {
            console.error("Erro ao analisar os dados do localStorage:", error);
            objDados = { produtos: [] };
        }
    } else {
        objDados = { produtos: [] };
    }
    return objDados;
}

function renderProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const objDados = leDados();
    const produto = objDados.produtos[productId];

    if (produto) {
        document.getElementById('productDetails').innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-image img-fluid">
            <div class="product-info">
                <h2>${produto.nome}</h2>
                <p>Descrição: ${produto.descricao}</p>
                <p>Preço: R$${produto.preco}</p>
                <p>Telefone para contato: ${produto.telefone}</p>
                <p>Estado: ${produto.estado}</p>
            </div>
        `;
    } else {
        document.getElementById('productDetails').innerHTML = '<p>Produto não encontrado.</p>';
    }
}

window.onload = function() {
    renderProductDetails();
};

