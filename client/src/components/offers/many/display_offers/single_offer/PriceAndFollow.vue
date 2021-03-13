<template>
    <div class="follow-price">
        <!--  -->
        <button :class="isFollowing() ? 'following' : 'follow'" @click="handleFolow">
            <font-awesome-icon icon="heart" />
            <span>{{ isFollowing() ? "Following" : "Follow" }}</span>
        </button>
        <!--  -->
        <span class="price">
            <span>{{ priceSeparators(data) }}</span>
            <span class="currency">{{ data.currency }}</span>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";
import { Offer } from "@/@types/Offer";
import priceSeparators from "@/utils/priceSeparators";
import { API_ADDRESS } from "@/composable/env";
import { unauthenticate, currentUser, deepAuthenticate } from "@/composable/auth/authenticate";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    setup(props) {
        const isFollowing = (): boolean => {
            if (!props.data?.follows) return false;
            return !!props.data?.follows.find(el => el.user_id === currentUser.id);
        };
        //
        return { priceSeparators, isFollowing };
    },
    methods: {
        async handleFolow() {
            const { data } = this;
            if (unauthenticate()) this.$router.push({ path: "/login" });
            else {
                if (!data?.follows || !(await deepAuthenticate())) return;
                // locally update
                let notExist = 0;
                let total = 0;
                data?.follows.forEach((el, index) => {
                    if (el.user_id === currentUser.id && data?.follows) {
                        data?.follows.splice(index, 1);
                        console.log(index);
                    } else notExist++;
                    total++;
                });
                if (notExist == total) {
                    console.log(notExist);
                    data.follows.push({ user_id: currentUser.id });
                }
                // database update
                await axios.post(
                    `${API_ADDRESS}/api/offer/${data.id}/follow`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${currentUser.accessToken}`
                        }
                    }
                );
            }
        }
    }
});
</script>
