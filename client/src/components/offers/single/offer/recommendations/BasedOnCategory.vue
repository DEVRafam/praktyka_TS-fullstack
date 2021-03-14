<template>
    <h4 class="label">
        <span>Based on</span>
        <span class="color">{{ findLabel(offer.category) }}</span>
        <span>category</span>
    </h4>
    <div class="level">
        <!-- insert blank space -->
        <template v-for="item in 3 - recommendations.fromCategories.length" :key="item.id">
            <div class="recommendation"></div>
        </template>
        <!--  -->
        <template v-for="item in recommendations.fromCategories" :key="item.id">
            <SingleRecommendation :item="item"></SingleRecommendation>
        </template>
    </div>
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
