import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { Offer, OfferRecommendations } from "@/@types/Offer";
import { ref } from "vue";
import { deepAuthenticate, currentUser } from "@/composable/auth/authenticate";
//
export const offer = ref<Offer>({});
const recommendations = ref<OfferRecommendations>();
const NOT_FOUND = ref<boolean>();
//
const fetchData = async (slug: string) => {
    try {
        if (await deepAuthenticate()) {
            const { data }: { data: Offer } = await axios.get(`${API_ADDRESS}/api/offer/${slug}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.accessToken}`
                }
            });
            offer.value = data;
        } else {
            const { data }: { data: Offer } = await axios.get(`${API_ADDRESS}/api/offer/${slug}`);
            offer.value = data;
        }
    } catch (e) {
        NOT_FOUND.value = true;
    }
};
//
const getRecommendations = async () => {
    const { data }: { data: OfferRecommendations } = await axios.get(`${API_ADDRESS}/api/offer/${offer.value.slug}/recommendations`);
    recommendations.value = data;
};
//
export default { offer, NOT_FOUND, fetchData, getRecommendations, recommendations };
