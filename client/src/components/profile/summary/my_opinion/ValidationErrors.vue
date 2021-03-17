<template>
    <section class="validation-errors">
        <strong v-if="updateError.explanation">{{ updateError.explanation }}</strong>
        <strong v-if="updateError.score">{{ updateError.score }}</strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { updateError } from "@/composable/profile/useMyOpinion";
//
export default defineComponent({
    setup() {
        return { updateError };
    }
});
</script>
