<template>
    <section id="create-offer" :class="{ uploading }">
        <span class="circle"></span><span class="circle"></span><span class="circle"></span><span class="circle"></span>
        <Header v-if="!uploading"></Header>
        <div id="main-content">
            <template v-if="!uploading">
                <div class="col">
                    <GeneralInformations></GeneralInformations>
                    <Contact></Contact>
                    <Advantages></Advantages>
                </div>
                <div class="col">
                    <Description></Description>
                    <Photos></Photos>
                </div>
            </template>
            <!--  -->
            <Uploading v-else></Uploading>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
import GeneralInformations from "@/components/offers/create/forms/GeneralInformations.vue";
import Description from "@/components/offers/create/forms/Description.vue";
import Contact from "@/components/offers/create/forms/Contact.vue";
import Advantages from "@/components/offers/create/forms/Advantages.vue";
import Photos from "@/components/offers/create/forms/Photos.vue";
import Header from "@/components/offers/create/Header.vue";
import Uploading from "@/components/offers/create/Uploading.vue";
//
export default defineComponent({
    components: { GeneralInformations, Description, Contact, Advantages, Photos, Header, Uploading },
    setup() {
        const { uploading, clear } = useCreateOffer;
        onBeforeUnmount(clear);
        return { uploading };
    }
});
</script>
