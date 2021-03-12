<template>
    <div class="single-offer" :class="layout">
        <!--  -->
        <!-- GRID -->
        <!--  -->
        <template v-if="layout === 'GRID'">
            <header>
                <Header :data="data"></Header>
                <PriceAndFollow :data="data"></PriceAndFollow>
            </header>
            <Image :data="data"></Image>
            <DateCategory :data="data"> </DateCategory>
        </template>
        <!--  -->
        <!-- LIST -->
        <!--  -->
        <template v-else>
            <Image :data="data"></Image>
            <div class="body">
                <Header :data="data"></Header>
                <PriceAndFollow :data="data"></PriceAndFollow>
                <DateCategory :data="data"> </DateCategory>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
import useManyOffers from "@/composable/offers/useManyOffers";
import formatDate from "@/utils/formatDate";
import useCategoriesList from "@/composable/offers/useCategoriesList";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
// components
import Header from "./Header.vue";
import DateCategory from "./Footer.vue";
import Image from "./Image.vue";
import PriceAndFollow from "./PriceAndFollow.vue";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    //
    components: { Header, DateCategory, Image, PriceAndFollow },
    //
    setup() {
        const { findLabel } = useCategoriesList;
        const { imgPath } = useManyOffers;
        const { layout } = useOffersNavigation;
        //
        return { imgPath, formatDate, findLabel, layout };
    }
});
</script>
