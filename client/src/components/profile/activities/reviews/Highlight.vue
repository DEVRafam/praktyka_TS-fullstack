<template>
    <section class="highlight">
        <h1 class="label">Reviews</h1>
        <!--  -->
        <div class="stars">
            <template v-for="star in starsAmount" :key="star">
                <font-awesome-icon icon="star"></font-awesome-icon>
            </template>
            <font-awesome-icon icon="star-half" v-if="halfStar"></font-awesome-icon>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { computeReviews } from "@/composable/useUser";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    components: {},
    // eslint-disable-next-line vue/no-setup-props-destructure
    setup({ profile }) {
        const { averge, starsAmount, halfStar } = computeReviews(profile);
        return { averge, starsAmount, halfStar };
    }
});
</script>
