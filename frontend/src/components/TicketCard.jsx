import { useNavigate } from "react-router-dom";


function TicketCard({ ticket }) {
    const navigate = useNavigate();


    return (
        <div className="ticket-card">

            <div className="ticket-top">

                <h3>{ticket.ticket_id}</h3>

                <span
                    className={`status ${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                >
                    {ticket.status}
                </span>

            </div>


            <div className="ticket-info">

                <p>
                    <strong>Customer</strong>
                    <span>{ticket.customer_name}</span>
                </p>


                <p>
                    <strong>Subject</strong>
                    <span>{ticket.subject}</span>
                </p>


                <p>
                    <strong>Created</strong>
                    <span>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                </p>

            </div>


            <button
                className="view-button"
                onClick={() =>
                    navigate(`/tickets/${ticket.ticket_id}`)
                }
            >
                View Details →
            </button>

        </div>
    );
}


export default TicketCard;
