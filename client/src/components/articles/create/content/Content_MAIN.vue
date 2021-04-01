<template>
    <section id="content">
        <h1>Content</h1>
        <AddNewField></AddNewField>
        <!--  -->
        <DisplayFields></DisplayFields>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddNewField from "./AddNewField.vue";
import DisplayFields from "./DisplayFields.vue";
//
export default defineComponent({
    components: { AddNewField, DisplayFields }
});
</script>
