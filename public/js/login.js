const login = document.querySelector('.login-container');
const createAccount = document.querySelector('.create-account-container');
const overlay = document.querySelector('.overlay');

let flag = true;

overlay.addEventListener('click', e => {

  if (flag) {
    overlay.classList.add('overlay-animToLeft');
    overlay.classList.remove('overlay-animToRight');
    
    login.classList.add('formToLeft-in');
    login.classList.remove('formToLeft-out');
    login.style.display = 'flex';

    createAccount.classList.add('formToRight-out');
    createAccount.classList.remove('formToRight-in');

    setTimeout(()=> {
      createAccount.style.display = 'none';
    }, 900);

    flag = false;
  } else {
    overlay.classList.add('overlay-animToRight');  
    overlay.classList.remove('overlay-animToLeft');
    
    login.classList.remove('formToLeft-in');
    login.classList.add('formToLeft-out');

    createAccount.classList.add('formToRight-in');
    createAccount.classList.remove('formToRight-out');
    createAccount.style.display = 'flex';

    setTimeout(()=> {
      login.style.display = 'none';
    }, 900);

    flag = true;
  }
});