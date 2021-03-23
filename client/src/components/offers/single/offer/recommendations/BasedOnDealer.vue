<template>
    <section class="level">
        <header>
            <h2 class="label">Recommendations</h2>
            <h4 class="label">
                <span>Based on</span>
                <span class="color">{{ offer.creator.name }} {{ offer.creator.surname }}</span>
                <span>dealer</span>
            </h4>
        </header>
        <div class="recommendations">
            <!-- insert blank space -->
            <template v-for="item in 3 - recommendations.fromDealer.length" :key="item.id">
                <div class="recommendation"></div>
            </template>
            <!--  -->
            <template v-for="item in recommendations.fromDealer" :key="item.id">
                <SingleRecommendation :item="item"></SingleRecommendation>
            </template>
            <!--  -->
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useSingleOffer from "@/composable/offers/useSingleOffer";
import { Offer } from "@/@types/Offer";
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
        return { recommendations };
    }
});
</script>
