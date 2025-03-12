import React, {useState, useEffect} from "react";
import { Table, TableBody, TableContainer, Paper } from '@mui/material'
import { renderSection } from "./Components/renderSection";
import './CSS/Pages.css';
import upArrow from './Files/up-arrow.svg';
import AdminPanel from "./Components/adminPanel";


// const sections = [
//     {
//         header: 'Форми заявок',
//         files: [
//             { description: 'Додатки до наказу ДКСУ від 20.02.2012 №63', url: './Files/dostup.xls', label: 'Форми заявок на доступ-блокування до IP ITC (Казна)' },
//             { description: 'Додатки до наказу ДКСУ від 20.02.2012 №63', url: './Files/dostupr.xls', label: 'Форми заявок на доступ-блокування до IP ITC (Інше)' },
//             { description: 'Додатки до наказу ДКСУ від 20.02.2012 №63', url: '', label: 'Форми заявок на доступ-блокування адміністраторам' },
//         ]
//     }
// ]

function Blanks() {
    
    const [sections, setSections] = useState([]);
        
    
        useEffect(() => {
            // Получаем данные с сервера
            fetch('http://localhost:5000/api/sections/Blanks')
                .then(response => response.json())
                .then(data => setSections(data))
                .catch(error => console.error('Error fetching sections:', error));
        }, []);
    
        const handleScrollToTop = (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    
        const updateSections = (newSections) => {
            fetch('http://localhost:5000/api/sections/Blanks', {
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

export default Blanks;