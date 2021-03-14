<template>
    <div>
        <Suspense>
            <SingleOfferMain></SingleOfferMain>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SingleOfferMain from "@/components/offers/single/SO_Main.vue";
import useSingleOffer from "@/composable/offers/useSingleOffer";
//
export default defineComponent({
    components: { SingleOfferMain },
    computed: {
        NOT_FOUND: () => useSingleOffer.NOT_FOUND.value
    },
    watch: {
        NOT_FOUND(val) {
            if (val) this.$router.push({ path: "/error/not-found" });
        }
    }
});
</script>
