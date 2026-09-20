import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function CreateTicket() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            await api.post("/tickets", formData);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="create-page">

            <div className="create-header">

                <div>
                    <h1>Create New Ticket</h1>
                    <p>
                        Add customer details and describe the issue.
                    </p>
                </div>

                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Tickets
                </button>

            </div>


            <form
                className="ticket-form"
                onSubmit={handleSubmit}
            >

                <div className="form-row">

                    <div className="form-group">

                        <label>Customer Name</label>

                        <input
                            type="text"
                            name="customer_name"
                            placeholder="Enter customer name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Customer Email</label>

                        <input
                            type="email"
                            name="customer_email"
                            placeholder="Enter customer email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label>Issue Title</label>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Enter a short issue title"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        name="description"
                        placeholder="Describe the issue in detail..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Create Ticket
                    </button>

                </div>

            </form>

        </div>
    );
}


export default CreateTicket;
