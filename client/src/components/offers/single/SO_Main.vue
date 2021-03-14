<template>
    <section id="display-single-offer">
        <Offer :offer="offer"></Offer>
        <Creator :dealer="offer.creator"></Creator>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useSingleOffer from "@/composable/offers/useSingleOffer";
//
import Creator from "./dealer/Dealer_MAIN.vue";
import Offer from "./offer/Offer.vue";
//
export default defineComponent({
    components: { Creator, Offer },
    async setup() {
        const { fetchData, offer } = useSingleOffer;
        await fetchData(useRoute().params.slug as string);
        //
        return { offer };
    }
});
</script>
