<template>
    <section id="create-offer">
        <div id="main-content">
            <div class="col">
                <GeneralInformations></GeneralInformations>
                <Contact></Contact>
                <Advantages></Advantages>
            </div>
            <div class="col">
                <Description></Description>
                <Photos></Photos>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//
import GeneralInformations from "@/components/offers/create/GeneralInformations.vue";
import Description from "@/components/offers/create/Description.vue";
import Contact from "@/components/offers/create/Contact.vue";
import Advantages from "@/components/offers/create/Advantages.vue";
import Photos from "@/components/offers/create/Photos.vue";
//
export default defineComponent({
    components: { GeneralInformations, Description, Contact, Advantages, Photos }
});
</script>
