const express = require("express");
const { createTicket, getTickets, getTicketById, updateTicket, detleteTicket, addNote } = require('../controllers/ticketController');

const router = express.Router();

router.post("/tickets", createTicket);
router.get("/tickets", getTickets)
router.get("/tickets/:ticket_id", getTicketById)
router.put("/tickets/:ticket_id", updateTicket);
router.delete("/tickets/:ticket_id", detleteTicket)
router.post("/tickets/:ticket_id/notes", addNote);
module.exports = router;