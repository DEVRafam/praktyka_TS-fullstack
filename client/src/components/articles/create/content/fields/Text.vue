<template>
    <div class="field text">
        <Manager :index="index" label="Text"></Manager>
        <textarea v-model="field.value" placeholder="Enter content here..." :maxlength="dataRestrictions.content.text.max"></textarea>
        <LengthNotification :value="field.value" :restrictions="dataRestrictions.content.text"></LengthNotification>
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
