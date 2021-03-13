<template>
    <div class="single-offer" :class="layout">
        <!-- MANAGEMENT -->
        <template v-if="isAdmin || isOwner(data)">
            <Management :data="data"></Management>
        </template>
        <!--  -->
        <!-- GRID -->
        <!--  -->
        <template v-if="layout === 'GRID'">
            <PriceAndFollow :data="data"></PriceAndFollow>
            <Image :data="data"></Image>
            <Header :data="data"></Header>
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
import { isAdmin } from "@/composable/auth/authenticate";
import useManyOffers from "@/composable/offers/useManyOffers";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
// components
import Header from "./Header.vue";
import DateCategory from "./Footer.vue";
import Image from "./Image.vue";
import PriceAndFollow from "./PriceAndFollow.vue";
import Management from "./Management.vue";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    //
    components: { Header, DateCategory, Image, PriceAndFollow, Management },
    //
    setup() {
        const { isOwner } = useManyOffers;
        const { layout } = useOffersNavigation;
        //
        return { layout, isOwner, isAdmin };
    }
});
</script>
