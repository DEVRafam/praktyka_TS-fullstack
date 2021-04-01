<template>
    <div class="add-content-field">
        <select v-model="newFieldType">
            <option value="header">Header</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="list">List</option>
            <option value="mention_offer">Mention offer</option>
        </select>
        <button @click="addNewContentField">Add</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//
import useCreateArticle from "@/composable/articles/useCreateArticles";
import { ArticleContentType, ArticleContentField } from "@/@types/articles";
//
export default defineComponent({
    setup() {
        const { data } = useCreateArticle;
        const newFieldType = ref<ArticleContentType>("header");
        const addNewContentField = () => {
            const { value: type } = newFieldType;
            const field: ArticleContentField = {
                type,
                value: ""
            };
            if (type === "mention_offer") {
                delete field.value;
                field.offer_id = null;
                field._offer_data = {};
            }
            if (type === "list") field.value = [""];
            if (type === "image") field.value = String(Date.now());
            //
            data.value.content.push(field);
        };
        //
        return { newFieldType, addNewContentField };
    }
});
</script>
