const check = localStorage.getItem('users');

const users = [
    {
        fname: 'nick',
        lname: 'lush',
        email: 'nick@gmail.com',
        password: '1234'
    }
];

if (check) {
    console.log('got users');
} else {
    console.log('no users');
    localStorage.setItem('users', JSON.stringify(users));
}

const form = document.getElementById('register');
const userTableBody = document.getElementById('userTableBody');

form.addEventListener('submit', (event) => {
    event.preventDefault();


    const firstName = document.querySelector('#fname').value;
    const lastName = document.querySelector('#lname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;


    const userNew = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    const userJSON = JSON.stringify(userNew);

    sessionStorage.setItem('userData', userJSON);

    addUserToTable(userNew);
});

function addUserToTable(userNew) {
    const row = document.createElement('tr');
    row.id = userNew.password;
    row.innerHTML = `
    <td class="edit-cell" id="userFirstRow">${userNew.firstName}</td>
    <td class="edit-cell" id="userLastRow">${userNew.lastName}</td>
    <td class="edit-cell" id="userEmailRow">${userNew.email}</td>
    <td class="edit-cell" id="userPasswordRow">${userNew.password}</td>
    <td><button onclick="toggleLog(this)" class="logBtn">Login</button></td>
    <td><button onclick="deleteUser(this)" class="delete-button">Delete</button></td>
    <td><button onclick="changeUser(this)" class="changeBtn">Change</button></td>
    `;
    userTableBody.appendChild(row);

    // clearing the inputs
    document.querySelector('#fname').value = '';
    document.querySelector('#lname').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';

    const editCells = row.querySelectorAll('.edit-cell');
    editCells.forEach(cell => {
        cell.addEventListener('click', () => {
            editCell(cell);
        });
    });
}

let change = false;

const editCell = (cell) => {
    if (change == true) {
        cell.contentEditable = true;
        cell.focus();
    } else {
        cell.contentEditable = false;
    }
}

function deleteUser(button) {
    const row = button.closest('tr');
    const password = row.id;
    if (isLoggedIn == false) {
        row.remove();
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const updatedUserData = userData.filter(userNew => userNew.password !== password);
    sessionStorage.setItem(userData, JSON.stringify(updatedUserData));
}

let isLoggedIn = false;

const toggleLog = (button) => {
    if (isLoggedIn) {
        button.innerHTML = 'login';
        isLoggedIn = false;
        button.style.backgroundColor = 'rgb(105, 105, 235)';
    } else {
        button.innerHTML = 'logout';
        isLoggedIn = true;
        button.style.backgroundColor = 'yellow';
    }
}

const changeUser = (button) => {
    if (change) {
        button.innerHTML = 'change';
        change = false;
        button.style.backgroundColor = 'rgb(62, 219, 236)';
    } else {
        button.innerHTML = 'save';
        change = true;
        button.style.backgroundColor = 'rgb(75, 72, 233)';
    }
}