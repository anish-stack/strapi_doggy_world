const moment = require("moment");

module.exports = {
    async createOrder(ctx) {
        try {
            const { type, id, user, doctorId, period, date, time } = ctx.request.body || {};

            // Validate required fields
            if (!type || !id || !user || !doctorId || !period || !date || !time) {
                return ctx.badRequest("Missing required fields.");
            }

            // Convert time format (Strapi expects HH:mm:ss.SSS)
            const timeRange = time.split(" - "); // e.g., ["5:30 PM", "6:00 PM"]
            if (timeRange.length !== 2) {
                return ctx.badRequest("Invalid time format. Use 'HH:mm AM/PM - HH:mm AM/PM'.");
            }

            const startTime = moment(timeRange[0], "h:mm A").format("HH:mm:ss.SSS");
            const endTime = moment(timeRange[1], "h:mm A").format("HH:mm:ss.SSS");

            // Create a new booking consultation entry
            const newBooking = await strapi.entityService.create("api::booking-consultation.booking-consultation", {
                data: {
                    consultation: id, // Linking consultation
                    pet: user.id, // Linking user/pet
                    doctor: doctorId,
                    period,
                    Date: date,
                    Time: startTime, // Storing only the start time
                    isBookingCancel: false,
                    is_consultation_complete: false,
                    whatsapp_notification_done: false,
                    reminder_done: false
                }
            });

            return ctx.send({
                status: 201,
                message: "Booking successfully created.",
                booking: newBooking
            });

        } catch (error) {
            console.error("Error in createOrder:", error);
            return ctx.internalServerError("An error occurred while creating the booking.");
        }
    }
};
