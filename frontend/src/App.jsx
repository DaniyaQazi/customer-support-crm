import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import api from "./services/api";
import TicketCard from "./components/TicketCard";
import CreateTicket from "./components/createTicket";
import TicketDetails from "./components/TicketDetails";


function Home() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");


  useEffect(() => {
    api
      .get("/tickets", {
        params: {
          search: search,
          status: status,
        },
      })
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, status]);


  return (
    <div className="app-layout">

      <aside className="sidebar">

        <div className="logo">
          🎧 Support CRM
        </div>

        <nav>

          <Link to="/" className="nav-link active">
            🏠 Home
          </Link>

          <Link to="/" className="nav-link">
            🎫 Tickets
          </Link>

          <Link to="/create" className="nav-link">
            ＋ Create Ticket
          </Link>

        </nav>

      </aside>


      <main className="main-content">

        <header className="topbar">

          <div className="user-name">
            <span className="avatar">DQ</span>
            Admin
          </div>

        </header>


        <div className="page-content">

          <div className="page-header">

            <div>
              <h1>All Tickets</h1>
              <p>Search and manage your support tickets.</p>
            </div>

            <Link to="/create">
              <button className="primary-button">
                + Create Ticket
              </button>
            </Link>

          </div>


          <div className="search-filter">

            <div className="search-box">

              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            <select
              className="status-filter"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

          </div>


          <div className="tickets-list">

            {tickets.length === 0 ? (

              <div className="empty-state">
                No tickets found.
              </div>

            ) : (

              tickets.map((ticket) => (
                <TicketCard
                  key={ticket.ticket_id}
                  ticket={ticket}
                />
              ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}


function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/create"
        element={<CreateTicket />}
      />

      <Route
        path="/tickets/:ticket_id"
        element={<TicketDetails />}
      />

    </Routes>
  );
}


export default App;
