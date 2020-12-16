const btnCreate = document.getElementById('create');
const popup = document.querySelector('div[name="popup"]');
const btnClose = document.querySelector('[name="closePopUp"]');

btnClose.addEventListener("click", onClose);

function onClose() {
  popup.classList.add('hide');
  console.log('gy');
}

function handleClick(e) {
  e.preventDefault();
  error.innerText = '';

  const email = document.getElementById('email');
  const profession = document.getElementById('profession');
  
  const json = window.localStorage.getItem('people');
  const people = json ? JSON.parse(json) : [];
  
  console.log('people', people);

  const exist = people.find((person) => person.email === email.value);
  popup.classList.add('hide');

  if (exist) {
    const error = document.getElementById('error');
    error.innerText = 'email already registered';
    console.log('email já cadastrado');
    return
  } else {
    people.push({
      email: email.value,
      profession: profession.value
    })
    popup.classList.remove('hide');
    console.log('email cadastrado no array');
    window.localStorage.setItem('people', JSON.stringify(people));
  }
}

btnCreate.addEventListener('click', handleClick);