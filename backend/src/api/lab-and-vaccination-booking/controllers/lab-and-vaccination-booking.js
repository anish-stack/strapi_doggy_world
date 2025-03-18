const sendRegisterComplete = require("../../../utils/sendRegisterComplete");

module.exports = {
    async make_order(ctx) {
        try {
            const {
                booking_date,
                clinic,
                isChecked,
                user_id,
                offer,
                payableAmount,
                test,
                time,
                totalDiscount,
                totalPrice
            } = ctx.request.body || {};

            console.log("test", test)
            // ✅ 1. Validation - Ensure required fields are present
            if (!booking_date || !clinic?.documentId || !user_id || !payableAmount || !test || test.length === 0) {
                return ctx.badRequest("Missing required fields: booking_date, clinic, user_id, payableAmount, and test are mandatory.");
            }


            const arrayOftest = test.map((item) => {
                if (!item.test_name || !item.documentId || !item.test_price) {
                    throw new Error("Invalid test data: Each test must have a name, ID, service type, and price.");
                }
                return {
                    Test_Name: item.test_name,
                    Test_id: item.documentId,
                    Is_Ultarasound: item.isUltraSound || false,
                    Discount_Price: item.discountPrice || 0,
                    Type_Of_Test: item.serviceType || item?.typeOfTest,
                    Test_Price: item.test_price,
                };
            });
        
            if (isNaN(payableAmount) || payableAmount < 0) {
                return ctx.badRequest("Invalid payable amount.");
            }

            if (totalDiscount < 0 || totalPrice < 0) {
                return ctx.badRequest("Total price and discount cannot be negative.");
            }


           

            const clinicExists = await strapi.entityService.findMany("api::clinic.clinic");
            const userExists = await strapi.entityService.findMany("api::auth.auth");

          
            const findUser = userExists.find((item) => item.documentId === user_id?.id)
            const Clinic = clinicExists.find((item) => item.documentId === clinic?.documentId)

            if (!Clinic) return ctx.badRequest("Clinic  not found.");
            if (!userExists) return ctx.badRequest("User not found.");
            const message = await sendRegisterComplete(findUser?.contact_number, 'booking_confirm_rz', 'en_US', 'https://i.ibb.co/CKxYxtw0/Booking.png')

            const newBooking = await strapi.entityService.create("api::lab-and-vaccination-booking.lab-and-vaccination-booking", {
                data: {
                    clinic: { connect: clinic.documentId },
                    offer: offer?.documentId ? { connect: offer.documentId } : null,
                    Payable_Amount: payableAmount,
                    Test: arrayOftest,
                    Time_Of_Test: time || "Not specified",
                    Total_Discount: totalDiscount || 0,
                    Total_Price: totalPrice || 0,
                    Booking_Date: booking_date,
                    auth: { connect: findUser?.documentId },
                    isBookingCancel: false,
                    is_order_complete: false,
                    whatsapp_notification_done: message?.result
                }
            });
            return ctx.send({
                status: 201,
                message: "Booking successfully created.",
                booking_id: newBooking.id,
            });

        } catch (error) {
            console.error("Error in order:", error);
            return ctx.internalServerError("An error occurred while processing the booking.");
        }
    }
};
