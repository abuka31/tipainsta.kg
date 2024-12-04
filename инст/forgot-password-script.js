document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    fetch('/send-reset-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Код отправлен на вашу электронную почту');
            window.location.href = 'reset-password.html';
        } else {
            alert('Ошибка при отправке кода');
        }
    });
});
