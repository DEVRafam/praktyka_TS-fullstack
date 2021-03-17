<template>
    <div class="content-item displaying">
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
        return { generateScoreColorClass };
    }
});
</script>
