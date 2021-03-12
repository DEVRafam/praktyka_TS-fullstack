<template>
    <div class="follow-price">
        <button>
            <font-awesome-icon icon="heart" />
            <span>Follow</span>
        </button>
        <span class="price">
            <span>{{ priceSeparators(data) }}</span>
            <span class="currency">{{ data.currency }}</span>
        </span>
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
        const { priceSeparators } = useManyOffers;
        //
        return { priceSeparators };
    }
});
</script>
