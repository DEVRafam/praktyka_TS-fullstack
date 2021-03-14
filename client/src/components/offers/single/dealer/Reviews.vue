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
        const averge = (() => {
            const { reviews_about_self: reviews } = props.dealer;
            if (!reviews) return null;
            let total = 0;
            reviews?.forEach(el => (total += el.score as number));
            return (total / reviews.length).toFixed(2);
        })();
        //
        const starsAmount = props.dealer.reviews_about_self?.length ? Math.floor(Number(averge)) : 0;
        const halfStar = Number(averge) - starsAmount >= 0.5;
        //
        return { averge, starsAmount, halfStar };
    }
});
</script>
