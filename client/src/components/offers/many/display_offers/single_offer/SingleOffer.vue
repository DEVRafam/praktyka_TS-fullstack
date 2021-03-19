<template>
    <div class="single-offer">
        <!-- MANAGEMENT -->
        <template v-if="isAdmin || isOwner(data)">
            <Management :data="data"></Management>
        </template>
        <!--  -->
        <!-- GRID -->
        <!--  -->
        <template v-if="layout === 'GRID'">
            <div class="follow-price">
                <Follow :data="data"></Follow>
                <Price :data="data"></Price>
            </div>
            <Image :data="data"></Image>
            <h5>{{ data.title }}</h5>
            <Footer :data="data"> </Footer>
        </template>
        <!--  -->
        <!-- LIST -->
        <!--  -->
        <template v-else>
            <Image :data="data"></Image>
            <div class="content">
                <header>
                    <span class="date">
                        <span>At </span>
                        <strong>{{ formatDate(data.updatedAt) }}</strong>
                        <span> in category </span>
                        <router-link :to="`/?category=${data.category}&order=newest`">
                            <strong class="dark">{{ findLabel(data.category) }}</strong>
                        </router-link>
                    </span>
                    <span class="price">
                        <span>{{ priceSeparators(data) }}</span>
                        <strong class="dark">{{ data.currency }}</strong>
                        <Follow :data="data"></Follow>
                    </span>
                </header>
                <h3>{{ data.title }}</h3>
                <p>{{ data.description.slice(0, 250) }}</p>
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
import formatDate from "@/utils/formatDate";
import priceSeparators from "@/utils/priceSeparators";
import { findLabel } from "@/composable/offers/useCategoriesList";
// components
import Footer from "./Footer.vue";
import Image from "./Image.vue";
import Price from "./Price.vue";
import Management from "./Management.vue";
import Follow from "./Follow.vue";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    //
    components: { Footer, Image, Price, Management, Follow },
    //
    setup() {
        const { isOwner } = useManyOffers;
        const { layout } = useOffersNavigation;
        //
        return { layout, isOwner, isAdmin, formatDate, priceSeparators, findLabel };
    }
});
</script>
