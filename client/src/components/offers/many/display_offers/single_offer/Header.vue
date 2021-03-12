<template>
    <h5>{{ data.title }}</h5>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    }
});
</script>
