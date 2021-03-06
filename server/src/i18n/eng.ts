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
