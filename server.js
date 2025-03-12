const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Middleware для обработки CORS
app.use(cors({
    origin: '*', // Позволяет всем источникам делать запросы. В продакшене укажите конкретный источник, например 'http://yourdomain.com'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Middleware для обработки JSON
app.use(bodyParser.json());

// Пути к файлам
const sectionsFilePath = path.join(__dirname, 'sections.json');
const buildPath = path.join(__dirname, 'build');

// Отдача статических файлов React
app.use(express.static(buildPath));

// Функция для чтения данных
const readSections = () => {
    try {
        if (!fs.existsSync(sectionsFilePath)) {
            return {};
        }
        const data = fs.readFileSync(sectionsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading sections.json:', err);
        return {};
    }
};

// Функция для записи данных
const writeSections = (data) => {
    try {
        fs.writeFileSync(sectionsFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing to sections.json:', err);
    }
};

// API маршруты

// Получить данные всех страниц
app.get('/api/sections', (req, res) => {
    try {
        const sections = readSections();
        res.json(sections);
    } catch (err) {
        console.error('Error reading sections data:', err);
        res.status(500).send('Error reading sections data');
    }
});

// Получить данные конкретной страницы
app.get('/api/sections/:page', (req, res) => {
    try {
        const sections = readSections();
        const page = req.params.page;
        if (sections[page]) {
            res.json(sections[page]);
        } else {
            res.status(404).send('Page not found');
        }
    } catch (err) {
        console.error('Error reading sections data:', err);
        res.status(500).send('Error reading sections data');
    }
});

// Обновить данные всех страниц
app.put('/api/sections', (req, res) => {
    try {
        const updatedSections = req.body;
        writeSections(updatedSections);
        res.status(200).send('Sections updated successfully');
    } catch (err) {
        console.error('Error updating sections data:', err);
        res.status(500).send('Error updating sections data');
    }
});

// Обновить данные конкретной страницы
app.put('/api/sections/:page', (req, res) => {
    try {
        const page = req.params.page;
        const updatedSections = req.body;
        const sections = readSections();

        if (sections[page]) {
            sections[page] = updatedSections;
            writeSections(sections);
            res.status(200).send('Sections updated successfully');
        } else {
            res.status(404).send('Page not found');
        }
    } catch (err) {
        console.error('Error updating sections data:', err);
        res.status(500).send('Error updating sections data');
    }
});

// Все остальные маршруты перенаправляются на React-приложение
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

