<template>
    <section id="description" class="field">
        <!--  -->
        <h1 class="label">Description</h1>
        <textarea v-model="data.description" :maxlength="RESTRICTIONS.description.max" :minlength="RESTRICTIONS.description.min"></textarea>
        <span class="length">{{ `${data.description.length}/${RESTRICTIONS.description.max}` }}</span>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";

//
export default defineComponent({
    setup() {
        const { data, RESTRICTIONS } = useCreateOffer;
        //
        return { data, RESTRICTIONS };
    }
});
</script>
