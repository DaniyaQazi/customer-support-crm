import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";


function TicketDetails() {
    const { ticket_id } = useParams();
    const navigate = useNavigate();


    const [ticket, setTicket] = useState(null);
    const [note, setNote] = useState("");
    const [newStatus, setNewStatus] = useState("");


    useEffect(() => {
        api.get(`/tickets/${ticket_id}`)
            .then((res) => {
                setTicket(res.data);
                setNewStatus(res.data.status);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [ticket_id]);


    const addNote = () => {
        if (!note.trim()) {
            return;
        }

        api.post(`/tickets/${ticket_id}/notes`, {
            text: note
        })
            .then((res) => {
                setTicket(res.data);
                setNote("");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const updateStatus = () => {
        api.put(`/tickets/${ticket_id}`, {
            status: newStatus
        })
            .then((res) => {
                setTicket(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    if (!ticket) {
        return (
            <div className="ticket-details">
                <p>Loading ticket...</p>
            </div>
        );
    }

    const deleteTicket = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ticket?"
        );

        if (!confirmDelete) return;

        api.delete(`/tickets/${ticket_id}`)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <div className="ticket-details">

            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Tickets
            </button>


            <div className="details-header">

                <div>
                    <h1>{ticket.ticket_id}</h1>
                    <p>Support ticket details</p>
                </div>

                <span
                    className={`status ${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                >
                    {ticket.status}
                </span>

            </div>


            <div className="details-section">

                <h3>Ticket Information</h3>

                <div className="details-grid">

                    <div>
                        <strong>Customer</strong>
                        <p>{ticket.customer_name}</p>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <p>{ticket.customer_email}</p>
                    </div>

                    <div>
                        <strong>Subject</strong>
                        <p>{ticket.subject}</p>
                    </div>

                    <div>
                        <strong>Created</strong>
                        <p>
                            {new Date(ticket.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                </div>

                <div className="description-box">

                    <strong>Description</strong>

                    <p>{ticket.description}</p>

                </div>

            </div>


            <div className="details-section">

                <h3>Update Status</h3>

                <div className="status-update">

                    <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>

                    <button onClick={updateStatus}>
                        Update Status
                    </button>

                </div>

            </div>


            <div className="details-section">

                <h3>Add Note</h3>

                <div className="note-input">

                    <input
                        type="text"
                        placeholder="Write a note..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />

                    <button onClick={addNote}>
                        Add Note
                    </button>

                </div>

            </div>


            <div className="details-section">

                <h3>Notes</h3>

                {ticket.notes && ticket.notes.length > 0 ? (

                    ticket.notes.map((item, index) => (
                        <div className="note-item" key={index}>
                            {item.text}
                        </div>
                    ))

                ) : (

                    <p className="no-notes">
                        No notes added yet.
                    </p>

                )}

            </div>
            <div className="details-section">

                <button
                    className="delete-button"
                    onClick={deleteTicket}
                >
                    Delete Ticket
                </button>

            </div>


        </div>
    );
}


export default TicketDetails;
