const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const users = {}; // Хранилище пользователей для примера, замените на реальную базу данных

// Настройка почтового транспортера
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Отправка кода для сброса пароля
app.post('/send-reset-code', (req, res) => {
    const { email } = req.body;

    const user = Object.values(users).find(user => user.email === email);
    if (!user) {
        return res.json({ success: false, message: 'Пользователь не найден' });
    }

    const resetCode = crypto.randomBytes(3).toString('hex');

    // Отправка кода на email
    transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Код для сброса пароля',
        text: `Ваш код для сброса пароля: ${resetCode}`
    }, (error, info) => {
        if (error) {
            return res.json({ success: false, message: 'Ошибка при отправке email' });
        }

        // Сохранение кода для дальнейшего сравнения
        user.resetCode = resetCode;
        res.json({ success: true });
    });
});

// Сброс пароля
app.post('/reset-password', (req, res) => {
    const { code, newPassword } = req.body;

    const user = Object.values(users).find(user => user.resetCode === code);
    if (!user) {
        return res.json({ success: false, message: 'Неверный код' });
    }

    user.password = newPassword;
    user.resetCode = undefined; // Удаление кода после использования
    res.json({ success: true });
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
