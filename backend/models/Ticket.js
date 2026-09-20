const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        unique: true,
    },
    customer_name: {
        type: String,
        required: true,
    },
    customer_email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open",

    },
    notes: [{
        text: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    }
    ],

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Ticket", ticketSchema);