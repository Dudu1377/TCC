// VALIDAÇÃO DOS CAMPOS DO FORM

function validateFieldsSignUp() {

    const PasswordValid = isPasswordSingUpValid();
    const emailValid = isEmailSingUpValid();
    const confirmPassword = isConfirmPasswordValid();
    form.SignUpButton().disabled = !emailValid || !PasswordValid || !confirmPassword;

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
function hideLoading() {
    const loadings = document.getElementsByClassName("loading")
    if (loadings.length) {
        loadings[0].remove();
    }
}

//RECUPERAR SENHA
function recoverPasswordButton() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.emailLogin().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
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
let loginButton = document.getElementById('LoginImage');
let togglePassword = document.querySelectorAll('.togglePassword');
let passwordInput = document.getElementById('password');
let SignUp = document.querySelector('.Sign-up')
let create = document.querySelector('.create-an-account')
let popUpCreate = document.querySelector('.pop-up-create')
let popUpSignUp = document.querySelector('.pop-up-Sign-up')

function abrirPopupLogin() {
    popUpContainer.style.display = 'flex';
    popUpCreate.style.display = 'flex'
    popUpSignUp.style.display = 'none'
    document.body.classList.add('no-scroll');//adiciona uma classe ao documento
};

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

function accountLogin() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(form.emailLogin().value, form.passwordLogin().value).then(() => {
        hideLoading();
        popUpContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário nao encontrado";
    }
    return error.message;

}

function register() {
    showLoading();

    const email = form.emailSignUp().value;
    const password = form.passwordSignUp().value;
    const userType = document.querySelector('input[name="userType"]:checked').value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then((userCredential) => {
        hideLoading();
        const user = userCredential.user;
        firebase.firestore().collection('users').doc(user.uid).set({
            email: email,
            userType: userType,
        });
        popUpContainer.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}
function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso"
    }
    if (error.code == "auth/weak-password") {
        return "Senha fraca, coloque 6 ou mais caracteres"
    }
    if (error.code == "auth/invalid-credential") {
        return "Login não encontrado no sistema"
    }


    return error.message;
}
const userEmailItem = document.getElementById('userEmail');
const userMenu = document.getElementById('userMenu');
const logoutBtn = document.getElementById('logoutBtn');
function logout() {
    firebase.auth().signOut().then(() => {
        userMenu.classList.add('hidden');
    }).catch(() => {
        alert('Erro ao fazer logout')
    })
}
document.addEventListener('click', (event) => {
    if (!event.target.closest('#userMenu') && !event.target.closest('#LoginImage')) {
        userMenu.classList.add('hidden');
    }
});

//Formulario de doação
const openDonationBtn = document.getElementById('openDonationBtn');
const containerDonation = document.querySelector('.containerDonation');
console.log('Script carregado');
openDonationBtn.addEventListener('click', function () {
    console.log('Botão clicado, mostrando o formulário');
    containerDonation.style.display = 'block'; // Mostra o formulário
});
document.addEventListener('DOMContentLoaded', function () {
    const openDonationBtn = document.getElementById('openDonationBtn');
    const containerDonation = document.querySelector('.containerDonation');
    const closeButtons = document.querySelectorAll('.close-donation-pop-up');
    const firstSection = document.querySelector('#DonorSelection');
    const formSections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.NextButton');
    const prevButtons = document.querySelectorAll('.PrevButton');

    openDonationBtn.addEventListener('click', function () {
        containerDonation.style.display = 'block';
        formSections.forEach(section => section.classList.remove('active'));
        firstSection.classList.add('active');
        document.body.classList.add('no-scroll');
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            containerDonation.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nextSectionId = button.getAttribute('data-next');
            formSections.forEach(section => section.classList.remove('active'));
            document.getElementById(nextSectionId).classList.add('active');
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function () {
            const prevSectionId = button.getAttribute('data-prev');
            formSections.forEach(section => section.classList.remove('active'));
            document.getElementById(prevSectionId).classList.add('active');
        });
    });

    document.getElementById('SendDonation')?.addEventListener('click', function (e) {
        e.preventDefault();
        containerDonation.style.display = 'none';
    });
});

async function sendDonation(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const foodTypeEl = document.getElementById('foodType');
    const quantityEl = document.getElementById('quantity');
    const establishmentEl = document.getElementById('establishmentName');
    const phoneEl = document.getElementById('phone'); // novo
    const establishmentEmailEl = document.getElementById('establishmentEmail'); // novo

    const foodType = foodTypeEl ? foodTypeEl.value.trim() : '';
    const quantity = quantityEl ? Number(quantityEl.value) : 0;
    const establishmentName = establishmentEl ? establishmentEl.value.trim() : '';
    const contactPhone = phoneEl ? phoneEl.value.trim() : '';
    const contactEmail = establishmentEmailEl ? establishmentEmailEl.value.trim() : '';

    if (!foodType || !quantity) {
        alert('Preencha o tipo de alimento e a quantidade.');
        return;
    }

    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Faça login para enviar a doação.');
        return;
    }

    try {
        showLoading();

        let donorType = 'Independent';
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists && userDoc.data().userType) {
            donorType = userDoc.data().userType;
        }

        const data = {
            donorType: donorType,
            establishmentName: establishmentName,
            foodType: foodType,
            quantity: quantity,
            donorUid: user.uid,
            contactPhone: contactPhone,
            contactEmail: contactEmail,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        const ref = await firebase.firestore().collection('donations').add(data);
        hideLoading();
        alert('Obrigado por sua doação! Entraremos em contato em breve.');
        console.log('Donation saved:', ref.id, data);

        if (foodTypeEl) foodTypeEl.value = '';
        if (quantityEl) quantityEl.value = '';
        if (establishmentEl) establishmentEl.value = '';
        if (phoneEl) phoneEl.value = '';
        if (establishmentEmailEl) establishmentEmailEl.value = '';
    } catch (err) {
        hideLoading();
        console.error(err);
        alert(err.message || 'Erro ao salvar doação.');
    }
}
// conecta o evento ao botão (botão tem id="SendDonation" no HTML)
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('SendDonation');
    if (btn) btn.addEventListener('click', sendDonation);
});

