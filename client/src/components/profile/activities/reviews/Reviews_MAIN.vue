<template>
    <section id="reviews">
        <!--  -->
        <Highlight :profile="profile"></Highlight>
        <ReviewsList :profile="profile" v-if="profile.reviews_about_self.length"></ReviewsList>
        <h2 v-else class="blank-notification">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
            <span>This user does not have any review</span>
        </h2>
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
