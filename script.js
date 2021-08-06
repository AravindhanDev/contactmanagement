const contactForm = document.getElementById('contactForm');
const contactContainer = document.querySelector('.contacts');
const nameInp = contactForm['name'];
const emailInp = contactForm['email'];
const telInp = contactForm['tel'];
var i = 0;

const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

const addContact = (name, email, tel) => {
    contacts.push({
        name,
        email,
        tel
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
    return { name, email, tel };
};

const createContactElement = ({ name, email, tel }) => {
    const contactDiv = document.createElement('div');
    contactDiv.setAttribute('id', i);
    const contactName = document.createElement('h2');
    const contactEmail = document.createElement('p');
    const contactTel = document.createElement('p');
    const contactDel = document.createElement('button');
    contactName.innerHTML = 'Name: ' + name;
    contactEmail.innerHTML = 'Email: ' + email;
    contactTel.innerHTML = 'Ph No: ' + tel;
    contactDel.innerText = 'Delete';
    contactDiv.append(contactName, contactEmail, contactTel, contactDel);
    contactContainer.appendChild(contactDiv);
    contactContainer.style.display = contacts.length === 0 ? 'none' : 'flex';
    i++;

    contactDel.addEventListener('click', () => {
        var parent = contactDel.parentElement;
        index = parent.getAttribute('id');
        console.log(index);
        contacts.splice(index, 1);
        console.log(contacts);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        location.reload();
    });
};

contactContainer.style.display = contacts.length === 0 ? 'none' : 'flex';
contacts.forEach(createContactElement);

contactForm.addEventListener('submit', (e) => {
    const newContact = addContact(nameInp.value, emailInp.value, telInp.value);
    createContactElement(newContact);
    nameInp.value = '';
    emailInp.value = '';
    telInp.value = '';
    e.preventDefault();
});

const fontAwesomeIcon = (icon) => {
    return `<i class="fa fa-${icon}"></i>`;
};