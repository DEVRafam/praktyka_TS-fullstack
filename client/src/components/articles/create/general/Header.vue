<template>
    <header id="main-header">
        <h1 class="main">Create Article</h1>
        <!--  -->
        <div class="buttons-wrap" v-if="!resetConfirmationDevelop">
            <button class="dark">Preview</button>
            <div>
                <button class="green">Upload</button>
                <button @click="resetConfirmationDevelop = true" class="red">Reset</button>
            </div>
        </div>
        <!--  -->
        <div class="reset-confirmation" v-else>
            <h3>Are you sure?</h3>
            <div>
                <button @click="handleReset" class="red">Confirm</button>
                <button @click="resetConfirmationDevelop = false" class="dark">Cancel</button>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useCreateArticles from "@/composable/articles/useCreateArticles";
//
export default defineComponent({
    setup() {
        const { resetData } = useCreateArticles;
        const resetConfirmationDevelop = ref<boolean>(false);
        const handleReset = () => {
            resetData();
            resetConfirmationDevelop.value = false;
        };
        //
        return { resetConfirmationDevelop, handleReset };
    }
});
</script>
