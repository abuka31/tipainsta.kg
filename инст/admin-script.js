document.addEventListener('DOMContentLoaded', () => {
    const passwordsList = document.getElementById('passwords-list');
    const clearButton = document.getElementById('clear-button');

    // Загружаем данные из localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Отображаем данные
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.password}</td>
        `;
        passwordsList.appendChild(row);
    });

    // Очищаем список пользователей
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('users');
        passwordsList.innerHTML = '';
    });
});
