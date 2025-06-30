let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let itens = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')
let list = container.querySelector('.list')
let closeButton = document.querySelectorAll('.close-pop-up');
let popUpContainer = document.querySelector('.pop-up-container');
let loginButton = document.querySelector('.Login img');
let imgPassword = document.querySelector('.Input img');
let togglePassword = document.querySelectorAll('.togglePassword');
let passwordInput = document.getElementById('password');
let singIn = document.querySelector('.Sing-in')
let create = document.querySelector('.create-an-account')
let popUpCreate = document.querySelector('.pop-up-create')
let popUpSingIn = document.querySelector('.pop-up-Sing-in')

let active = 0
let firstPosition = 0
let lastPosition = itens.length - 1 // pq começa no 0, ou seja o primeiro item é 0, ai se tem 4 itens, o ultimo item vai ser o 3 [0,1,2,3]


function setSlider() { //function pq os dois botões basicamente utilizam os mesmos codigos, ai pra evitar a repetição, utiliza ele
    let itemOld = container.querySelector('.list .item.active')//cria uma variavel, para o iten que ele ira tirar da tela, assim ele vai procurar dentro do container um item dentro de list que tem a classe item e active ao mesmo tempo, ou seja o item ativo/que esta mostrando no momento
    itemOld.classList.remove('active')//remove a  classe active desse item

    let dotsOld = indicator.querySelector('ul li.active') //cira uma variavel para quadrado antigo, depois procura qual é o quadrado que estava brilhando
    dotsOld.classList.remove('active')//remove o 'active' dele
    //reutiliza a verificação do itemOld para ver se existe o outro item para colocar o active
    dots[active].classList.add('active')//adiciona o item no novo quadrado q tem que brilhar

    indicator.querySelector('.number').innerText = '0' + (active + 1)//Basicamente procura a classe .number e utiliza o metodo .innerText que altera o texto, ai ele faz o active, que seria a posição dentro dos itens que ele está, + 1, para ir mudando a cada clique, (o 0 é só charme) 
}


nextButton.onclick = () => { //basicamente falando "se esse botao for clicado, faça isso"
    active = active + 1 > lastPosition ? 0 : active + 1 //if else resumido, se active+1 for > que lastposition ele adiciona o valor 0 para ele, caso contrario ele realiza a operação active + 1 sem problemas
    setSlider()
    itens[active].classList.add('active')//procura o item na suposta posição e coloca ele como active 
    list.style.setProperty('--calculation', 1)//troca o valor da variavel criada no css para 1
}

prevButton.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1 //if else resumido, se active - 1 for < que firstposition ele vai levar ele pra lastposition, caso contrario ele realiza o active - 1 normal
    setSlider()
    itens[active].classList.add('active')//procura o item na suposta posição e coloca ele como active 
    list.style.setProperty('--calculation', -1)//troca o valor da variavel criada no css para -1 
}
loginButton.addEventListener('click', function () {
    popUpContainer.style.display = 'flex';
    popUpCreate.style.display = 'flex'
    popUpSingIn.style.display = 'none'
    document.body.classList.add('no-scroll');//adiciona uma classe ao documento
})
singIn.addEventListener('click', function () {
    popUpCreate.style.display = 'none'
    popUpSingIn.style.display = 'flex'
})
create.addEventListener('click', function () {
    popUpCreate.style.display = 'flex'
    popUpSingIn.style.display = 'none'
})
closeButton.forEach(button => {
button.addEventListener('click', function () {
    popUpContainer.style.display = 'none';
    document.body.classList.remove('no-scroll');//remove uma classe do documento 
})
})
togglePassword.forEach(button => {
button.addEventListener('click', function () {
    const passwordInput = this.previousElementSibling;
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.src = type === 'password' ? './Img/olho.png' : './Img/olho_aberto.png';
})
})

//COPIADO E COLADO DO GPT

document.querySelector('#create-account-form form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = document.getElementById('First_name').value;
  const lastName = document.getElementById('Last_name').value;
  const email = document.querySelector('#create-account-form input[type="email"]').value;
  const password = document.querySelector('#create-account-form input[type="password"]').value;

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password })
  });

  const result = await response.json();
  alert(result.message);
});

