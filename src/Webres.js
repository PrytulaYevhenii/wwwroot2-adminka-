import React, {useState, useEffect} from "react";
import { Table, TableBody, TableContainer, Paper } from '@mui/material'
import { renderSection } from "./Components/renderSection";
import './CSS/Pages.css';
import upArrow from './Files/up-arrow.svg';
import AdminPanel from "./Components/adminPanel";

function Webres() {
    const [sections, setSections] = useState([]);
    

    useEffect(() => {
        // Получаем данные с сервера
        fetch('http://localhost:5000/api/sections/Webres')
            .then(response => response.json())
            .then(data => setSections(data))
            .catch(error => console.error('Error fetching sections:', error));
    }, []);

    const handleScrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const updateSections = (newSections) => {
        fetch('http://localhost:5000/api/sections/Webres', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSections)
        })
        .then(response => {
            // Проверяем, что ответ может быть JSON
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                return response.json(); // Парсим JSON
            } else {
                return response.text(); // Если это текст
            }
        })
        .then(data => {
            console.log('Server response:', data); // Логируем ответ
            setSections(newSections); // Обновляем состояние
        })
        .catch(error => console.error('Error updating sections:', error));
    };

// const sections = [
//     {
//         header: (
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//                 Робочі системи.Локація А   
//             </div>
//         ),
//         files: [
//             {
//                 description: 'АС "Є-Казна" (820172)',
//                 url: 'https://ekazna-vyd.dksu.gov.ua/barsroot/barsweb/loginpage.aspx',
//                 label: 'https:/ekazna-vyd.dksu.gov.ua',
//                 },
//             {
//                 description: 'АС "Є-Казна Доходи" (899998)',
//                 url: 'https://ekazna-doh.dksu.gov.ua/barsroot/barsweb/loginpage.aspx',
//                 label: 'https:/ekazna-doh.dksu.gov.ua',
//                 },
//         ]
//     },
//     {
//         header: 'Робочі системи.Локація Б',
//         files: [
//             {
//                 description: 'АС "Є-Казна" (820172)',
//                 url: 'https://ekazna-vyd-b.dksu.gov.ua/barsroot/barsweb/loginpage.aspx',
//                 label: 'https://ekazna-vyd-b.dksu.gov.ua',
//             },
//             {
//                 description: 'АС "Є-Казна Доходи" (899998)',
//                 url: 'https://ekazna-doh-b.dksu.gov.ua/barsroot/barsweb/loginpage.aspx',
//                 label: 'https://ekazna-doh-b.dksu.gov.ua',
//             },
//             {
//                 description: 'Підсистема Єдина мережа/Єдиний реєстр',
//                 url: 'https://srv2800corpw/ibank/login.aspx?lang=UK',
//                 label: 'Підсистема Єдина мережа/Єдиний реєстр'
//             },
//             {
//                 description: 'Сховища даних Є-Звіт',
//                 url: 'https://10.6.8.170/barsapp/Account/Login?ReturnUrl=%2fbarsapp%2f',
//                 label: 'Сховище даних Є-Звіт'
//             },
//             {
//                 description: 'Електронна звітність клієнтів',
//                 url: 'https://10.6.8.156/barsapp/',
//                 label: 'АС Є-Звітність'
//             },
//             {
//                 description: 'Система електронного документообігу',
//                 url: 'https://10.6.8.151/askod/',
//                 label: 'АСКОД'
//             },
//             {
//                 description: 'Підсистема сховища даних',
//                 url: 'https://10.6.8.86/index.php',
//                 label: 'Схрон'
//             },
//             {
//                 description: 'Система дистанційного обслуговування клієнтів',
//                 url: 'https://10.6.8.146/sdo/',
//                 label: 'СДО'
//             },
//         ]

//     },
//     {
//         header: 'Системи минулих років',
//         files: [
//             {
//                 description: 'Є-КАЗНА Видатки (до 2020 року)',
//                 url: 'https://10.6.8.248/barsroot/barsweb/loginpage.aspx',
//                 label: 'Є-КАЗНА Видатки до 2020 року'
//             },
//             {
//                 description: 'Є-КАЗНА Доходи (до 2020 року)',
//                 url: 'https://10.6.8.191/barsroot/barsweb/loginpage.aspx',
//                 label: 'Є-КАЗНА Доходи до 2020 року'
//             },
//             {
//                 description: 'Сховище даних Є-Звіт (до 2020 року)',
//                 url: 'https://10.6.8.208/barsapp/Account/Login?ReturnUrl=%2fbarsapp%2f',
//                 label: 'Сховище даних Є-Звіт до 2020 року'
//             },
//         ]
//     },
//     {
//         header: 'Тестові системи',
//         files: [
//             {
//                 description: 'Тестовий майданчик Є-КАЗНА Видатки',
//                 url: 'https://10.6.8.225/barsroot/barsweb/loginpage.aspx',
//                 label: 'Тестова система Є-КАЗНА Видатки'
//             },
//             {
//                 description: 'Тестовий майданчик Є-КАЗНА Доходи',
//                 url: 'https://10.6.8.237/barsroot/barsweb/loginpage.aspx',
//                 label: 'Тестова система Є-КАЗНА Доходи'
//             },
//             {
//                 description: 'Тестовий майданчик ЄР/ЄМ',
//                 url: 'http://10.6.8.209/ibank/login.aspx?lang=UK',
//                 label: 'Тестовий система АС Є-Казна "Підсистема ЄР/ЄМ"'
//             },
//             {
//                 description: 'Тестовий майданчик ПТК "Клієнт казначейства - Казначейство" СДО',
//                 url: 'https://10.6.8.148/sdo/Account/Login?ReturnUrl=%2fsdo%2f?lang=UK',
//                 label: 'ПТК "Клієнт казначейства - Казначейство" СДО'
//             },
//             {
//                 description: 'Електронна звітність клієнтів',
//                 url: 'https://10.6.8.228/barsapp/',
//                 label: 'Тестова система  АС "Є-Звітність"'
//             },
//         ]
//     },
//     {
//         header: (
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//                 Інше   
//             </div>
//         ),
//         files: [
//             {
//                 description: 'Електронна пошта',
//                 url: 'https://mail.dksu.gov.ua/owa/',
//                 label: 'https://mail.dksu.gov.ua',
//                 },
//         ]
//     }
// ];
    
    return (
        <div>
            <AdminPanel sections={sections} updateSections={updateSections} />
        <TableContainer component={Paper} className="tableContainer">
            <Table className="table">
                <TableBody>
                    {sections.map(section => renderSection(section, false, false, false))}
                </TableBody>
            </Table>
            </TableContainer>

            <a href="#top" className="to-top-link" onClick={handleScrollToTop}>
                <img src={upArrow} alt="До початку" className="up-arrow" />
            </a>
        </div>    
    );
}

export default Webres;