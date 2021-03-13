<template>
    <section id="summary">
        <font-awesome-icon icon="times-circle" class="no-results" v-if="!resultAmount" />
        <h2 v-html="generateSummaryMessage"></h2>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useManyOffers from "@/composable/offers/useManyOffers";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
//
export default defineComponent({
    setup() {
        const { category, search } = useOffersNavigation;
        const { offers, resultAmount } = useManyOffers;
        const generateSummaryMessage = ((): string => {
            let summary = "";
            // amount
            summary += `There ${resultAmount.value === 1 ? "is <span class='color'>one result</span>" : "are <span class='color'>" + resultAmount.value + " results</span>"}`;
            // search
            if (search.value) summary += ` that conteins phrase "<span class="color">${search.value}</span>"`;
            // category
            if (category.value) summary += ` in category <span class="color">"${category.value}"</span>`;
            //
            if (!search.value && !category.value) summary += " in total";
            return summary;
        })();
        return { offers, generateSummaryMessage, resultAmount };
    }
});
</script>
