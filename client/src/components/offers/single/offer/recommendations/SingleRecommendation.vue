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
        <router-link :to="`/offer/${item.slug}`">
            <div class="r-img" :style="imgPath(item, imgIndex)" @mouseenter="swapImage('next')" @mouseleave="swapImage('prev')"></div>
        </router-link>
        <h5>{{ item.title }}</h5>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
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
    // eslint-disable-next-line vue/no-setup-props-destructure
    async setup({ item }) {
        const { recommendations } = useSingleOffer;
        const imgIndex = ref<number>(0);
        //
        const swapImage = (destination: "next" | "prev") => {
            if (item.photos?.length === 1) return;
            else imgIndex.value = destination === "next" ? 1 : 0;
        };
        //
        return { recommendations, imgPath, priceSeparators, formatDate, imgIndex, swapImage };
    }
});
</script>
