const json = window.localStorage.getItem('people');
const editPeople = json ? JSON.parse(json) : [];
const url = new URL(window.location.href);
const i = url.searchParams.get('index');

const popup = document.querySelector('div[name="popup"]');
const btnClose = document.querySelector('[name="closePopUp"]');

function onClose() {
  popup.classList.add('hide');
}

btnClose.addEventListener("click", onClose);


const error = document.getElementById('error');
const email = document.getElementById('email');
const profession = document.getElementById('profession');
const btn = document.getElementById('edit');
console.log(i, editPeople);

if (i > editPeople.length -1) {
  console.log('Item não existe');
  error.innerText = 'person does not exist';
  btn.setAttribute('disabled', 'true');
  email.setAttribute('disabled', 'true');
  profession.setAttribute('disabled', 'true');
} else {
  error.innerText = '';
  email.value = editPeople[i].email;
  profession.value = editPeople[i].profession;
  console.log( 'antigo', editPeople);
}

function handleClick(e) {
  e.preventDefault();
  editPeople[i] = {
    email: email.value,
    profession: profession.value,
  };

  console.log( 'novo', editPeople);
  window.localStorage.setItem('people', JSON.stringify(editPeople));
  popup.classList.remove('hide');
}

btn.addEventListener('click', handleClick);