<template>
    <section id="dealer-reviews">
        <div class="stars">
            <h3>Reviews</h3>
            <template v-for="star in starsAmount" :key="star">
                <font-awesome-icon icon="star"></font-awesome-icon>
            </template>
            <font-awesome-icon icon="star-half" v-if="halfStar"></font-awesome-icon>
        </div>
        <!--  -->
        <div class="stats">
            <!--  -->
            <div class="col">
                <h4>Total:</h4>
                <span class="result">{{ dealer.reviews_about_self.length }}</span>
            </div>
            <!--  -->
            <div class="col">
                <h4>Average:</h4>
                <span class="result">{{ isNaN(averge) ? 0 : averge }}</span>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/@types/user";
import { computeReviews } from "@/composable/useUser";
//
export default defineComponent({
    props: {
        dealer: {
            type: Object as PropType<User>,
            required: true
        }
    },
    components: {},
    setup(props) {
        const { averge, starsAmount, halfStar } = computeReviews(props.dealer);
        return { averge, starsAmount, halfStar };
    }
});
</script>
