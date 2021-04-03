<template>
    <section id="title-form">
        <label for="title">Title:</label>
        <textarea id="title" v-model="data.title" placeholder="Enter article title..." :maxlength="dataRestrictions.title.max"></textarea>
        <LengthNotification :value="data.title" :restrictions="dataRestrictions.title"></LengthNotification>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LengthNotification from "../_LengthNotification.vue";
import useCreateArticles from "@/composable/articles/useCreateArticles";
//
export default defineComponent({
    components: { LengthNotification },
    setup() {
        const { dataRestrictions, data } = useCreateArticles;
        return { dataRestrictions, data };
    }
});
</script>
