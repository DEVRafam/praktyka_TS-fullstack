<template>
    <section id="contact" class="field">
        <h1 class="label">Contact forms:</h1>
        <div class="form-group" v-for="contactForm in availableContactForms" :key="contactForm.val">
            <label :for="contactForm.val">{{ contactForm.val }}</label>
            <!--  -->
            <input type="text" :id="contactForm.val" :placeholder="contactForm.placeholder" v-model="data.contact[contactForm.val]" @input="contactForm.onchange" />
            <!--  -->
            <LengthNotification :value="data.contact[contactForm.val]" :restrictions="RESTRICTIONS.contactForms[contactForm.val]" @change-val="val => (data.contact[contactForm.val] = val)"></LengthNotification>
        </div>
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
    setup() {
        const { data, availableContactForms, RESTRICTIONS } = useCreateOffer;
        //
        return { data, availableContactForms, RESTRICTIONS };
    }
});
</script>
