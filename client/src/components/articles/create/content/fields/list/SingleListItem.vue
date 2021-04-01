<template>
    <div class="single-item">
        <span class="number">{{ inListIndex + 1 }}</span>
        <textarea v-model="field.value[inListIndex]"></textarea>
        <button @click="moveUp" :disabled="!moveUpAccess">Move up</button>
        <button @click="moveDown" :disabled="!moveDownAccess">Move down</button>
        <button @click="removeItemFromList(index)">Delete</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ArticleContentField } from "@/@types/articles";
import useFormOrderingItems from "@/composable/useFormOrderingItems";
//
export default defineComponent({
    props: {
        field: {
            type: Object as PropType<ArticleContentField>,
            required: true
        },
        inListIndex: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup(props) {
        const addItemToList = () => (props.field.value as string[]).push("");
        const removeItemFromList = (index: number) => (props.field.value as string[]).splice(index, 1);
        const { moveUp, moveDown, moveUpAccess, moveDownAccess } = useFormOrderingItems(props.inListIndex, props.field.value);

        //
        return { addItemToList, removeItemFromList, moveUp, moveDown, moveUpAccess, moveDownAccess };
    }
});
</script>
