export const LoginErrorMessages = {
    email: {
        "string.email": "Invalid email address format",
        "string.trim": "Email can not contain leading white marks",
        "string.empty": "Email address is required!",
        "string.max": "Email address can be maximum {#limit} characters long",
        "any.required": `Email address is required!`,
    },
    password: {
        "string.trim": "Password can not contain leading white marks",
        "string.empty": "Password is required!",
        "string.max": "Password can be maximum {#limit} characters long",
        "any.required": `Password is required!`,
    },
};
//
export const RegisterErrorMessages = {
    name: {
        "string.empty": "Name is required!",
        "string.max": "Name can be maximum {#limit} characters long",
        "string.min": "Name must be at least {#limit} characters long",
        "any.required": "Name is required!",
    },
    surname: {
        "string.empty": "Surname is required!",
        "string.max": "Surname can be maximum {#limit} characters long",
        "string.min": "Surname must be at least {#limit} characters long",
        "any.required": "Surname is required!",
    },
    email: {
        "string.email": "Invalid email address format",
        "string.empty": "Email address is required!",
        "string.max": "Email address can be maximum {#limit} characters long",
        "any.required": `Email address is required!`,
        taken: "Email is taken!",
    },
    password: {
        "string.empty": "Password is required!",
        "string.max": "Password can be maximum {#limit} characters long",
        "any.required": `Password is required!`,
        "string.min": "Password must be at least {#limit} characters long",
    },
    repeat_password: {
        "any.only": "Password and its repetition must be the same",
    },
};
//
export const CreateOfferErrorMessages = {
    title: {
        "string.empty": "Offer title is required!",
        "string.max": "Offer title can be maximum {#limit} characters long",
        "string.min": "Offer title must be at least {#limit} characters long",
        "any.required": "Offer title is required!",
    },
    category: {
        "string.empty": "Category is required!",
        "string.valid": "Invalid category!",
        "any.required": "Category is required!",
    },
    description: {
        "string.empty": "Description is required!",
        "string.max": "Description can be maximum {#limit} characters long",
        "string.min": "Description must be at least {#limit} characters long",
        "any.required": "Description is required!",
    },
    price: {
        "string.empty": "Price is required!",
        "any.required": "Price is required!",
    },
    localization: {
        "string.empty": "Localization is required!",
        "string.max": "Localization can be maximum {#limit} characters long",
        "string.min": "Localization must be at least {#limit} characters long",
        "any.required": "Localization is required!",
    },
    photos: {
        "string.empty": "At least one photo is required!",
        "array.min": "At least one photo is required!",
        "any.required": "At least one photo is required!",
    },
    contact: {
        "object.unknown": "Contact object contains unknown property- {#label}",
        "object.min": "Contact must have at least one contact form ['phone','email','fb']",
        "string.max": "{#label} can be maximum {#limit} characters long",
        "string.min": "{#label} must be at least {#limit} characters long",
        "fb.invalid": "Facebook link must start with 'https://www.facebook.com/profile'",
    },
    country: {
        "string.empty": "Country is required!",
        "string.max": "Country can be maximum {#limit} characters long",
        "string.min": "Country must be at least {#limit} characters long",
        "any.required": "Country is required!",
    },
    currency: {
        "string.empty": "Currency is required!",
        "string.valid": "Available currencies: PLN, EUR, USD, GBP",
        "any.required": "Currency is required!",
    },
    advantages: {
        "any.required": "Advantages is required!",
        "array.min": "At least {#limit} advantage gotta be passed",
        "array.max": "Advantages list can be maximum {#limit} elements long",
        "string.min": "Single advantage must be at least {#limit} characters long",
        "string.max": "Single advantage can be maximum {#limit} characters long",
    },
};
//
export const SetReviewErrorMessages = {
    score: {
        "number.empty": "Score is required!",
        "number.max": "Score can be maximum {#limit}",
        "number.min": "Score must be at least {#limit}",
        "any.required": "Score is required!",
    },
    explanation: {
        "string.max": "Explanation can be maximum {#limit} characters long",
        "string.min": "Explanation must be at least {#limit} characters long",
    },
};
