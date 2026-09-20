const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
    try {
        const {
            customer_name,
            customer_email,
            subject,
            description,
        } = req.body;

        const lastTicket = await
            Ticket.findOne().sort({ createdAt: -1 });
        let ticketNumber = 1;
        if (lastTicket) {
            ticketNumber = parseInt(lastTicket.ticket_id.split("-")[1]) + 1;
        }

        const ticket_id = `TKT-${String(ticketNumber).padStart(3, "0")}`;

        const ticket = new Ticket({
            ticket_id,
            customer_name,
            customer_email,
            subject,
            description,
        });
        await ticket.save();

        res.status(201).json({
            ticket_id: ticket.ticket_id,
            created_at: ticket.createdAt
        });

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create ticket",
            error: error.message,
        });
    }
};

const getTickets = async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = {};

        if (status) {
            filter.status = status;
        }
        if (search) {
            filter.$or = [
                { customer_name: { $regex: search, $options: "i" } },
                { customer_email: { $regex: search, $options: "i" } },
                { subject: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { ticket_id: { $regex: search, $options: "i" } },
            ];
        }
        const tickets = await
            Ticket.find(filter).sort({ createdAt: -1 });

        res.status(200).json(tickets);

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to Fetch tickets",
            error: error.message
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await
            Ticket.findOne({ ticket_id: req.params.ticket_id });

        if (!ticket) {
            returnres.status(404).json({ message: "Ticket not Found" });
        }
        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch Ticket",
            error: "error.message",
        });

    }
}


const updateTicket = async (req, res) => {
    try {
        const ticket = await
            Ticket.findOneAndUpdate(
                { ticket_id: req.params.ticket_id },
                { status: req.body.status },
                { new: true },
            );

        if (!ticket) {
            return
            res.status(404).json({ message: "Ticket not fund" })
        }



        res.status(200).json(ticket);

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to Update ticket",
            error: error.message
        })

    }
}

const detleteTicket = async (req, res) => {
    try {
        const ticket = await
            Ticket.findOneAndDelete(
                {
                    ticket_id: req.params.ticket_id
                }

            )
        if (!ticket) {
            return
            res.status(404).json({ message: "Ticket not found" })
        }

        res.status(200).json(ticket);

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete the Ticket",
            error: error.message
        })
    }
}

const addNote = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({
            ticket_id: req.params.ticket_id
        });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        ticket.notes.push({
            text: req.body.text
        });

        await ticket.save();

        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTicket, getTickets, getTicketById, updateTicket, detleteTicket, addNote };