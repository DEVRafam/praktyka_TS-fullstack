import { API_ADDRESS } from "@/composable/env";
import axios from "axios";
import { ref } from "vue";
import { deepAuthenticate, currentUser } from "@/composable/auth/authenticate";
import { FollowingOffer } from "@/@types/Offer";
//
const following = ref<FollowingOffer[]>([]);
const fetchFollowingOffers = async () => {
    if (!(await deepAuthenticate())) return;
    const { data }: { data: FollowingOffer[] } = await axios.get(`${API_ADDRESS}/api/offer/my/following`, {
        headers: {
            Authorization: `Bearer ${currentUser.accessToken}`
        }
    });
    following.value = data;
};
//
const unfollow = async (id: number, index: number) => {
    following.value.splice(index, 1);
    await axios.post(
        `${API_ADDRESS}/api/offer/${id}/follow`,
        {},
        {
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        }
    );
    //
};
//
export default { fetchFollowingOffers, following, unfollow };
