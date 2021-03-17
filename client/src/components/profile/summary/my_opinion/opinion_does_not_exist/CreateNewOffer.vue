<template>
    <!--  -->
    <header class="create-offer">
        <h1 class="label ">Create review</h1>
        <button class="show-form" @click="showForm = !showForm">{{ showForm ? "Hide" : "Show" }}</button>
    </header>
    <!--  -->
    <div class="create-new-offer" :class="{ show: showForm }">
        <!--  -->
        <h2>Review:</h2>
        <!--  -->
        <div class="group">
            <label for="edit-score">
                <span>Score: </span>
                <strong>[{{ newReview.score }}]</strong>
            </label>
            <input id="edit-score" type="range" min="1" max="5" step="0.1" v-model="newReview.score" @change="onScoreChange" />
        </div>
        <div class="group column">
            <label for="edit-explanation">
                <span>Explanation*: </span>
                <strong>{{ `[${newReview.explanation.length}/120]` }}</strong>
            </label>
            <textarea id="edit-explanation" cols="30" rows="10" v-model="newReview.explanation" maxlength="120"></textarea>
        </div>
        <!--  -->
        <ValidationErrors></ValidationErrors>
        <!--  -->
        <div class="buttons-wrap">
            <button @click="handleUpdate" class="green">Create</button>
            <button @click="showForm = false" class="red">Cancel</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { generateScoreColorClass } from "@/composable/profile/useProfile";
import { newReview, currentState, handleUpdate } from "@/composable/profile/useMyOpinion";
//
import ValidationErrors from "../ValidationErrors.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        },
        myOpinion: {
            type: [Object, String] as PropType<ReviewAboutSelf | "OPINION_DOES_NOT_EXIST">,
            required: true
        }
    },
    components: { ValidationErrors },
    setup() {
        const showForm = ref<boolean>(false);
        return { generateScoreColorClass, newReview, currentState, handleUpdate, showForm };
    }
});
</script>
