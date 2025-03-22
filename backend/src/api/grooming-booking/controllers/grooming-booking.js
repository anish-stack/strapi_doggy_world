const CancelBookings = require("../../../utils/cancel");
const GroomingMessage = require("../../../utils/groomingMessage");

module.exports = {
    async makeAGroomingBooking(ctx) {
        try {
            const { clinic_id, data_of_g, type, customizedData, Package, time, date, pet } = ctx.request.body || {};


            if (!clinic_id?.id || !type || !time || !date) {
                return ctx.badRequest("Missing required fields: clinic_id, type, time, and date are mandatory.");
            }

            // Fetch Clinic Data
            const clinicData = await strapi.entityService.findOne("api::clinic.clinic", clinic_id.id);
            if (!clinicData) {
                return ctx.badRequest("Invalid clinic selected. Please choose a valid clinic.");
            }

            // Validate Booking Type
            const validTypes = ["Package", "Customize Booking", "General Booking"];
            if (!validTypes.includes(type)) {
                return ctx.badRequest("Invalid booking type. Please select a valid booking type: Package, Customize Booking, or General Booking.");
            }

            let packageBooking = false;
            let generalBooking = false;
            let customizeBooking = false;

            // Handle Package Booking
            if (type === "Package") {
                if (!Package) {
                    return ctx.badRequest("Package ID is required for package bookings.");
                }

                packageBooking = true;
            }

            // Handle General Booking
            else if (type === "General Booking") {
                if (!data_of_g?.id) {
                    return ctx.badRequest("Service ID is required for general bookings.");
                }
                const generalData = await strapi.entityService.findOne("api::grooming-service.grooming-service", data_of_g.id);
                if (!generalData) {
                    return ctx.badRequest("Invalid service ID. Please select a valid grooming service.");
                }
                generalBooking = true;
            }

            // Handle Customized Booking
            else {
                if (!customizedData) {
                    return ctx.badRequest("Customized service details are required for Customize Booking.");
                }
                customizeBooking = true;
            }
            // Extract individual service data
            const bathService = customizedData?.bathService ?? {};
            const haircutService = customizedData?.haircutService ?? {};
            const additionalServices = customizedData?.additionalServices ?? [];

            // Step 1: Prepare Data for Haircut Service
            const haircutCustomizeData = {
                ServiceType: "Haircut Service",
                ServiceName: haircutService?.SubTitle ?? "No Haircut Included",

                Price: haircutService?.price ?? "N/A"
            };

            // Step 2: Prepare Data for Bath Service
            const bathCustomizeData = {
                ServiceType: "Bath Service",
                ServiceName: bathService?.SubTitle ?? "Unknown Service",
                Details: bathService?.including?.join(", ") ?? "No Details Available",
                Price: bathService?.price ?? "N/A"
            };

            // Step 3: Prepare Data for Additional Services (if available)
            const additionalCustomizeData = additionalServices.map(service => ({
                ServiceType: "Additional Service",
                ServiceName: service?.SubTitle ?? "Unknown Additional Service",

                Price: service?.price ?? "N/A"
            }));

            // Combine all services into an array (as 'Customize' expects an array)
            const ArrayOfCustomized = [
                haircutCustomizeData,
                bathCustomizeData,
                ...additionalCustomizeData
            ];

            console.log(ArrayOfCustomized);


            if (!pet) {
                return ctx.badRequest("Pet not found,Please try again later.");
            }

            // Create Booking
            const newBooking = await strapi.entityService.create("api::grooming-booking.grooming-booking", {
                data: {
                    pet: pet?.id,
                    clinic: clinicData.id,
                    Type: type,
                    General_Booking: generalBooking,
                    Date_of_Service: date,
                    Time: time,
                    Package: packageBooking ? Package : null,
                    grooming_service: generalBooking ? data_of_g?.documentId : null,
                    Customize: customizeBooking ? ArrayOfCustomized : [],
                    booking_status: "Pending"
                }
            });
            const content = {
                name: pet?.petName,
                Service: type,
                Date: new Date(date).toLocaleDateString('en-US'),
                Time: time,
                Location: clinicData?.Address,
                Map: clinicData?.Map_Location
            }

            const data = await GroomingMessage(pet?.contact_number, content)

            console.log("✅ Booking Created Successfully:", data);
            return ctx.send({ sucess: true, message: "Your booking has been successfully created!", booking: newBooking });
        } catch (error) {
            console.error("❌ Error Creating Booking:", error);
            return ctx.internalServerError("An unexpected error occurred while processing your booking. Please try again later.");
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
                "api::grooming-booking.grooming-booking",
                id,
                { populate: "*" }
            );

            if (!booking) {
                return ctx.notFound("Booking not found.");
            }

            if (!booking.service_complete) {
                return ctx.badRequest("You can only rate after the consultation is completed.");
            }

            if (booking.is_rate) {
                return ctx.badRequest("You have already rated this consultation.");
            }

            await strapi.entityService.update("api::grooming-booking.grooming-booking", id, {
                data: {
                    is_rate: true,
                    rate: rate,
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
                "api::grooming-booking.grooming-booking",
                id,
                { populate: "*" }
            );

            if (!booking) {
                return ctx.notFound("Booking not found.");
            }

            if (booking.service_complete) {
                return ctx.badRequest("Grooming service already completed. Cancellation not allowed.");
            }

            if (booking.Is_Cancel_By_User || booking?.Is_Cancel_admin) {
                return ctx.badRequest("Grooming service already Cancel!");
            }
            const { pet, Type } = booking || {}
            if (!pet) {
                return ctx.badRequest("Pet not found,Please try again later.");
            }
            // Update the booking record
            await strapi.entityService.update("api::grooming-booking.grooming-booking", id, {
                data: {
                    Is_Cancel_By_User: true,
                    Is_Cancel_user_reason: cancel_reason,
                    booking_status: "Canceled",
                }
            });
            const content = {
                for: `${Type} Of Grooming`,
                name: `${pet?.petName} Parent`,
                ref: `${booking?.documentId?.substring(0, 5)}...`,
                reason: cancel_reason,
                date: new Date().toLocaleDateString("en-US"),
                type: Type,
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
    }
};
