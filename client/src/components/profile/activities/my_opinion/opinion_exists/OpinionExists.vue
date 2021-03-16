<template>
    <!--  -->
    <Header :profile="profile" :myOpinion="myOpinion"></Header>
    <!--  -->
    <div class="content-wrap">
        <div class="content-swap" :class="{ active: currentState === 'editing' }">
            <!--  -->
            <!-- Edit existing opinion -->
            <!--  -->
            <div class="content-item editing">
                <div class="group">
                    <label for="edit-score">
                        <span>Score: </span>
                        <strong>[{{ newReview.score }}]</strong>
                    </label>
                    <input id="edit-score" type="range" min="1" max="5" step="0.1" v-model="newReview.score" @change="onScoreChange" />
                </div>
                <div class="group">
                    <label for="edit-explanation">
                        <span>Explanation: </span>
                        <strong>{{ `${newReview.explanation.length}/120` }}</strong>
                    </label>
                    <textarea id="edit-explanation" cols="30" rows="10" v-model="newReview.explanation" maxlength="120"></textarea>
                </div>
            </div>
            <!--  -->
            <!-- Display existing opinion -->
            <!--  -->
            <div class="content-item displaying">
                <!--  -->
                <span class="date">
                    <span>from</span>
                    <strong>{{ formatDate(myOpinion.createdAt) }}</strong>
                </span>
                <!--  -->
                <div class="review">
                    <div class="score" :class="generateScoreColorClass(myOpinion)">{{ myOpinion.score }}</div>
                    <p v-if="myOpinion.explanation">{{ myOpinion.explanation }}</p>
                    <i v-else>Review without explanation</i>
                </div>
            </div>
            <!--  -->
            <!--  -->
            <!--  -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { generateScoreColorClass } from "@/composable/profile/useProfile";
import { newReview, currentState } from "@/composable/profile/useMyOpinion";
import formatDate from "@/utils/formatDate";
//
import Header from "./Header.vue";
//
export default defineComponent({
    components: { Header },
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
        return { generateScoreColorClass, newReview, currentState, formatDate };
    }
});
</script>
