document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const code = document.getElementById('code').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;

    if (newPassword !== confirmNewPassword) {
        alert('Пароли не совпадают');
        return;
    }

    fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Пароль успешно сброшен');
            window.location.href = 'login.html';
        } else {
            alert('Ошибка при сбросе пароля');
        }
    });
});
