<template>
    <section id="activites">
        <Stats :profile="profile" v-if="statsAccess"></Stats>
        <Reviews :profile="profile"></Reviews>
        <MyOpinion :profile="profile" v-if="myOpinion" :myOpinion="myOpinion"></MyOpinion>
        <Reviewed :profile="profile"></Reviewed>
        <Offer :profile="profile"></Offer>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
//
import { myOpinion } from "@/composable/profile/useMyOpinion";
//
import Reviews from "./reviews/Reviews_MAIN.vue";
import Stats from "./stats/Stats.vue";
import Offer from "./offer/Offers.vue";
import Reviewed from "./reviewed/Reviewed.vue";
import MyOpinion from "./my_opinion/MyOpinion.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    setup(props) {
        const statsAccess = props.profile.offers.length || props.profile.reviews_about_self.length;
        return { myOpinion, statsAccess };
    },
    components: { Reviews, Stats, Offer, Reviewed, MyOpinion }
});
</script>
