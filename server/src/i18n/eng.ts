export const loginValidators = {
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
