import React, { useState } from 'react';
import './CSS/Pages.css';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState('');

  const addTicket = () => {
    if (newTicket.trim()) {
      setTickets([...tickets, { id: tickets.length + 1, description: newTicket, status: 'Open' }]);
      setNewTicket('');
    }
  };

  const updateTicketStatus = (id, status) => {
    setTickets(
      tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket))
    );
  };

  return (
    <div className="tickets-container">
      <h1>Система заявок на техобслуживание</h1>
      <div className="ticket-form">
        <input
          type="text"
          placeholder="Введите описание заявки"
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
        />
        <button onClick={addTicket}>Добавить заявку</button>
      </div>
      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.id} className="ticket">
              <p><strong>Заявка #{ticket.id}:</strong> {ticket.description}</p>
              <p><strong>Статус:</strong> {ticket.status}</p>
              <button onClick={() => updateTicketStatus(ticket.id, 'In Progress')}>В работе</button>
              <button onClick={() => updateTicketStatus(ticket.id, 'Closed')}>Закрыть</button>
            </div>
          ))
        ) : (
          <p>Заявок пока нет.</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;
