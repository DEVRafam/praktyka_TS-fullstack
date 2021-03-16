<template>
    <div class="single-offer">
        <PriceAndFollow :data="offer"></PriceAndFollow>
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
import PriceAndFollow from "@/components/offers/many/display_offers/single_offer/PriceAndFollow.vue";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<ProfileOffer>,
            required: true
        }
    },
    components: { Image, PriceAndFollow },
    setup() {
        return { formatDate };
    }
});
</script>