// ...existing code...

// mantém referência para listener em tempo real (para poder cancelar)
let companyDonationsUnsubscribe = null;

function escapeHtml(str) {
    return String(str || '').replace(/[&<>"'`=\/]/g, s =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' })[s]);
}

function renderCompanyDonationsSnapshot(snapshot) {
    const list = document.getElementById('companyDonationsList');
    if (!list) return;
    if (snapshot.empty) {
        list.innerHTML = '<p>Nenhuma doação encontrada.</p>';
        return;
    }

    let html = '<table class="company-donations-table" style="width:90%;border-collapse:collapse;margin:auto;">' +
        '<thead><tr style="text-align:left;border-bottom:1px solid #ccc;padding:8px;">' +
        '<th>Estabelecimento</th><th>Alimento</th><th>Quantidade (Kg)</th><th>Tipo do Doador</th><th>Contato</th><th>Data</th></tr></thead><tbody>';

    snapshot.forEach(doc => {
        const d = doc.data();
        const date = d.createdAt && d.createdAt.toDate ? d.createdAt.toDate() : (d.createdAt ? new Date(d.createdAt) : null);
        const dateStr = date ? date.toLocaleString() : '';
        const contactParts = [];
        if (d.contactPhone) contactParts.push(escapeHtml(d.contactPhone));
        if (d.contactEmail) contactParts.push(escapeHtml(d.contactEmail));
        const contactStr = contactParts.length ? contactParts.join(' / ') : '—';

        html += `<tr style="border-bottom:1px solid #eee;">
            <td style="padding:8px;vertical-align:top;">${escapeHtml(d.establishmentName || '—')}</td>
            <td style="padding:8px;vertical-align:top;">${escapeHtml(d.foodType || '—')}</td>
            <td style="padding:8px;vertical-align:top;">${escapeHtml(d.quantity || '—')}</td>
            <td style="padding:8px;vertical-align:top;">${escapeHtml(d.donorType || '—')}</td>
            <td style="padding:8px;vertical-align:top;">${contactStr}</td>
            <td style="padding:8px;vertical-align:top;">${escapeHtml(dateStr)}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    list.innerHTML = html;
}

function loadCompanyDonations() {
    // cancela listener anterior se existir
    if (companyDonationsUnsubscribe) {
        companyDonationsUnsubscribe();
        companyDonationsUnsubscribe = null;
    }

    const list = document.getElementById('companyDonationsList');
    if (list) list.innerHTML = '<p>Carregando doações...</p>';

    // escuta toda a coleção donations (sem where para evitar índice composto)
    companyDonationsUnsubscribe = firebase.firestore()
        .collection('donations')
        .orderBy('createdAt', 'desc')
        .onSnapshot(renderCompanyDonationsSnapshot, err => {
            console.error('Erro ao carregar doações:', err);
            if (list) list.innerHTML = `<p>Erro ao carregar doações: ${escapeHtml(err.message || String(err))}</p>`;
        });
}

// ...existing code...

// Substituir/atualizar o trecho dentro do onAuthStateChanged para chamar loadCompanyDonations/clearCompanyDonations
document.addEventListener("DOMContentLoaded", () => {
    const loginIcon = document.getElementById('LoginImage');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
                if (doc.exists && doc.data().userType === 'Company') {
                    document.getElementById('companyDonationsMenu').style.display = 'inline-block';
                    document.getElementById('CompanyDonations').style.display = 'block';
                    document.body.classList.add('company-logged'); 
                    loadCompanyDonations(); 
                } else {
                    document.getElementById('companyDonationsMenu').style.display = 'none';
                    document.getElementById('CompanyDonations').style.display = 'none';
                    document.body.classList.remove('company-logged'); 
                    clearCompanyDonations();
                }
            }).catch(err => {
                console.error('Erro ao ler usuário:', err);
                document.getElementById('companyDonationsMenu').style.display = 'none';
                document.getElementById('CompanyDonations').style.display = 'none';
                clearCompanyDonations();
            });

            loginIcon.src = "./Img/Login Logado sem fundo.png";
            userEmailItem.textContent = user.email;
            loginIcon.onclick = () => {
                userMenu.classList.toggle('hidden');
            };
            logoutBtn.onclick = () => {
                showLoading();
                firebase.auth().signOut().then(() => {
                    hideLoading();
                    userMenu.classList.add('hidden');
                    clearCompanyDonations();
                });
            };
        } else {
            loginIcon.src = "./Img/Login sem fundo.png"
            loginIcon.onclick = abrirPopupLogin;
            document.getElementById('companyDonationsMenu').style.display = 'none';
            document.getElementById('CompanyDonations').style.display = 'none';
            clearCompanyDonations();
        }
    });
});
