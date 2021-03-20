<template>
    <section id="description" class="field">
        <header>
            <h1 class="label">Description</h1>
            <LengthNotification propname="description"></LengthNotification>
        </header>
        <!--  -->
        <textarea v-model="data.description" :maxlength="RESTRICTIONS.description.max" :minlength="RESTRICTIONS.description.min"></textarea>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
import LengthNotification from "./LengthNotification.vue";
//
export default defineComponent({
    components: { LengthNotification },
    //
    setup() {
        const { data, RESTRICTIONS } = useCreateOffer;
        return { data, RESTRICTIONS };
    }
});
</script>
