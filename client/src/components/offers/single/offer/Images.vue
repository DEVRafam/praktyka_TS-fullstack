<template>
    <div class="img" :style="imgPath(offer, imgIndex)">
        <!--  -->
        <template v-if="offer.photos.length > 1">
            <button class="next" @click="imgIndex < offer.photos.length - 1 ? imgIndex++ : null">
                <font-awesome-icon icon="chevron-right"></font-awesome-icon>
            </button>
            <!--  -->
            <button class="previous" @click="imgIndex > 0 ? imgIndex-- : null">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </button>
        </template>
        <!--  -->
        <label>{{ imgIndex + 1 }} of {{ offer.photos.length }}</label>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Offer } from "@/@types/Offer";
import useManyOffer from "@/composable/offers/useManyOffers";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    setup() {
        const { imgPath } = useManyOffer;
        const imgIndex = ref<number>(0);
        //
        return { imgPath, imgIndex };
    }
});
</script>
