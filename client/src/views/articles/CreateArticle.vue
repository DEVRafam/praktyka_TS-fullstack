<template>
    <section id="create-article">
        <span class="circle"></span><span class="circle"></span><span class="circle"></span><span class="circle"></span>
        <!--  -->
        <section id="forms">
            <GeneralInformation></GeneralInformation>
            <Content></Content>
        </section>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Content from "@/components/articles/create/content/Content_MAIN.vue";
import GeneralInformation from "@/components/articles/create/general/GeneralInformation.vue";
//
export default defineComponent({
    components: { Content, GeneralInformation }
});
</script>
