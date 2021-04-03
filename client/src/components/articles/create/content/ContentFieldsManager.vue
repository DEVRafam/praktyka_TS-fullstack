<template>
    <section id="content-fields-manager">
        <!--  -->
        <!-- DEFAULT MANAGER BAR -->
        <!--  -->
        <template v-if="!resetConfirmation">
            <div class="wrap">
                <h2 class="label">Add new content field</h2>
                <select v-model="newFieldType">
                    <option value="header">Header</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="list">List</option>
                    <option value="mention_offer">Mention offer</option>
                </select>
                <button @click="handleAddNewContentField">Add</button>
            </div>
            <!--  -->
            <button @click="resetConfirmation = true" v-if="data.content.length">Reset</button>
        </template>
        <!--  -->
        <!-- CONTENT RESET CONFIRMATION -->
        <!--  -->
        <template v-else>
            <div class="wrap">
                <h2 class="label">Are you sure?</h2>
            </div>
            <div class="wrap">
                <button class="red" @click="handleReset">Confirm</button>
                <button @click="resetConfirmation = false">Cancel</button>
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//
import useCreateArticle from "@/composable/articles/useCreateArticles";
import { ArticleContentType } from "@/@types/articles";
//
export default defineComponent({
    setup() {
        const { addNewContentField, resetContent, data } = useCreateArticle;
        const resetConfirmation = ref<boolean>(false);
        const newFieldType = ref<ArticleContentType>("header");
        //
        const handleAddNewContentField = () => addNewContentField(newFieldType.value);
        const handleReset = () => {
            resetContent();
            resetConfirmation.value = false;
        };
        //
        return { newFieldType, handleAddNewContentField, handleReset, resetConfirmation, data };
    }
});
</script>
