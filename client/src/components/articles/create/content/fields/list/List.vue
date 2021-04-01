<template>
    <div class="field list">
        <Manager :index="index" label="List"></Manager>
        <button @click="addItemToList">Add item to list</button>
        <!--  -->
        <SingleListItem v-for="(item, inListIndex) in field.value" :key="inListIndex" :inListIndex="inListIndex" :field="field"></SingleListItem>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ArticleContentField } from "@/@types/articles";
//
import Manager from "../_FieldManager.vue";
import SingleListItem from "./SingleListItem.vue";
//
export default defineComponent({
    components: { Manager, SingleListItem },
    props: {
        field: {
            type: Object as PropType<ArticleContentField>,
            required: true
        },
        index: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup(props) {
        const addItemToList = () => (props.field.value as string[]).push("");
        return { addItemToList };
    }
});
</script>
