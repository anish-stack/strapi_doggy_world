const moment = require("moment");
const sendConsultationComplete = require("../../../utils/consultationMsg");
const CancelBookings = require("../../../utils/cancel");

module.exports = {
    async createOrder(ctx) {
        try {
            const { type, id, user, doctorId, period, date, time } = ctx.request.body || {};


            if (!type || !id || !user || !doctorId || !period || !date || !time) {
                return ctx.badRequest("Missing required fields.");
            }


            const timeRange = time.split(" - "); // e.g., ["5:30 PM", "6:00 PM"]
            if (timeRange.length !== 2) {
                return ctx.badRequest("Invalid time format. Use 'HH:mm AM/PM - HH:mm AM/PM'.");
            }
            // 
            const DoctorExists = await strapi.entityService.findMany("api::doctor.doctor");

            const findDoctor = DoctorExists.find((item) => item.documentId === doctorId)

            const startTime = moment(timeRange[0], "h:mm A").format("HH:mm:ss.SSS");
            const endTime = moment(timeRange[1], "h:mm A").format("HH:mm:ss.SSS");

            // Create a new booking consultation entry
            const newBooking = await strapi.entityService.create("api::booking-consultation.booking-consultation", {
                data: {
                    consultation: id,
                    pet: user.id,
                    doctor: doctorId,
                    period,
                    Date: date,
                    Time: startTime,
                    isBookingCancel: false,
                    is_consultation_complete: false,
                    whatsapp_notification_done: false,
                    reminder_done: false
                }
            });

            const content = {
                name: user?.petName,
                Date: new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                time: `${startTime} - ${endTime}`,
                doctorName: findDoctor?.name,
                amount: findDoctor?.discount_price
            }

            await sendConsultationComplete(user?.contact_number, content)

            return ctx.send({
                status: 201,
                message: "Booking successfully created.",
                booking: newBooking
            });

        } catch (error) {
            console.error("Error in createOrder:", error);
            return ctx.internalServerError("An error occurred while creating the booking.");
        }
    },

    async cancel_booking(ctx) {
        try {
            const { id, cancel_reason } = ctx.request.body;

            if (!id || !cancel_reason) {
                return ctx.badRequest("Booking ID and cancellation reason are required.");
            }

            if (cancel_reason.length > 100) {
                return ctx.badRequest("Cancel reason should not exceed 100 characters.");
            }

            const booking = await strapi.entityService.findOne(
                "api::booking-consultation.booking-consultation",
                id,
                { populate: "*" }
            );

            if (!booking) {
                return ctx.notFound("Booking not found.");
            }

            if (booking.is_consultation_complete) {
                return ctx.badRequest("Consultation already completed. Cancellation not allowed.");
            }

            if (booking.isBookingCancel) {
                return ctx.badRequest("Consultation already Cancel!");
            }
            const { pet, consultation } = booking || {}
            // Update the booking record
            await strapi.entityService.update("api::booking-consultation.booking-consultation", id, {
                data: {
                    isBookingCancel: true,
                    Cancel_Reason: cancel_reason
                }
            });
            const content = {
                for: consultation?.name,
                name: `${pet?.petName} Parent`,
                ref: `${booking?.documentId?.substring(0, 5)}...`,
                reason: cancel_reason,
                date: new Date().toLocaleDateString("en-US"),
                type: consultation?.name,
            };

            await CancelBookings(pet?.contact_number, content)
            return ctx.send({
                status: 200,
                message: "Booking canceled successfully."
            });

        } catch (error) {
            console.error("Error canceling booking:", error);
            return ctx.internalServerError("An error occurred while canceling the booking.");
        }
    },
    async rate_Service(ctx) {
        try {

            const { id, rate, feedback } = ctx.request.body;

            if (!id || rate === undefined) {
                return ctx.badRequest("Booking ID and rating are required.");
            }

            if (typeof rate !== "number" || rate < 1 || rate > 5) {
                return ctx.badRequest("Rating should be a number between 1 and 5.");
            }

            const booking = await strapi.entityService.findOne(
                "api::booking-consultation.booking-consultation",
                id,
                { populate: "*" }
            );

            if (!booking) {
                return ctx.notFound("Booking not found.");
            }

            if (!booking.is_consultation_complete) {
                return ctx.badRequest("You can only rate after the consultation is completed.");
            }

            if (booking.is_rate_done) {
                return ctx.badRequest("You have already rated this consultation.");
            }

            await strapi.entityService.update("api::booking-consultation.booking-consultation", id, {
                data: {
                    is_rate_done: true,
                    consulation_rate: rate,
                    feedback
                }
            });

            return ctx.send({
                status: 200,
                message: "Rating submitted successfully.",
            });

        } catch (error) {
            console.error("Error submitting rating:", error);
            return ctx.internalServerError("An error occurred while submitting the rating.");
        }
    }


};
