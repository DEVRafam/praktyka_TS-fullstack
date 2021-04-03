<template>
    <header class="field-manager">
        <h2 class="label">
            <span>Field type: </span>
            <span class="type" v-text="label"></span>
        </h2>
        <!--  -->
        <div class="buttons" v-if="!deleteConfirmation">
            <slot></slot>
            <button class="delete" @click="deleteConfirmation = true">Remove</button>
        </div>
        <!--  -->
        <div class="delete-confiriamtion buttons" v-if="deleteConfirmation">
            <h4>Are you sure?</h4>
            <button @click="handleFieldRemove" class="dark">Confirm</button>
            <button @click="deleteConfirmation = false" class="delete">Cancel</button>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { data } from "@/composable/articles/useCreateArticles";
import useFormOrderingItems from "@/composable/useFormOrderingItems";
//
export default defineComponent({
    props: {
        index: {
            type: Number as PropType<number>,
            required: true
        },
        label: {
            type: String as PropType<string>,
            required: true
        }
    },
    // eslint-disable-next-line vue/no-setup-props-destructure
    setup({ index }) {
        const deleteConfirmation = ref<boolean>(false);
        const handleFieldRemove = () => {
            data.value.content.splice(index, 1);
        };
        const { moveUp, moveDown, moveUpAccess, moveDownAccess } = useFormOrderingItems(index, data.value.content);
        //
        return { deleteConfirmation, handleFieldRemove, moveUp, moveDown, moveUpAccess, moveDownAccess };
    }
});
</script>
