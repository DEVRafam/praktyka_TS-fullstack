<template>
    <section id="general-information">
        <Header></Header>
        <Title></Title>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/articles/create/general/Header.vue";
import Title from "./Title.vue";
//
export default defineComponent({
    components: { Header, Title }
});
</script>
