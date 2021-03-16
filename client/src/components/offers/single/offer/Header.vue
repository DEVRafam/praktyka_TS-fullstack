<template>
    <header class="main-offer-header">
        <div class="price" v-if="offer.price">
            <span>{{ priceSeparators(offer) }}</span>
            <span class="currency">{{ offer.currency }}</span>
        </div>
        <div class="date-and-follow">
            <!--  -->
            <Follow :data="offer"></Follow>
            <!--  -->
            <div class="date-and-localization">
                <strong class="color">{{ formatDate(offer.updatedAt) }},</strong>
                <span>{{ offer.localization }},</span>
                <strong>{{ offer.country }}</strong>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import formatDate from "@/utils/formatDate";
import priceSeparators from "@/utils/priceSeparators";
import { Offer } from "@/@types/Offer";
//
import Follow from "./Follow.vue";
//
export default defineComponent({
    components: { Follow },
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    setup() {
        return { formatDate, priceSeparators };
    }
});
</script>
