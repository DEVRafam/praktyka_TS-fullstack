<template>
    <section id="create-article">
        <!--  -->
        <section id="forms">
            <Header></Header>
            <Content></Content>
        </section>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Content from "@/components/articles/create/content/Content_MAIN.vue";
import Header from "@/components/articles/create/Header.vue";
//
export default defineComponent({
    components: { Content, Header }
});
</script>
