import { profile } from "@/composable/profile/useProfile";
import { findLabel } from "@/composable/offers/useCategoriesList";
//
export const reviewsChartData = () => {
    if (!profile.value) return false;
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
//
//
export const reviewedChartData = () => {
    if (!profile.value) return false;
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
export const offersChartData = () => {
    if (!profile.value) return false;
    // eslint-disable-next-line
    const result: any = {};
    profile.value.offers_stats.forEach(el => {
        result[findLabel(el.category) as string] = el.amount;
    });
    return result;
};
