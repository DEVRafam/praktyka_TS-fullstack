<template>
    <section id="stats">
        <OfferStats :profile="profile"></OfferStats>
        <ReviewsStats :profile="profile"></ReviewsStats>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
//
import OfferStats from "./OfferStats.vue";
import ReviewsStats from "./ReviewStats.vue";
//
export default defineComponent({
    components: { OfferStats, ReviewsStats },
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    }
});
</script>
