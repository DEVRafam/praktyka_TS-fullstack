<template>
    <!--  -->
    <Header :profile="profile" :myOpinion="myOpinion"></Header>
    <!--  -->
    <div class="content-wrap" :class="{ active: currentState === 'editing' }">
        <div class="content-swap">
            <!--  -->
            <!-- Edit existing opinion -->
            <!--  -->
            <Editing :profile="profile" :myOpinion="myOpinion"></Editing>
            <!--  -->
            <!-- Display existing opinion -->
            <!--  -->
            <div class="content-item displaying">
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
    <!--  -->
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { generateScoreColorClass } from "@/composable/profile/useProfile";
import { newReview, currentState } from "@/composable/profile/useMyOpinion";
import formatDate from "@/utils/formatDate";
//
import Header from "./Header.vue";
import Editing from "./Editing.vue";
//
export default defineComponent({
    components: { Header, Editing },
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
