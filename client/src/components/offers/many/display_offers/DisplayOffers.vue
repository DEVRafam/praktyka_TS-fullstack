<template>
    <section id="display-many-offers">
        <Summary></Summary>
        <!--  -->
        <div class="offers-wrap" :class="layout">
            <SingleOffer v-for="offer in offers" :key="offer.id" :data="offer"></SingleOffer>
        </div>
        <!--  -->
        <Pagination :pagesAmount="pagesAmount"></Pagination>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useManyOffers from "@/composable/offers/useManyOffers";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
import { useRoute } from "vue-router";
// components
import SingleOffer from "./single_offer/SingleOffer.vue";
import Pagination from "./Pagination.vue";
import Summary from "./Summary.vue";
//
export default defineComponent({
    components: { SingleOffer, Pagination, Summary },
    async setup() {
        const { category, order, search, layout } = useOffersNavigation;
        const { fetchOffers, offers, pagesAmount } = useManyOffers;
        //
        // get data form router query
        //
        if (useRoute().query.category) category.value = useRoute().query.category as string;
        if (useRoute().query.order) order.value = useRoute().query.order as string;
        if (useRoute().query.search) search.value = useRoute().query.search as string;
        //
        await fetchOffers();
        //
        //
        //
        return { offers, pagesAmount, layout };
    }
});
</script>
