const sendCakeBookingComplete = require("../../../utils/cakebooking");
const CancelBookings = require("../../../utils/cancel");

module.exports = {
    async create_cake_order(ctx) {
        try {
            const {
                name,
                phone,
                address,
                houseNo,
                landmark,
                pincode,
                storeId,
                deliveryDate,
                Same_Day_delivery,
                flavour,
                pet_details,
                design,
                quantity,
                price,
            } = ctx.request?.body || {};

            // Validate required fields
            if (!name || !phone || !address || !deliveryDate || !storeId || !quantity || !price) {
                return ctx.badRequest('Missing required fields');
            }


            const order = await strapi.entityService.create("api::cake-booking.cake-booking", {
                data: {
                    Caketitle: flavour,
                    flavour: flavour,
                    pet_id: { connect: pet_details?.id },
                    Design: design,
                    size: quantity,
                    price: parseInt(price, 10),
                    Delivery_Date: deliveryDate,
                    Same_Day_delivery: Same_Day_delivery || false,
                    Order_Cancel_by_user: false,
                    Order_Stauts: "Pending",
                    Billing_details: {
                        fullName: name,
                        phone,
                        city: '',
                        street: address,
                        HouseNo: houseNo,
                        landmark,
                        zipCode: pincode,

                    },
                    clinic: { connect: storeId }
                },
            })
            const content = {
                name,
                Date: deliveryDate,
                flavour,
                design,
                quantity,
                price,
                houseNo,
                address,
                landmark,
                pincode

            }
            await sendCakeBookingComplete(phone, content)
            return ctx.send({ message: "Order created successfully", order });
        } catch (error) {
            console.error("Error creating order:", error);
            return ctx.internalServerError("Something went wrong while creating the order");
        }
    },

    async cancel_cake_order_by_user(ctx) {
        try {
            console.log("ctx.request?.body", ctx.request?.body)
            const { orderId, reason } = ctx.request?.body || {};

            if (!orderId || !reason) {
                return ctx.badRequest("Order ID and cancellation reason are required");
            }


            const booking = await strapi.entityService.findOne(
                "api::cake-booking.cake-booking",
                orderId,
                { populate: "*" }
            );

            if (!booking) {
                return ctx.notFound("Booking not found.");
            }

            if (booking.Order_Stauts === "Cancel") {
                return ctx.badRequest("Order Has Been  already Cancel!");
            }


            if (booking.Order_Stauts !== "Pending") {
                return ctx.badRequest(`Order is in progress. Your order is currently in the "${booking.Order_Stauts}" status and cannot be canceled.`);
            }

            const { flavour, pet_id, Order_Cancel_by_user_reason, Billing_details } = booking || {}

            await strapi.entityService.update("api::cake-booking.cake-booking", orderId, {
                data: {
                    Order_Cancel_by_user: true,
                    Order_Cancel_by_user_reason: reason,
                    Order_Stauts: "Cancel",
                }
            });

            const content = {
                for: flavour,
                name: `${pet_id?.petName} Parent`,
                ref: `${booking?.documentId?.substring(0, 5)}...`,
                reason: Order_Cancel_by_user_reason,
                date: new Date().toLocaleDateString("en-US"),
                type: flavour,
            };
            console.log("content", content)
            // await CancelBookings(pet_id?.contact_number, content)
            return ctx.send({
                status: 200,
                message: "Cake Order Booking canceled successfully."
            });

        } catch (error) {
            console.error("Error cancelling order:", error);
            return ctx.internalServerError("Something went wrong while cancelling the order");
        }
    },
};
