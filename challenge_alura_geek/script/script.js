import { mensagens } from "./mensagens-erro.js";

const camposFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]')
const btnLimpar = document.querySelector('.add-produto__container-form__btn-limpar');

Array.from(camposFormulario).forEach(campo => {
    campo.addEventListener('blur', ()=> verificaCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

btnLimpar.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('#nome').value = ''
    document.querySelector('#valor').value = ''
    document.querySelector('#imagem').value = ''
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const titulo = document.querySelector('#nome').value
    const preco = document.querySelector('#valor').value
    const urlImagem = document.querySelector('#imagem').value

    const novoProduto = {
        titulo,
        preco,
        urlImagem
    }
    console.log(novoProduto)
    post(novoProduto)
})

function post(produto){
    fetch("http://localhost:3000/Produtos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Producto añadido exitosamente:', data);
    })
    .catch(error => {
        console.error('Error al añadir el producto:', error);
    });
};

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'customError'
]

function verificaCampo(campo){
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]){
            mensagem = mensagens[campo.id][erro]
        }
    })
    const elemMensagemErro = campo.parentNode.querySelector('.erro')
    const validadorDeInput = campo.checkValidity()

    if(!validadorDeInput) {
        elemMensagemErro.textContent = mensagem
    }else {
        elemMensagemErro.textContent = ''
    }
}
