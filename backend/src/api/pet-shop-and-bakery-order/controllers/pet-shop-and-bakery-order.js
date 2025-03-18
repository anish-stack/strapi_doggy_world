module.exports = {
    async create_order_of_product(ctx) {
        try {
            const data = ctx.request.body || {};
            const address = data?.address || {};
            const customer = data?.user || {};
            const product = data?.Product || {}


            const userExists = await strapi.entityService.findMany("api::auth.auth");
            const findUser = userExists.find((item) => item.documentId === customer?.id)

            const orderItems = Object.entries(product)
                .filter(([key]) => !isNaN(Number(key)))
                .map(([_, value]) => value);

            if (!findUser) return ctx.badRequest("User not found.");

            if (orderItems?.length === 0) {
                return ctx.badRequest("Product not found.");
            }


            const products = await strapi.entityService.findMany("api::product.product");
            const petShopProducts = await strapi.entityService.findMany("api::pet-shop-product.pet-shop-product");

            console.log(petShopProducts.length)
            console.log(products.length)
            // Check if products exist
            const ProductStructure = orderItems.map((item) => {
                console.log("item", item)
                let foundBakeryProduct = null;
                let foundPetShopProduct = null;

                if (item.isBakeryProduct) {
                    foundBakeryProduct = products.find((product) => product.documentId === item.ProductId);
                    console.log("Founded bakery", foundBakeryProduct)
                    if (!foundBakeryProduct) {
                        return ctx.badRequest(`Bakery product with ID ${item.ProductId} not found.`);
                    }
                }

                if (item.isPetShopProduct) {
                    foundPetShopProduct = petShopProducts.find((product) => product.documentId === item.ProductId);
                    if (!foundPetShopProduct) {
                        return ctx.badRequest(`Pet shop product with ID ${item.ProductId} not found.`);
                    }
                }

                return {
                    Bakery_ProductIds: foundBakeryProduct ? [{ id: foundBakeryProduct.id }] : [],
                    pet_shop_product_ids: foundPetShopProduct ? [{ id: foundPetShopProduct.id }] : [],
                    title: item.title || '',
                    isPetShopProduct: item.isPetShopProduct ?? false,
                    quantity: item.quantity ?? 1,
                    varientSize: item.varientSize || '',
                    isVarientTrue: item.isVarientTrue ?? false,
                    isBakeryProduct: item.isBakeryProduct ?? false,
                };
            });


            if (ProductStructure.length === 0) {
                return ctx.badRequest("No valid products found for the order.");
            }

            console.log("Final Product Structure:", ProductStructure);


            const newBooking = await strapi.entityService.create("api::pet-shop-and-bakery-order.pet-shop-and-bakery-order", {
                data: {
                    auth: { connect: findUser.documentId },
                    Billing_Details: address,
                    Shop_bakery_cart_items: ProductStructure,
                    Order_Status: "Order Placed"
                }
            })

            return ctx.send({
                status: 201,
                message: "Order successfully created.",
                order:ProductStructure,
                order_id: newBooking.id,
            });



        } catch (error) {
            console.error('Error in order:', error.message);
            return ctx.send({
                status: 500,
                message: "An unexpected error occurred. Please try again later.",
                error: error.message
            })
        }
    },


    async cancel_my_order(ctx) {
        try {

        } catch (error) {

        }
    },
    async get_my_order(ctx) {
        try {

        } catch (error) {

        }
    },
    async rate_order_product(ctx) {
        try {

        } catch (error) {

        }
    }

}