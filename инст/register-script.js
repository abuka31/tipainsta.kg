document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        alert('Пользователь с таким именем или электронной почтой уже существует');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Регистрация успешна! Перенаправляем на страницу входа.');
    window.location.href = 'login.html';
});
