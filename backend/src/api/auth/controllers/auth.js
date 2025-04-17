const jwt = require('jsonwebtoken');
const crypto = require('crypto');  // For OTP generation
const bcrypt = require('bcrypt');
const sendOtp = require('../../../utils/Sendotp');
const sendRegisterComplete = require('../../../utils/sendRegisterComplete');

module.exports = {

    async register(ctx) {
        try {
            const {
                PetType,
                petName,
                contact_number,
                Breed,
                DOB,
                Age,
                password,
            } = ctx.request.body;

            console.log(ctx.request.body);

            const existingUser = await strapi.query('api::auth.auth').findOne({
                where: { contact_number }
            });

            if (existingUser) {

                return ctx.badRequest('Contact number is already in use.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const Generateotp = 123456

            const otpExpired = new Date();
            otpExpired.setMinutes(otpExpired.getMinutes() + 2);


            const newUser1 = await strapi.query('api::auth.auth').create({
                data: {
                    password: hashedPassword,
                    PetType,
                    petName,
                    contact_number,
                    Breed,
                    DOB,
                    Age,
                    created_by_id: 1.,
                    updated_by_id: 1,
                    published_at: null,
                    otp: Generateotp,
                    otpExpired: otpExpired,
                },
            });


            const otp = await sendOtp(contact_number, Generateotp)
            if (otp) {
                console.log('OTP sent successfully');
            } else {
                console.log('Failed to send OTP');
            }

            return ctx.send({
                message: 'User registered successfully! Two entries created.',
                users: [
                    {
                        id: newUser1.id,
                        PetType: newUser1.PetType,
                        petName: newUser1.petName,
                        contact_number: newUser1.contact_number,
                        Breed: newUser1.Breed,
                        DOB: newUser1.DOB,
                        Age: newUser1.Age,
                    }
                ]

            });
        } catch (error) {
            console.error('Registration Error:', error);
            return ctx.internalServerError('An error occurred during registration.');
        }
    },
    async resendOtp(ctx) {
        try {
            const { number } = ctx.request.body || {};
            console.log(number);
            if (!number) {
                return ctx.badRequest('Missing contact number.');
            }

            // Check if number exists
            const user = await strapi.entityService.findMany('api::auth.auth', {
                filters: { contact_number: number },
                limit: 1
            });

            if (!user.length) {
                return ctx.badRequest('Invalid contact number.');
            }

            const userData = user[0];

            // Generate a new OTP (6-digit random number)
            const newOtp = 123456

            // Set OTP expiration (5 minutes from now)
            const otpExpiration = new Date();
            otpExpiration.setMinutes(otpExpiration.getMinutes() + 5);

            // Update OTP in the database
            await strapi.entityService.update('api::auth.auth', userData.id, {
                data: {
                    otp: newOtp,
                    otpExpiration
                }
            });

            // Send OTP via external API
            await sendOtp(number, newOtp);

            return ctx.send({
                message: 'OTP resent successfully.'
            });

        } catch (error) {
            console.error('Error resending OTP:', error);
            return ctx.internalServerError('Something went wrong.');
        }
    },

    async verifyOtp(ctx) {
        try {
            const { otp, number } = ctx.request.body || {};
            console.log(ctx.request.body)

            if (!otp || !number) {
                return ctx.badRequest('Missing OTP or contact number.');
            }

            const checkNumberisValid = await strapi.entityService.findMany('api::auth.auth', {
                filters: { contact_number: number },
                limit: 1
            });

            if (!checkNumberisValid.length) {
                return ctx.badRequest('Invalid contact number.');
            }

            const user = checkNumberisValid[0];
            console.log("user", user)

            if (otp !== user.otp) {
                return ctx.badRequest('Invalid OTP.');
            }

            // Check if OTP is expired
            const otpExpired = new Date(user.otpExpiration);
            const currentDate = new Date();

            if (currentDate > otpExpired) {
                return ctx.badRequest('OTP expired.');
            }

            // Update OTP status to used
            await strapi.entityService.update('api::auth.auth', user.id, {
                data: {
                    otp: null,
                    otpExpiration: null,
                    isVerified: true
                }
            });

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id },
                strapi.config.get('plugin::users-permissions.jwtSecret'),
                { expiresIn: '7d' }
            );
            await sendRegisterComplete(user?.contact_number)
            return ctx.send({
                message: 'OTP verified successfully.',
                token
            });

        } catch (error) {
            console.error('Error verifying OTP:', error);
            return ctx.internalServerError('Something went wrong.');
        }
    },
    async findAll(ctx) {
        try {
            // Fetch all users
            const users = await strapi.query('api::auth.auth').findMany();

            // If no users found, return a message
            if (users.length === 0) {
                return ctx.send({ message: 'No users found.' });
            }

            // Return the list of users
            return ctx.send({
                users: users.map(user => ({
                    id: user.id,
                    PetType: user.PetType,
                    petName: user.petName,
                    contact_number: user.contact_number,
                    Breed: user.Breed,
                    DOB: user.DOB,
                    Age: user.Age,
                })),
            });
        } catch (error) {
            console.error('Error Fetching Users:', error);
            return ctx.internalServerError('An error occurred while fetching users.');
        }
    },
    async findOne(ctx) {
        try {
            const { contact_number } = ctx.params;

            // Fetch the user by contact number
            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });

            if (!user) {
                return ctx.notFound('User not found.');
            }

            // Return the user data
            return ctx.send({
                user: {
                    id: user.id,
                    PetType: user.PetType,
                    petName: user.petName,
                    contact_number: user.contact_number,
                    Breed: user.Breed,
                    DOB: user.DOB,
                    Age: user.Age,
                },
            });
        } catch (error) {
            console.error('Error Fetching User:', error);
            return ctx.internalServerError('An error occurred while fetching the user.');
        }
    },

    async update(ctx) {
        try {
            const { contact_number } = ctx.params;
            const { PetType, petName, Breed, DOB, Age } = ctx.request.body;

            // Find the user by contact number
            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });

            if (!user) {
                return ctx.notFound('User not found.');
            }

            // Update the user details
            const updatedUser = await strapi.query('api::auth.auth').update({
                where: { contact_number },
                data: {
                    PetType: PetType || user.PetType,
                    petName: petName || user.petName,
                    Breed: Breed || user.Breed,
                    DOB: DOB || user.DOB,
                    Age: Age || user.Age,
                },
            });

            // Send the updated user data as response
            return ctx.send({
                message: 'User updated successfully!',
                user: updatedUser,
            });
        } catch (error) {
            console.error('Error Updating User:', error);
            return ctx.internalServerError('An error occurred while updating the user.');
        }
    },
    async login(ctx) {
        try {
            const { contact_number, password } = ctx.request.body;

            if (!contact_number || !password) {
                return ctx.badRequest('Contact number and password are required.');
            }


            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });

            if (!user) {
                return ctx.notFound('User not found.');
            }


            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return ctx.unauthorized('Invalid password.');
            }


            const token = jwt.sign(
                { id: user.id },
                strapi.config.get('plugin::users-permissions.jwtSecret'),
                { expiresIn: '7d' } // Token validity period
            );


            return ctx.send({
                message: 'Login successful!',
                user: {
                    id: user.id,
                    PetType: user.PetType,
                    petName: user.petName,
                    contact_number: user.contact_number,
                    Breed: user.Breed,
                    DOB: user.DOB,
                    Age: user.Age,
                },
                token,
            });
        } catch (error) {
            console.error('Login Error:', error);
            return ctx.internalServerError('An error occurred during login.');
        }
    },

    async loginThroughOtp(ctx) {
        try {
            const { contact_number } = ctx.request.body;


            if (!contact_number) {
                return ctx.badRequest('Please provide a valid contact number.');
            }


            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });

            if (!user) {
                return ctx.notFound('No account found with this contact number. Please sign up first.');
            }

            const generatedOtp = crypto.randomInt(100000, 999999);
            const otpExpiryTime = new Date();
            otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 2);
            await sendOtp(contact_number, generatedOtp);


            await strapi.query('api::auth.auth').update({
                where: { id: user.id },
                data: {
                    loginOtp: generatedOtp,
                    otpExpiry: otpExpiryTime,
                },
            });

            return ctx.send({
                message: 'An OTP has been sent to your WhatsApp. It will expire in 2 minutes.',
                success: true,
                status: 201,
            });

        } catch (error) {
            console.error('Error during OTP login:', error);
            return ctx.internalServerError('Something went wrong. Please try again later.');
        }
    },
    async verifyLoginOtp(ctx) {
        try {
            const { contact_number, otp } = ctx.request.body;

            // Validate inputs
            if (!contact_number || !otp) {
                return ctx.badRequest('Please provide a contact number and OTP.');
            }

            // Find user
            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });

            if (!user) {
                return ctx.notFound('No account found with this contact number.');
            }

            // Check OTP and expiration
            if (user.loginOtp !== otp) {
                return ctx.badRequest('Invalid OTP. Please enter the correct code.');
            }

            if (new Date() > new Date(user.otpExpiry)) {
                return ctx.badRequest('OTP has expired. Please request a new one.');
            }


            await strapi.query('api::auth.auth').update({
                where: { id: user.id },
                data: { loginOtp: null, otpExpiry: null },
            });
            const token = jwt.sign(
                { id: user.id },
                strapi.config.get('plugin::users-permissions.jwtSecret'),
                { expiresIn: '7d' } // Token validity period
            );



            return ctx.send({
                message: 'OTP verified successfully. You are now logged in!',
                success: true,
                token: token,
                status: 200,
            });

        } catch (error) {
            console.error('Error during OTP verification:', error);
            return ctx.internalServerError('Something went wrong. Please try again later.');
        }
    },

    async resendLoginOtp(ctx) {
        try {
            const { contact_number } = ctx.request.body;

            // Validate contact number
            if (!contact_number) {
                return ctx.badRequest('Please provide a valid contact number.');
            }

            // Find user
            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });

            if (!user) {
                return ctx.notFound('No account found with this contact number.');
            }

            // Generate new OTP
            const newOtp = crypto.randomInt(100000, 999999);
            const newOtpExpiry = new Date();
            newOtpExpiry.setMinutes(newOtpExpiry.getMinutes() + 2); // Expires in 2 minutes

            // Send new OTP
            await sendOtp(contact_number, newOtp);

            // Update OTP in database
            await strapi.query('api::auth.auth').update({
                where: { id: user.id },
                data: {
                    loginOtp: newOtp,
                    otpExpiry: newOtpExpiry,
                },
            });

            return ctx.send({
                message: 'A new OTP has been sent to your WhatsApp. It will expire in 2 minutes.',
                success: true,
                status: 201,
            });

        } catch (error) {
            console.error('Error during OTP resend:', error);
            return ctx.internalServerError('Something went wrong. Please try again later.');
        }
    },



    async findMe(ctx) {
        try {
            const authHeader = ctx.request.headers.authorization;
            console.log("authHeader:", authHeader);

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return ctx.unauthorized("Missing Authorization header.");
            }

            const token = authHeader.split(" ")[1]?.trim();

            // ⛔️ Check for null/empty token
            if (!token || token === "null" || token.split(".").length !== 3) {
                console.error("Invalid token format:", token);
                return ctx.unauthorized("Invalid or missing token.");
            }

            const jwtSecret = strapi.config.get("plugin::users-permissions.jwtSecret");

            let decoded;
            try {
                decoded = jwt.verify(token, jwtSecret);
            } catch (error) {
                console.error("JWT Verification Error:", error);
                return ctx.unauthorized("Invalid or expired token.");
            }

            if (!decoded || !decoded.id) {
                return ctx.unauthorized("Token verification failed.");
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                return ctx.unauthorized("Token expired, please log in again.");
            }

            await new Promise(resolve => setTimeout(resolve, 100));

            const user = await strapi.query("api::auth.auth").findOne({ where: { id: decoded.id } });

            if (!user) {
                return ctx.notFound("User not found.");
            }

            return ctx.send({
                success: true,
                data: {
                    id: user.documentId,
                    PetType: user.PetType,
                    petName: user.petName,
                    contact_number: user.contact_number,
                    Breed: user.Breed,
                    DOB: user.DOB,
                    Verified: user?.isVerified,
                    Age: user.Age,
                }
            });

        } catch (error) {
            console.error("Error in findMe:", error);
            return ctx.badRequest("An error occurred while fetching user data.");
        }
    },

    async findMyAllOrders(ctx) {
        try {
            const userId = ctx.state.user?.id || ctx.request.query.id;


            if (!userId) {
                return ctx.badRequest("User not authenticated");
            }

            // Fetch all bookings with populated relationships
            const [
                allConsultationBookings,
                allCakeBookings,
                allGroomingPackages,
                allLabVaccinations,
                allPetShopOrders,
                allPhysioBookings
            ] = await Promise.all([
                strapi.entityService.findMany("api::booking-consultation.booking-consultation", { populate: "*" }),
                strapi.entityService.findMany("api::cake-booking.cake-booking", { populate: "*" }),
                strapi.entityService.findMany("api::grooming-booking.grooming-booking", { populate: "*" }),
                strapi.entityService.findMany("api::lab-and-vaccination-booking.lab-and-vaccination-booking", { populate: "*" }),
                strapi.entityService.findMany("api::pet-shop-and-bakery-order.pet-shop-and-bakery-order", { populate: "*" }),
                strapi.entityService.findMany("api::physio-booking.physio-booking", { populate: "*" })
            ]);

            const consultationBookings = allConsultationBookings.filter(item => item.pet?.documentId === userId);
            const cakeBookings = allCakeBookings.filter(item => item.pet_id?.documentId === userId);
            const groomingPackages = allGroomingPackages.filter(item => item.pet?.documentId === userId);
            const labVaccinations = allLabVaccinations.filter(item => item.auth?.documentId === userId);
            const petShopOrders = allPetShopOrders.filter(item => item.auth?.documentId === userId);
            const physioBookings = allPhysioBookings.filter(item => item.PetID?.documentId === userId);

            const allOrders = {
                consultationBookings,
                cakeBookings,
                groomingPackages,
                labVaccinations,
                petShopOrders,
                physioBookings
            };

            return ctx.send({ success: true, orders: allOrders });

        } catch (error) {
            console.error("Error fetching orders:", error);
            return ctx.internalServerError("Something went wrong while fetching orders");
        }
    }




};
