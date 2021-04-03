<template>
    <div class="field list">
        <Manager :index="index" label="List">
            <button @click="addItemToList" class="dark">Add item to list</button>
        </Manager>
        <!--  -->
        <VueDraggableNext class="dragArea list-group w-full" :list="field.value" ghost-class="ghost">
            <SingleListItem v-for="(item, inListIndex) in field.value" :key="inListIndex" :inListIndex="inListIndex" :field="field"></SingleListItem>
        </VueDraggableNext>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import useCreateArticles from "@/composable/articles/useCreateArticles";
//
import { ArticleContentField } from "@/@types/articles";
//
import Manager from "../_FieldManager.vue";
import SingleListItem from "./SingleListItem.vue";
//
export default defineComponent({
    components: { Manager, SingleListItem, VueDraggableNext },
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
        const { contentFieldScroll } = useCreateArticles;
        const addItemToList = () => {
            contentFieldScroll(props.index, "BOTTOM");
            (props.field.value as string[]).push("");
        };
        return { addItemToList };
    }
});
</script>
