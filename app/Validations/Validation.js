const zod = require('zod');

const AdminSignupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
    name: zod.string(),
});

const AdminSigninSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
});

const AddNewItemSchema = zod.object({
    itemPrice: zod.number().positive(),
    itemName: zod.string(),
    itemType: zod.string().optional(),
    itemCategory: zod.string(),
    itemDescription: zod.string().max(200, { message: 'Description must be maximum 200 words' }),
    itemImage: zod.string()
});


module.exports = {
    AdminSignupSchema,
    AdminSigninSchema,
    AddNewItemSchema
};
