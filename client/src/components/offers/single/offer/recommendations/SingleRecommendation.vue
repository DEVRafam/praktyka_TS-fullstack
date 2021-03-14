<template>
    <div class="recommendation">
        <!--  -->
        <header>
            <span class="price">
                <span>{{ priceSeparators(item) }}</span>
                <span class="color">{{ item.currency }}</span>
            </span>
            <span class="date">{{ formatDate(item.updatedAt) }}</span>
        </header>
        <!--  -->
        <div class="r-img" :style="imgPath(item)"></div>
        <h5>{{ item.title }}</h5>
        <!--  -->
        <router-link :to="`/offer/${item.slug}`">Visit</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useSingleOffer from "@/composable/offers/useSingleOffer";
import { Offer } from "@/@types/Offer";
import { imgPath } from "@/composable/offers/useManyOffers";
import priceSeparators from "@/utils/priceSeparators";
import formatDate from "@/utils/formatDate";
//
export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    components: {},
    async setup() {
        const { recommendations } = useSingleOffer;
        return { recommendations, imgPath, priceSeparators, formatDate };
    }
});
</script>
