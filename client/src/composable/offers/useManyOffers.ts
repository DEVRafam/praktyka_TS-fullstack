import axios from "axios";
import { API_ADDRESS, OFFERS_PER_PAGE } from "@/composable/env";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "vue";
import { Offer } from "@/@types/Offer";
import { currentUser, deepAuthenticate } from "@/composable/auth/authenticate";
//
//
interface DataInterface {
    pagesAmount: null | number;
    offers: Offer[];
    resultAmount: number;
}
const data = reactive<DataInterface>({
    offers: [],
    pagesAmount: null,
    resultAmount: 0
});
//
const fetchOffers = async () => {
    // data to queries
    const _category = useRoute().query.category || false;
    const _order = useRoute().query.order || false;
    const _search = useRoute().query.search || false;
    // url queries
    const LIMIT = `limit=${OFFERS_PER_PAGE}`;
    const PAGE = `page=${useRoute().query.page || 1}`;
    const CATEGORY = _category ? `&category=${_category}` : "";
    const ORDER = _order ? `&order=${_order}` : "";
    const SEARCH = _search ? `&search=${_search}` : "";
    //
    const { data: response } = await axios.get(`${API_ADDRESS}/api/offer?${LIMIT}&${PAGE}${CATEGORY}${ORDER}${SEARCH}`);
    //
    data.offers = response.rows;
    data.resultAmount = response.count;
    data.pagesAmount = (() => {
        const helper = response.count / OFFERS_PER_PAGE;
        return helper === Math.floor(helper) ? helper : Math.floor(helper) + 1;
    })();
};
//
export const imgPath = (offer: Offer, index = 0) => {
    const img = (offer.photos as string[])[index];
    if (img) {
        const url = `${API_ADDRESS}/api/photo/offers/${offer.folder}/${img}`;
        return `background-image: url('${url}')`;
    } else return null;
};
//
const isOwner = (offer: Offer): boolean => {
    if (offer.creator?.id) return currentUser.id == offer.creator?.id;
    return false;
};
//
const deleteOffer = async (offer: Offer) => {
    if (await deepAuthenticate()) {
        await axios.delete(`${API_ADDRESS}/api/offer/${offer.id}`, {
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        });
    }
    //
    location.reload();
};
//
//
//
export default { ...toRefs(data), fetchOffers, imgPath, isOwner, deleteOffer };
