import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>Помилка 404 - Сторінка не знайдена</h1>
            <p>Вибачте, сторінка, яку ви шукаєте, не існує.</p>
            <Link to="/">Повернутися на головну сторінку</Link>
        </div>
    );
}

export default NotFound;
