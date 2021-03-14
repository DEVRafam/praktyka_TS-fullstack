<template>
    <header>
        <div class="price" v-if="offer.price">
            <span>{{ priceSeparators(offer) }}</span>
            <span class="currency">{{ offer.currency }}</span>
        </div>
        <div class="date">
            <span>{{ formatDate(offer.updatedAt) }},</span>
            <span>{{ offer.localization }},</span>
            <span>{{ offer.country }}</span>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import formatDate from "@/utils/formatDate";
import priceSeparators from "@/utils/priceSeparators";
import { Offer } from "@/@types/Offer";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    setup() {
        //
        return { formatDate, priceSeparators };
    }
});
</script>
