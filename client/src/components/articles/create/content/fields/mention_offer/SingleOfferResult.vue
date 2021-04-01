<template>
    <div class="single-offer">
        <Image :data="offer"></Image>
        <div class="content">
            <h3>{{ offer.title }}</h3>
            <p>{{ offer.description.slice(0, 200) }}</p>
            <button @click="setOfferAsMentioned">Choose</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
import { ArticleContentField } from "@/@types/articles";
import useManyOffers from "@/composable/offers/useManyOffers";
//
import Image from "@/components/offers/many/display_offers/single_offer/Image.vue";
//
export default defineComponent({
    props: {
        field: {
            type: Object as PropType<ArticleContentField>,
            required: true
        },
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    components: { Image },
    setup(props) {
        const { imgPath } = useManyOffers;
        const setOfferAsMentioned = () => {
            props.field._offer_data = props.offer;
            props.field.offer_id = props.offer.id;
        };
        //
        return { imgPath, setOfferAsMentioned };
    }
});
</script>
