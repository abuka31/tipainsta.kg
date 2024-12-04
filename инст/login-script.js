document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Вход успешен!');
        window.location.href = 'welcome.html'; // Перенаправление на страницу после входа
    } else {
        alert('Неверное имя пользователя или пароль');
    }
});
