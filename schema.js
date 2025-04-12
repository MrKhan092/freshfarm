const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        productName: Joi.string()
            .regex(/[a-zA-Z]/) 
            .required()
            .messages({
                "string.pattern.base": `"Product Name" must include at least one alphabet.`,
            }),
        description: Joi.string().required(),
        state: Joi.string().required(),
        district: Joi.string().required(),
        price: Joi.number().greater(0).required().messages({
            "number.greater": `"Price" must be greater than 0.`,
        }),
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});
