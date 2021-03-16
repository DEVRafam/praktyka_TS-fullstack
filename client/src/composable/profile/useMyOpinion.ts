import { reactive, ref, computed } from "vue";
import { ReviewAboutSelf } from "@/@types/user";
import { currentUser, deepAuthenticate } from "@/composable/auth/authenticate";
import { profile } from "./useProfile";
import { API_ADDRESS } from "@/composable/env";
import axios from "axios";
//
interface NewReview {
    score: number;
    explanation: string;
}
type myOption = false | ReviewAboutSelf | "OPINION_DOES_NOT_EXIST";
//
export const newReview = reactive({
    score: 1,
    explanation: ""
} as NewReview);
//
export const myOpinion = computed<myOption>(() => {
    if (!currentUser.id || currentUser.id === profile.value?.id) return false;
    //
    const opinion = profile.value?.reviews_about_self.find(el => el.reviewer.id === currentUser.id);
    if (opinion) {
        newReview.explanation = opinion.explanation;
        newReview.score = opinion.score;
        //
        return opinion;
    } else return "OPINION_DOES_NOT_EXIST";
});
//
export const handleUpdate = async () => {
    if (!(await deepAuthenticate())) return;
    const options = {
        headers: {
            Authorization: `Bearer ${currentUser.accessToken}`
        }
    };
    const data = JSON.parse(JSON.stringify(newReview));
    //
    await axios.post(`${API_ADDRESS}/api/review/${profile.value?.id}`, data, options);
    location.reload();
    //
};
//
export const handleDelete = async () => {
    if (typeof myOpinion.value !== "object" || !(await deepAuthenticate())) return;
    const options = {
        headers: {
            Authorization: `Bearer ${currentUser.accessToken}`
        }
    };
    await axios.delete(`${API_ADDRESS}/api/review/${(myOpinion.value as ReviewAboutSelf).id}`, options);
    location.reload();
};
//
export const currentState = ref<"displaying" | "editing">("displaying");
