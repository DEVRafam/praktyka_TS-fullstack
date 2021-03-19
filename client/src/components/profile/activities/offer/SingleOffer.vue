<template>
    <div class="single-offer">
        <div class="follow-price">
            <Follow :data="offer"></Follow>
            <Price :data="offer"></Price>
        </div>
        <!-- <PriceAndFollow :data="offer"></PriceAndFollow> -->
        <Image :data="offer"></Image>
        <h3>{{ offer.title }}</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProfileOffer } from "@/@types/user";
import formatDate from "@/utils/formatDate";
//
import Image from "@/components/offers/many/display_offers/single_offer/Image.vue";
import Follow from "@/components/offers/many/display_offers/single_offer/Follow.vue";
import Price from "@/components/offers/many/display_offers/single_offer/Price.vue";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<ProfileOffer>,
            required: true
        }
    },
    components: { Image, Follow, Price },
    setup() {
        return { formatDate };
    }
});
</script>
