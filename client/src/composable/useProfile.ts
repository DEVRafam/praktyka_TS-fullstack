import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { ref } from "vue";
import { Profile } from "@/@types/user";
import { findLabel } from "@/composable/offers/useCategoriesList";
//
const profile = ref<Profile>();
const NOT_FOUND = ref<boolean>();
//
const fetchData = async (id: number) => {
    try {
        const { data }: { data: Profile } = await axios.get(`${API_ADDRESS}/api/user/${id}`);
        profile.value = data;
    } catch (e) {
        NOT_FOUND.value = true;
    }
};
//
// CHART DATAS
//
export const offersChartData = () => {
    if (!profile.value) return;
    // eslint-disable-next-line
    const result: any = {};
    profile.value.offers_stats.forEach(el => {
        result[findLabel(el.category) as string] = el.amount;
    });
    return result;
};
//
export const reviewsChartData = () => {
    if (!profile.value) return;
    // eslint-disable-next-line
    const times: any = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    profile.value.reviews_about_self.forEach(val => {
        times[String(Math.floor(val.score))]++;
    });
    //
    return times;
};
//
export const reviewedChartData = () => {
    if (!profile.value) return;
    // eslint-disable-next-line
    const times: any = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    profile.value.reviews_about_others.forEach(val => {
        times[String(Math.floor(val.score))]++;
    });
    //
    return times;
};
//
//
//
export const topCategory = () => {
    let topIndex = -1;
    let topValue = -1;
    const data = offersChartData();
    // eslint-disable-next-line
    Object.values(data).forEach((val: any, index) => {
        if (val > topValue) {
            topIndex = index;
            topValue = val;
        }
    });
    return Object.keys(data)[topIndex];
};
//
export default { profile, NOT_FOUND, fetchData, offersChartData, topCategory, reviewsChartData, reviewedChartData };
