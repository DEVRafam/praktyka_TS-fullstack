import axios from "axios";
import { API_ADDRESS, OFFERS_PER_PAGE } from "@/composable/env";
import { useRoute } from "vue-router";
import { reactive, toRefs } from "vue";
import { Offer } from "@/@types/Offer";
//
//
interface DataInterface {
    pagesAmount: null | number;
    offers: Offer[];
}
const data = reactive<DataInterface>({
    offers: [],
    pagesAmount: null
});
//
const fetchOffers = async () => {
    // data to queries
    const _category = useRoute().query.category || false;
    const _order = useRoute().query.order || false;
    // url queries
    const LIMIT = `limit=${OFFERS_PER_PAGE}`;
    const PAGE = `page=${useRoute().query.page || 1}`;
    const CATEGORY = _category ? `&category=${_category}` : "";
    const ORDER = _order ? `&order=${_order}` : "";
    //
    const { data: response } = await axios.get(`${API_ADDRESS}/api/offer?${LIMIT}&${PAGE}${CATEGORY}${ORDER}`);
    //
    data.offers = response.rows;
    data.pagesAmount = (() => {
        const helper = response.count / OFFERS_PER_PAGE;
        return helper === Math.floor(helper) ? helper : Math.floor(helper) + 1;
    })();
};
//
const imgPath = (offer: Offer, index = 0) => {
    const img = (offer.photos as string[])[index];
    if (img) {
        const url = `${API_ADDRESS}/api/photo/offers/${offer.folder}/${img}`;
        return `background-image: url('${url}')`;
    } else return null;
};
// transform price from 10000
const priceSeparators = (offer: Offer): string => {
    const addSeparators = (val: string): string => {
        return val
            .split("")
            .reverse()
            .map((el, index) => {
                return (index - 1) % 3 === 2 ? `${el} ` : el;
            })
            .reverse()
            .join("");
    };
    const result = String(offer.price);
    const fractionIndex = result.indexOf(".");
    if (fractionIndex === -1) return addSeparators(result);
    else {
        return addSeparators(result.slice(0, fractionIndex)) + `,${result.slice(fractionIndex + 1)}`;
    }
};
//
//
//
export default { fetchOffers, ...toRefs(data), imgPath, priceSeparators };
