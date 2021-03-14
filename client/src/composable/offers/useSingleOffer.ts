import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { Offer } from "@/@types/Offer";
import { ref } from "vue";
//
const offer = ref<Offer>({});
const NOT_FOUND = ref<boolean>();
//
const fetchData = async (slug: string) => {
    try {
        const { data }: { data: Offer } = await axios.get(`${API_ADDRESS}/api/offer/${slug}`);
        offer.value = data;
    } catch (e) {
        NOT_FOUND.value = true;
    }
};
export default { offer, NOT_FOUND, fetchData };
