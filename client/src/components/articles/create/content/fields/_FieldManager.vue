<template>
    <header class="field-manager">
        <h2 class="label" v-text="label"></h2>
        <!--  -->
        <div class="buttons">
            <button @click="moveUp" :disabled="!moveUpAccess">Move up</button>
            <button @click="moveDown" :disabled="!moveDownAccess">Move down</button>
            <button @click="deleteConfirmation = true">Remove</button>
        </div>
        <!--  -->
        <div class="delete-confiriamtion" v-if="deleteConfirmation">
            <button @click="handleFieldRemove">Confirm</button>
            <button @click="deleteConfirmation = false">Cancel</button>
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
