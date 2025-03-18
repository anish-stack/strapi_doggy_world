const sendCakeBookingComplete = require("../../../utils/cakebooking");

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
            const { orderId, reason } = ctx.request?.body || {};

            if (!orderId || !reason) {
                return ctx.badRequest("Order ID and cancellation reason are required");
            }

            // Update order status in Strapi
            const updatedOrder = await strapi.entityService.update("api::cake-booking.cake-booking", orderId, {
                data: {
                    Order_Cancel_by_user: true,
                    Order_Cancel_by_user_reason: reason,
                    Order_Stauts: "Cancelled",
                },
            });

            return ctx.send({ message: "Order cancelled successfully", updatedOrder });
        } catch (error) {
            console.error("Error cancelling order:", error);
            return ctx.internalServerError("Something went wrong while cancelling the order");
        }
    },
};
