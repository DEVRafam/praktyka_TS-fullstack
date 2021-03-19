<template>
    <section id="contact" class="field">
        <h1 class="label">Contact forms:</h1>
        <div class="form-group" v-for="contactForm in availableContactForms" :key="contactForm.val">
            <label :for="contactForm.val">{{ contactForm.val }}</label>
            <input type="text" :id="contactForm.val" :placeholder="contactForm.placeholder" v-model="data.contact[contactForm.val]" />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
export default defineComponent({
    setup() {
        const { data, availableContactForms } = useCreateOffer;
        //
        return { data, availableContactForms };
    }
});
</script>
