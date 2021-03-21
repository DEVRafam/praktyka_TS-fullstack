import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { ref } from "vue";
import { OffersManagement, OfferStatus } from "@/@types/Offer";
import { currentUser, deepAuthenticate } from "@/composable/auth/authenticate";
//
export const data = ref<OffersManagement>();
const NOT_FOUND = ref<boolean>();
//
const fetchData = async (userID: number) => {
    try {
        if (!(await deepAuthenticate())) return (NOT_FOUND.value = true);
        const { data: response }: { data: OffersManagement } = await axios.get(`${API_ADDRESS}/api/offer/dealer/${userID}`, {
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        });
        data.value = response;
    } catch (e) {
        NOT_FOUND.value = true;
    }
};
//
export const changeStatus = async (offerId: number, status: OfferStatus) => {
    if (!(await deepAuthenticate())) return;
    //
    await axios.post(
        `${API_ADDRESS}/api/offer/${offerId}/change-status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        }
    );
    //
};
//
export const deleteOffer = async (offerId: number, redirectHome = false) => {
    if (await deepAuthenticate()) {
        await axios.delete(`${API_ADDRESS}/api/offer/${offerId}`, {
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        });
    }
    //
    redirectHome ? (location.href = "/") : location.reload();
};
export default { fetchData, data, NOT_FOUND };
