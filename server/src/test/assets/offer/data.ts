export const loggedUsers = {
    admin: {
        id: null as null | number,
        accessToken: "",
        refreshToken: "",
        createdOfferId: null as null | number,
        createdOfferFolder: null as null | string,
    },
    common: {
        id: null as null | number,
        accessToken: "",
        refreshToken: "",
        createdOfferId: null as null | number,
        createdOfferFolder: null as null | string,
    },
};
//
export const usersData = {
    admin: {
        name: "Sergi",
        surname: "Igres",
        email: "igres123@gmail.com",
        password: "zaq123456",
        repeat_password: "zaq123456",
    },
    common: {
        name: "Ramenam",
        surname: "Manemar",
        email: "manema@gmail.com",
        password: "zaq123456",
        repeat_password: "zaq123456",
    },
};
//
export const offerData = {
    title: "Sprzedam komputer",
    categories: JSON.stringify(["COMPUTERY"]),
    description: "Lorem ipsum ipsum lorem",
    price: 5000,
    contact: JSON.stringify({
        phone: "111 222 333",
        fb: "https://www.facebook.com/Centrum-Kszta%C5%82cenia-Zawodowego-i-Ustawicznego-nr-2-w-Wadowicach-283938188765939",
    }),
    photos: JSON.stringify(["img-one", "img-two"]),
    localization: "Budapeszt",
};
