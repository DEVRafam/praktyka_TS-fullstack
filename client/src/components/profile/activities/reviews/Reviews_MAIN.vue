<template>
    <section id="reviews">
        <!--  -->
        <Highlight :profile="profile"></Highlight>
        <ReviewsList :profile="profile"></ReviewsList>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
//
import Highlight from "./Highlight.vue";
import ReviewsList from "./ReviewsList.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    components: { Highlight, ReviewsList },
    setup() {
        //
    }
});
</script>
