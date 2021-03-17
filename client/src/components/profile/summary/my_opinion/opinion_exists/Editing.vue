<template>
    <div class="content-item editing">
        <!--  -->
        <div class="group">
            <label for="edit-score">
                <span>Score: </span>
                <strong>[{{ newReview.score }}]</strong>
            </label>
            <input id="edit-score" type="range" min="1" max="5" step="0.1" v-model="newReview.score" @change="onScoreChange" />
        </div>
        <!--  -->
        <div class="group column">
            <label for="edit-explanation">
                <span>Explanation*: </span>
                <strong>{{ `${newReview.explanation.length}/120` }}</strong>
            </label>
            <textarea id="edit-explanation" cols="30" rows="10" v-model="newReview.explanation" maxlength="120"></textarea>
        </div>
        <!--  -->
        <ValidationErrors></ValidationErrors>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { newReview } from "@/composable/profile/useMyOpinion";
//
import ValidationErrors from "../ValidationErrors.vue";
//
export default defineComponent({
    components: { ValidationErrors },
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
    setup() {
        return { newReview };
    }
});
</script>
