import { ref, watch } from "vue";
import { CreateOfferBody, OfferCurrency } from "@/@types/Offer";
import { JoiError } from "@/@types/joiError";
const LOCALSTORAGE_KEY = "create_offer";
//
export interface Restriction {
    min: number;
    max: number;
}
export interface Restrictions {
    description: Restriction;
    title: Restriction;
    localization: Restriction;
    country: Restriction;
    advantages: {
        list: Restriction;
        single: Restriction;
    };
    contactForms: {
        email: Restriction;
        phone: Restriction;
        fb: Restriction;
    };
}
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
    advantages: ["", "", ""]
});
//
watch(
    data,
    val => {
        // eslint-disable-next-line
        const { photos, ...data } = val;
        // eslint-disable-next-line
        (data.advantages as any) = JSON.stringify(data.advantages);
        // eslint-disable-next-line
        (data.contact as any) = JSON.stringify(data.contact);
        //
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
    },
    { deep: true }
);
//
if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    const dataFromLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) as string);
    //
    ["title", "category", "description", "price", "country", "currency", "localization"].forEach(key => {
        // eslint-disable-next-line
        (data.value as any)[key] = (dataFromLS as any)[key];
    });
    //
    ["contact", "advantages"].forEach(key => {
        // eslint-disable-next-line
        (data.value as any)[key] = JSON.parse((dataFromLS as any)[key]);
    });
}
const photosURLs = ref<string[]>([]);
const RESTRICTIONS: Restrictions = {
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
const availableContactForms: readonly { val: string; placeholder: string; onchange?(e: InputEvent): void }[] = [
    { val: "email", placeholder: "Enter email..." },
    { val: "fb", placeholder: 'Must start with "https://www.facebook.com/"' },
    {
        val: "phone",
        placeholder: "Enter phone...",
        onchange: e => {
            if (e.inputType === "deleteContentBackward") return;
            const { value } = e.target as HTMLInputElement;
            if (value.length === 11) return;
            const lastIndex = value.length - 1;
            //
            if (isNaN(+value[lastIndex]))
                (e.target as HTMLInputElement).value = value
                    .split("")
                    .slice(0, lastIndex)
                    .join("");
            if (value.split("").filter(el => el !== " ").length % 3 === 0) (e.target as HTMLInputElement).value = `${value} `;
        }
    }
];
//
const uploading = ref<boolean>(false);
const status = ref<"positive" | "negative" | "pending">("pending");
const errors = ref<JoiError[]>();

const clear = () => {
    status.value = "pending";
    errors.value = [];
    uploading.value = false;
    photosURLs.value = [];
};
const resetData = () => {
    data.value.title = "";
    data.value.category = "education";
    data.value.description = "";
    data.value.price = 0;
    data.value.contact = {
        fb: "https://www.facebook.com/",
        phone: "",
        email: ""
    };
    data.value.photos = [];
    data.value.country = "";
    data.value.currency = "PLN";
    data.value.localization = "";
    data.value.advantages = ["", "", ""];
};
export default { data, availableCurrencies, RESTRICTIONS, availableContactForms, photosURLs, uploading, status, errors, clear, resetData };
