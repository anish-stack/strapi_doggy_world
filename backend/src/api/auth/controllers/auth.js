const jwt = require('jsonwebtoken');
const crypto = require('crypto');  // For OTP generation
const bcrypt = require('bcrypt');

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
    
            const Generateotp = crypto.randomInt(100000, 999999);
    
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
                    created_by_id:1.,
                    updated_by_id:1,
                    published_at:null,
                    otp: Generateotp,
                    otpExpiration: otpExpired,
                },
            });
    
        
    
            // Generate JWT token for the first user (You could also generate one for the second user)
            const token = jwt.sign(
                { id: newUser1.id },
                strapi.config.get('plugin::users-permissions.jwtSecret'),
                { expiresIn: '7d' }
            );
    
            // Send the response with the user data and token
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
                ],
                token,
            });
        } catch (error) {
            console.error('Registration Error:', error);
            return ctx.internalServerError('An error occurred during registration.');
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
    
            // Check if the user exists
            const user = await strapi.query('api::auth.auth').findOne({
                where: { contact_number },
            });
            console.log(user)
            if (!user) {
                return ctx.notFound('User not found.');
            }
    
            // Verify the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                return ctx.unauthorized('Invalid password.');
            }
    
            // Generate JWT token
            const token = jwt.sign(
                { id: user.id },
                strapi.config.get('plugin::users-permissions.jwtSecret'),
                { expiresIn: '7d' } // Token validity period
            );
    
            // Send the response with the user data and token
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
    }
    
};
