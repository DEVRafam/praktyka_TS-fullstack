<template>
    <section class="level">
        <header class="label">
            <h2 class="label">Recommendations</h2>
            <h4 class="label">
                <span>Based on</span>
                <span class="color">{{ findLabel(offer.category) }}</span>
                <span>category</span>
            </h4>
        </header>
        <div class="recommendations">
            <!--  -->
            <template v-for="item in recommendations.fromCategories" :key="item.id">
                <SingleRecommendation :item="item"></SingleRecommendation>
            </template>
            <!-- insert blank space -->
            <template v-for="item in 3 - recommendations.fromCategories.length" :key="item.id">
                <div class="recommendation BLANK"></div>
            </template>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useSingleOffer from "@/composable/offers/useSingleOffer";
import { Offer } from "@/@types/Offer";
import { findLabel } from "@/composable/offers/useCategoriesList";
//
import SingleRecommendation from "./SingleRecommendation.vue";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    components: { SingleRecommendation },
    async setup() {
        const { recommendations } = useSingleOffer;
        return { recommendations, findLabel };
    }
});
</script>
