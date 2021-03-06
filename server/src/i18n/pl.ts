export const loginValidators = {
    email: {
        "string.email": "Nieprawidłowy format adresu email",
        "string.trim": "Adres email nie może zawierać żadnych spacji na początku i końcu",
        "string.empty": "Adres email jest wymagany!",
        "string.max": "Maksymalna ilość znaków to {#limit}",
        "any.required": `Adres email jest wymagany!`,
    },
    password: {
        "string.trim": "Hasło nie może zawierać żadnych spacji na początku i końcu",
        "string.empty": "Hasło jest wymagane!",
        "string.max": "Maksymalna ilość znaków to {#limit}",
        "any.required": `Hasło jest wymagane!`,
    },
};
