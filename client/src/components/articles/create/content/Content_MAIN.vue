<template>
    <section id="content">
        <ContentFieldsManager></ContentFieldsManager>
        <DisplayFields v-if="data.content.length"></DisplayFields>
        <h3 id="content-is-blank" v-else>The content of article is currently empty</h3>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContentFieldsManager from "./ContentFieldsManager.vue";
import DisplayFields from "./DisplayFields.vue";
import useCreateArticles from "@/composable/articles/useCreateArticles";
//
export default defineComponent({
    components: { ContentFieldsManager, DisplayFields },
    setup() {
        const { data } = useCreateArticles;
        return { data };
    }
});
</script>
