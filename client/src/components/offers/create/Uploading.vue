<template>
    <section id="uploading">
        <Loading v-if="status === 'pending'"></Loading>
        <div class="negative" v-else-if="status === 'negative'">
            <header>
                <h1 class="label">Status: <span class="color">negative</span></h1>
                <button @click="uploading = false">Go back</button>
            </header>
            <h2>
                Totally <span class="color">{{ errors.length }}</span> {{ errors.length === 1 ? "error has" : "errors have" }} occured
            </h2>
            <!--  -->
            <div class="single-error" v-for="err in errors" :key="err.element">
                <h3>
                    Field: <span class="color">{{ err.element }}</span>
                </h3>
                <p>
                    Explanation: <span>{{ err.message }}</span>
                </p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
export default defineComponent({
    setup() {
        const { status, errors, uploading } = useCreateOffer;
        return { status, errors, uploading };
    }
});
</script>
