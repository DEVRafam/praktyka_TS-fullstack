<template>
    <div class="img" :class="{ hoverable: imgPath(data, 1) }">
        <div class="one" :style="imgPath(data, 0)"></div>
        <div class="two" :style="imgPath(data, 1)"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
import useManyOffers from "@/composable/offers/useManyOffers";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    setup() {
        const { imgPath } = useManyOffers;
        return { imgPath };
    }
});
</script>
