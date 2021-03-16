<template>
    <section id="activites">
        <Stats :profile="profile"></Stats>
        <Reviews :profile="profile"></Reviews>
        <Reviewed :profile="profile"></Reviewed>
        <Offer :profile="profile"></Offer>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
//
import Reviews from "./reviews/Reviews_MAIN.vue";
import Stats from "./stats/Stats.vue";
import Offer from "./offer/Offers.vue";
import Reviewed from "./reviewed/Reviewed.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    components: { Reviews, Stats, Offer, Reviewed }
    // eslint-disable-next-line vue/no-setup-props-destructure
});
</script>
