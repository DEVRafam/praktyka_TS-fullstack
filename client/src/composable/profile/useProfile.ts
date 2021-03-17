import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { ref } from "vue";
import { Profile } from "@/@types/user";
import { offersChartData } from "@/composable/profile/useProfileChartData";
//
export const profile = ref<Profile>();
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
export const generateScoreColorClass = (review: { score: number }): string => {
    return `score-${Math.floor(review.score)}`;
};
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
export default { profile, NOT_FOUND, fetchData, offersChartData, topCategory, generateScoreColorClass };
