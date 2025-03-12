import React, {useState, useEffect} from "react";
import { Table, TableBody, TableContainer, Paper } from '@mui/material'
import { renderSection } from "./Components/renderSection";
import './CSS/Pages.css';
import upArrow from './Files/up-arrow.svg';
import AdminPanel from "./Components/adminPanel";

// const sections = [
//     {
//         header: 'АС "Є-Казна"',
//         files: [
//             { description: 'Інструкція користувача автоматизованої системи обліку казначейського виконання бюджетів АС "Є-Казна"', url: '/Files/EKAZNA.pdf', label: 'Інструкція АС "Є-Казна"' },
//         ]
//     },
//     {
//         header: 'СЕД АСКОД',
//         files: [
//             { description: 'Інструкція користувача СЕД АСКОД Створення проекту вихідного документа вiд 2019.03.01', url: '/Files/1_ACrEx.7z', label: '2019.03.01 Створення проекту вихідного документа' },
//             { description: 'Інструкція користувача СЕД АСКОД Створення проекту внутрішнього документа вiд 2019.03.01', url: '/Files/2_ACrIn.7z', label: '2019.03.01 Створення проекту внутрішнього документа' },
//             { description: 'Інструкція користувача СЕД АСКОД Рольова інструкція_Створення РК вiд 2019.05.03', url: '/Files/3_ACrRk.7z', label: 'Рольова інструкція_Створення РК' },
//             { description: 'Інструкція користувача СЕД АСКОД Підготовка Реєстрація вхідного документа діловодом вiд 2019.03.11', url: '/Files/4_ACrNIn.7z', label: '2019.03.11 Підготовка Реєстрація вхідного документа діловодом' },
//             { description: 'Інструкція користувача СЕД АСКОД Інструкція прийому документів засобами СЕВ ОВВ вiд 2019.11.21', url: '/Files/5_AInSev.7z', label: '2019.11.21 Інструкція прийому документів засобами СЕВ ОВВ' },
//             { description: 'Інструкція користувача СЕД АСКОД Додавання шаблону бланків для підрозділу вiд 2019.11.28', url: '/Files/6_ABlnk.7z', label: '2019.11.28 Додавання шаблону бланків для підрозділу' },
//             { description: 'Інструкція користувача СЕД АСКОД Налаштування Аскоду від 2019.05.31', url: '/Files/7_ASetUp.7z', label: '2019.05.31 Налаштування Аскоду' },
//         ]
//     },
//     {
//         header: 'ER EM',
//         files: [
//             { description: 'Інструкція користувача ER EM', url: '/Files/1_ErEm.7z', label: 'Керiвництво користувача' },
//         ]
//     },
//     {
//         header: 'KADRY',
//         files: [
//             { description: 'Інструкція Адміністраторa системи KADRY', url: '/Files/1_KadrA.7z', label: 'Адміністратор системи KADRY' },
//         ]
//     },
//     {
//         header: 'E-Zvit',
//         files: [
//             { description: 'Інструкція Адміністраторa системи E-Zvit', url: '/Files/1_EzvtAdm.7z', label: 'Документація адміністратора_v1.4' },
//             { description: 'Інструкція користувача системи E-Zvit', url: '/Files/2_EzvtUsr.7z', label: 'Документація користувача_full_v1.20' },   
//         ]
//     },
//     {
//         header: 'Телефонний довідник',
//         files: [
//             { description: 'Телефонний довідник вiд 2024.11.07', url: '/Files/ДОВІДНИК ТЕЛЕФОНІВ.zip', label: 'Телефонний довідник' },
//         ]
//     }
// ];

function Instruct() {
    const [sections, setSections] = useState([]);
        
        useEffect(() => {
            // Получаем данные с сервера
            fetch('http://localhost:5000/api/sections/Instruct')
                .then(response => response.json())
                .then(data => setSections(data))
                .catch(error => console.error('Error fetching sections:', error));
        }, []);
    
        const handleScrollToTop = (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    
        const updateSections = (newSections) => {
            fetch('http://localhost:5000/api/sections/Instruct', {
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

    return (
        <div>
            <AdminPanel sections={sections} updateSections={updateSections} />
        <TableContainer component={Paper} className="tableContainer">
            <Table className="table">
                <TableBody>
                    {sections.map(section => renderSection(section, false, true))}
                </TableBody>
            </Table>
            </TableContainer>

            <a href="#top" className="to-top-link" onClick={handleScrollToTop}>
                <img src={upArrow} alt="До початку" className="up-arrow" />
            </a>
        </div>  
    );
}

export default Instruct;