// passwords-script.js
document.addEventListener('DOMContentLoaded', () => {
    const passwordsList = document.getElementById('passwords-list');
    const clearButton = document.getElementById('clear-button');

    // Загружаем данные из localStorage
    const passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    // Отображаем данные
    passwords.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.username}</td>
            <td>${entry.password}</td>
        `;
        passwordsList.appendChild(row);
    });

    // Очищаем список паролей
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('passwords');
        passwordsList.innerHTML = '';
    });
});
