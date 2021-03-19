import { ref } from "vue";
import { CreateOfferBody, OfferCurrency } from "@/@types/Offer";
//
const data = ref<CreateOfferBody>({
    title: "",
    category: "education",
    description: "",
    price: 0,
    contact: {
        fb: "https://www.facebook.com/",
        phone: "",
        email: ""
    },
    photos: [],
    country: "",
    currency: "PLN",
    localization: "",
    advantages: [""]
});
//
const photosURLs = ref<string[]>([]);
//
const RESTRICTIONS = {
    description: {
        max: 2000,
        min: 10
    },
    title: {
        max: 50,
        min: 3
    },
    localization: {
        max: 100,
        min: 3
    },
    country: {
        max: 100,
        min: 3
    },
    advantages: {
        list: {
            min: 1,
            max: 30
        },
        single: {
            min: 3,
            max: 150
        }
    },
    contactForms: {
        email: {
            min: 3,
            max: 100
        },
        phone: {
            min: 11,
            max: 11
        },
        fb: {
            min: 26,
            max: 200
        }
    }
};
//
const availableCurrencies: readonly OfferCurrency[] = ["PLN", "EUR", "GBP", "USD"];
const availableContactForms: readonly { val: string; placeholder: string }[] = [
    { val: "email", placeholder: "Enter email..." },
    { val: "fb", placeholder: 'Must start with "https://www.facebook.com/"' },
    { val: "gmail", placeholder: "Enter email..." }
];
//
export default { data, availableCurrencies, RESTRICTIONS, availableContactForms, photosURLs };
