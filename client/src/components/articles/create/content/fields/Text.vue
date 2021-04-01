<template>
    <div class="field text">
        <Manager :index="index" label="Text"></Manager>
        <textarea v-model="field.value"></textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ArticleContentField } from "@/@types/articles";
//
import Manager from "./_FieldManager.vue";
//
export default defineComponent({
    components: { Manager },
    props: {
        field: {
            type: Object as PropType<ArticleContentField>,
            required: true
        },
        index: {
            type: Number as PropType<number>,
            required: true
        }
    }
});
</script>
