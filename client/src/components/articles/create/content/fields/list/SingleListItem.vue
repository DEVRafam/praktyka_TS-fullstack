<template>
    <div class="single-item">
        <textarea v-model="field.value[inListIndex]" placeholder="Enter content here..." :maxlength="dataRestrictions.content.listItem.max"></textarea>
        <button @click="removeItemFromList(index)" v-if="inListIndex !== 0">Delete</button>
        <LengthNotification :value="field.value[inListIndex]" :restrictions="dataRestrictions.content.listItem"></LengthNotification>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ArticleContentField } from "@/@types/articles";
import useFormOrderingItems from "@/composable/useFormOrderingItems";
import useCreateArticles from "@/composable/articles/useCreateArticles";
//
import LengthNotification from "../../../_LengthNotification.vue";
//
export default defineComponent({
    components: { LengthNotification },
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
        const { dataRestrictions } = useCreateArticles;
        const addItemToList = () => (props.field.value as string[]).push("");
        const removeItemFromList = (index: number) => (props.field.value as string[]).splice(index, 1);
        const { moveUp, moveDown, moveUpAccess, moveDownAccess } = useFormOrderingItems(props.inListIndex, props.field.value);

        //
        return { dataRestrictions, addItemToList, removeItemFromList, moveUp, moveDown, moveUpAccess, moveDownAccess };
    }
});
</script>
