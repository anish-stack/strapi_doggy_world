const sendPhysioComplete = require("../../../utils/sendPhsiyoMessage");
const crypto = require("crypto");
module.exports = {
    async physio_booking(ctx) {
        try {
            const {
                petName,
                contactNumber,
                date,
                ServiceTitle,
                ServiceId,
                isPhysiotherapy,
                user,
                clinicName,
                TypeOfBooking
            } = ctx.request.body || {};

            // Check for missing required fields
            if (!petName || !contactNumber || !date || !ServiceTitle || !ServiceId || !clinicName || !TypeOfBooking) {
                return ctx.send({
                    statusCode: 400,
                    message: "Missing required fields. Please provide all necessary details.",
                });
            }

            console.log("Physio Booking Request:", ctx.request.body);

            // Check if the user exists
            const users = await strapi.entityService.findMany("api::auth.auth");
            const findUser = users.find((item) => item.documentId === user?.id);

            if (!findUser) {
                return ctx.send({
                    statusCode: 404,
                    message: "User not found. Please check your credentials and try again.",
                });
            }

            const startWord = 'PHY';
            const BookingId = crypto.randomBytes(5).toString('hex').substr(0, 10);
            const BookingIdString = startWord + BookingId;
            // Create new physio booking
            const newBooking = await strapi.entityService.create("api::physio-booking.physio-booking", {
                data: {
                    Date_of_appoinment: date,
                    Petname: petName,
                    contactNumber: contactNumber,
                    PetID: { connect: findUser.documentId },
                    physiotherapy: { connect: ServiceId },
                    Clinic: clinicName,
                    isPhysio: isPhysiotherapy,
                    TypeOfBooking: TypeOfBooking,
                    BookingID: BookingIdString
                }
            });


            const content = {
                name: petName,
                Date: new Date(date).toLocaleDateString('en-US'),
                service: ServiceTitle,
                BookingId: BookingIdString,
                number: "098112 99059"
            }
            await sendPhysioComplete(findUser?.contact_number, content)
            return ctx.send({
                statusCode: 201,
                message: "Booking successfully created.",
                bookingId: newBooking.id,
            });

        } catch (error) {
            console.error("Error in physio_booking:", error);
            return ctx.send({
                statusCode: 500,
                message: "An unexpected error occurred. Please try again later.",
                error: error.message
            });
        }
    }
};
