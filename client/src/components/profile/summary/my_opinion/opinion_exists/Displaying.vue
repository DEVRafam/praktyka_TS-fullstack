<template>
    <div class="content-item displaying">
        <header>
            <h3>My opinion</h3>
            <span class="date">
                <span>from </span>
                <strong>{{ formatDate(myOpinion.createdAt) }}</strong>
            </span>
        </header>
        <div class="review">
            <div class="score" :class="generateScoreColorClass(myOpinion)">{{ myOpinion.score }}</div>
            <p v-if="myOpinion.explanation">{{ myOpinion.explanation }}</p>
            <i v-else>Review without explanation</i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { generateScoreColorClass } from "@/composable/profile/useProfile";
import formatDate from "@/utils/formatDate";
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
    setup() {
        return { generateScoreColorClass, formatDate };
    }
});
</script>
