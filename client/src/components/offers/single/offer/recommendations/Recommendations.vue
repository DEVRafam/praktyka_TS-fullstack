<template>
    <section id="recommendations">
        <h2 class="label">Recommendations</h2>
        <!--  -->
        <Category :offer="offer" v-if="recommendations.fromCategories.length"></Category>
        <Dealer :offer="offer" v-if="recommendations.fromDealer.length"></Dealer>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useSingleOffer from "@/composable/offers/useSingleOffer";
import { Offer } from "@/@types/Offer";
import Category from "./BasedOnCategory.vue";
import Dealer from "./BasedOnDealer.vue";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    components: { Category, Dealer },
    async setup() {
        const { getRecommendations, recommendations } = useSingleOffer;
        await getRecommendations();
        return { recommendations };
    }
});
</script>
