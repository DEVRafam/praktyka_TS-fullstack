<template>
    <span class="price">
        <span>{{ priceSeparators(data) }}</span>
        <span class="currency">{{ data.currency }}</span>
    </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import priceSeparators from "@/utils/priceSeparators";
import { Offer } from "@/@types/Offer";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    setup() {
        return { priceSeparators };
    }
});
</script>
