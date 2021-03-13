<template>
    <section id="many-offers-main-wrapper">
        <Navigation></Navigation>
        <!--  -->
        <Suspense :key="JSON.stringify($route.query)">
            <!--  -->
            <template #default>
                <DisplayOffers></DisplayOffers>
            </template>
            <!--  -->
            <template #fallback>
                <h2>Loading ...</h2>
            </template>
        </Suspense>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navigation from "@/components/offers/many/navigation/OffersNavigation.vue";
import DisplayOffers from "@/components/offers/many/display_offers/DisplayOffers.vue";
//
export default defineComponent({
    components: { Navigation, DisplayOffers }
});
</script>
