const list = document.getElementById('list');
const search = document.getElementById('search');
const results = document.getElementById('results');

function popularList() {
  const json = window.localStorage.getItem('people');
  const people = json ? JSON.parse(json) : [];

  function deletePerson(i) {
    people.splice(i, 1);
    window.localStorage.setItem('people', JSON.stringify(people));

    list.innerHTML = ''
    popularList();
  }

  function renderPerson(propArray) {
    list.innerText = '';
    results.innerHTML = '';
    
    if (!propArray.length) {
      results.innerHTML = 'Nenhum item foi encontrado!!!'
      return;
    }
    propArray.map((person, index) => {
      console.log(index);
      const li = document.createElement('li');
      const pEmail  = document.createElement('p');
      const pProdession  = document.createElement('p');
      const btnEdit = document.createElement('button');
      const btnDelete = document.createElement('button');
      const link = document.createElement('a');
      link.setAttribute('href', `edit.html?index=${index}`);

      pEmail.innerText = person.email;
      pProdession.innerText = person.profession;
      link.appendChild(btnEdit);
      btnEdit.innerText = 'edit';
      btnDelete.innerText = 'delete';
      li.appendChild(pEmail);
      li.appendChild(pProdession);
      li.appendChild(link);
      li.appendChild(btnDelete);
      list.appendChild(li);

      btnDelete.addEventListener('click', () => deletePerson(index));
    })
  }

  function onFilter(e) {
    e.preventDefault();
    const professionFilter = document.querySelector('input[name="filter"]').value;
    const emailFilter = document.querySelector('input[name="email"]').value;
    const peopleFilter = [];

    console.log(people)
    
    for (let i = 0; i < people.length; i++) {
      console.log(emailFilter, professionFilter);

      if(
        emailFilter === people[i].email &&
        professionFilter === people[i].profession
      ) {
      
        peopleFilter[i] = people[i];
      }
      if(
        emailFilter === people[i].email &&
        !professionFilter
      ) {
        peopleFilter[i] = people[i];
      }

      if(
        !emailFilter &&
        professionFilter === people[i].profession
      ) {
        peopleFilter[i] = people[i];
      }
    }

    if (!emailFilter && !professionFilter) {
      return renderPerson(people)
    }

    renderPerson(peopleFilter);

  };

  renderPerson(people);

  search.addEventListener('click', onFilter);
}

popularList();
