<template>
    <div class="field header">
        <Manager :index="index" label="Header"></Manager>
        <textarea v-model="field.value" placeholder="Enter content here..." :maxlength="dataRestrictions.content.header.max"></textarea>
        <LengthNotification :value="field.value" :restrictions="dataRestrictions.content.header"></LengthNotification>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ArticleContentField } from "@/@types/articles";
import useCreateArticles from "@/composable/articles/useCreateArticles";
//
import Manager from "./_FieldManager.vue";
import LengthNotification from "../../_LengthNotification.vue";
//
export default defineComponent({
    components: { Manager, LengthNotification },
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
    setup() {
        const { dataRestrictions } = useCreateArticles;
        return { dataRestrictions };
    }
});
</script>
