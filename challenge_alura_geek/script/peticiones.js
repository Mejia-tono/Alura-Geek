const containerProdutos = document.querySelector(".container-produtos");

// Subir productos y construir las tarjetas.
fetch("http://localhost:3000/Produtos")
    .then(response => response.json())
    .then(data => {
        data.forEach(elemento => {
            constroiCard(elemento.urlImagem, elemento.titulo, elemento.preco, elemento.id); // Incluya el ID del producto.
        });
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

// Función para construir la tarjeta del producto.
function constroiCard(urlImagem, titulo, preco, id) {
    const cardProduto = document.createElement('div');
    cardProduto.classList.add('card-produto', 'mt-5');

    cardProduto.innerHTML = `
        <img src="${urlImagem}" alt="" class="card-produto__img-produto">
        <div class="card-produto__legenda">
            <p class="card-produto__nome-produto">${titulo}</p>
            <span class="card-produto__detalhes">
                <span class="card-produto__preco">
                    <span>$</span>
                    <p class="card-produto__preco-produto">${preco}</p>
                </span>
                <img src="img/🦆 icon _trash 2_.png" alt="ícone de lixeira" class="card-produto__icone-lixeira" data-id="${id}">
            </span>
        </div>
    `;

    const imagemProduto = cardProduto.querySelector('.card-produto__img-produto');
    imagemProduto.style.width = '50%';

    containerProdutos.appendChild(cardProduto);
}

// Captura el evento de clic en el bote de basura y elimina el producto.
containerProdutos.addEventListener('click', event => {
    if (event.target.classList.contains('card-produto__icone-lixeira')) {
        const id = event.target.getAttribute('data-id');
        excluirProduto(id);
    }
});

function excluirProduto(id) {
    fetch(`http://localhost:3000/Produtos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al eliminar el producto: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto eliminado correctamente:', data);
        carregarProdutos(); 
    })
    .catch(error => {
        console.error('Error al eliminar el producto:', error);
    });
}

function carregarProdutos() {
    // Limpa la lista de productos y carga de nuevo.
    containerProdutos.innerHTML = '';
    fetch("http://localhost:3000/Produtos")
        .then(response => response.json())
        .then(data => {
            data.forEach(elemento => {
                constroiCard(elemento.urlImagem, elemento.titulo, elemento.preco, elemento.id);
            });
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}
