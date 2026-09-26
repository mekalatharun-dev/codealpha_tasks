const express = require("express");

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation
} = require("../controllers/reservationController");

const validate = require("../middleware/validation");

const {
    createReservationSchema,
    updateReservationSchema
} = require("../middleware/reservationValidation");

const router = express.Router();

// Create reservation - STAFF or ADMIN
router.post(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(createReservationSchema),
    createReservation
);

// Get all reservations - STAFF or ADMIN
router.get(
    "/",
    authenticate,
    authorize("STAFF", "ADMIN"),
    getReservations
);

// Get reservation by ID - STAFF or ADMIN
router.get(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    getReservationById
);
// Update reservation - STAFF or ADMIN
router.put(
    "/:id",
    authenticate,
    authorize("STAFF", "ADMIN"),
    validate(updateReservationSchema),
    updateReservation
);

module.exports = router;