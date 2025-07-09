// VALIDAÇÃO DOS CAMPOS DO FORM

function validateFieldsSignUp() {

    const PasswordValid = isPasswordSingUpValid();
    const emailValid = isEmailSingUpValid();
    const confirmPassword = isConfirmPasswordValid();
    const usernameValid = isUsernameValid();
    form.SignUpButton().disabled = !emailValid || !PasswordValid || !confirmPassword || !usernameValid;

}
function validateFieldsLogin() {
    const emailLoginValid = isEmailLoginValid();
    form.recoverPassword().disabled = !emailLoginValid;

    const PasswordLoginValid = isPasswordLoginValid();
    form.LoginButton().disabled = !emailLoginValid || !PasswordLoginValid;
}
function isEmailSingUpValid() {
    const emailSignUp = form.emailSignUp().value;
    if (!emailSignUp) {
        return false;
    }
    return validateEmailSignUp(emailSignUp);
}
function isPasswordSingUpValid() {
    const passwordSignUp = form.passwordSignUp().value;
    if (!passwordSignUp) {
        return false;
    }
    return true;
}
function isConfirmPasswordValid() {
    const passwordSignUp = form.passwordSignUp().value;
    const confirmPassword = form.confirmPassword().value;
    if (!confirmPassword || passwordSignUp !== confirmPassword) {
        return false;
    }
    return true;
}
function isUsernameValid() {
    const username = form.username().value;
    if (!username) {
        return false;
    }
    return true;
}
function isEmailLoginValid() {
    const emailLogin = form.emailLogin().value;
    if (!emailLogin) {
        return false;
    }
    return validateEmailLogin(emailLogin);
}
function isPasswordLoginValid() {
    const passwordLogin = form.passwordLogin().value; /* CONECTAR COM BD PARA ACHAR A SENHA DE ACORDO COM O EMAIL */
    if (!passwordLogin) {
        return false;
    }
    return true;
}
function validateEmailSignUp(emailSignUp) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailSignUp);
}
function validateEmailLogin(emailLogin) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLogin);
}

const form = {
    emailLogin: () => document.getElementById('emailLogin'),
    SignUpButton: () => document.getElementById('SignUpButton'),
    recoverPassword: () => document.getElementById('recoverPassword'),
    LoginButton: () => document.getElementById('LoginButton'),
    passwordSignUp: () => document.getElementById('passwordSignUp'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    username: () => document.getElementById('username'),
    emailSignUp: () => document.getElementById('emailSignUp'),
    passwordLogin: () => document.getElementById('passwordLogin')
}
//PAGINA DE CARREGAMENTO

document.addEventListener('DOMContentLoaded', () => {
  const LoginButton = document.getElementById('LoginButton');
  LoginButton.addEventListener('click', accountLogin);
});

function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading");

    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);
    document.body.appendChild(div); 
}
function hideLoading(){
    const loadings = document.getElementsByClassName("loading")
    if (loadings.length){
        loadings[0].remove();
    }
}

//CARROSSEL

let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let itens = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')
let list = container.querySelector('.list')
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

//BOTÃO PARA ACESSAR O LOGIN E SignUP, E TUDO DE DENTRO DOS FORMULÁRIOS

let closeButton = document.querySelectorAll('.close-pop-up');
let popUpContainer = document.querySelector('.pop-up-container');
let loginButton = document.querySelector('.Login img');
let togglePassword = document.querySelectorAll('.togglePassword');
let passwordInput = document.getElementById('password');
let SignUp = document.querySelector('.Sign-up')
let create = document.querySelector('.create-an-account')
let popUpCreate = document.querySelector('.pop-up-create')
let popUpSignUp = document.querySelector('.pop-up-Sign-up')

loginButton.addEventListener('click', function () {
    popUpContainer.style.display = 'flex';
    popUpCreate.style.display = 'flex'
    popUpSignUp.style.display = 'none'
    document.body.classList.add('no-scroll');//adiciona uma classe ao documento
})
SignUp.addEventListener('click', function () {
    popUpCreate.style.display = 'none'
    popUpSignUp.style.display = 'flex'
})
create.addEventListener('click', function () {
    popUpCreate.style.display = 'flex'
    popUpSignUp.style.display = 'none'
})
closeButton.forEach(button => {
    button.addEventListener('click', function () {
        popUpContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');//remove uma classe do documento 
        form.email().value = "";
        form.password().value = "";
        form.username().value = "";
        form.confirmPassword().value = "";
        form.emailSignUp().value = "";
        form.passwordSignUp().value = "";
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
function accountLogin(){
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.emailLogin().value, form.passwordLogin().value).then(response => {
        hideLoading();
        popUpContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
function getErrorMessage(error){
    if (error.code == "auth/invalid-credential"){
        return "Dados inválidos";
    }
    return error.message;

}