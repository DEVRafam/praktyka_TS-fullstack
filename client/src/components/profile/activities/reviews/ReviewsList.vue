<template>
    <section class="reviews-list">
        <!--  -->
        <div class="review" v-for="(review, index) in profile.reviews_about_self" :key="index">
            <!--  -->
            <router-link :to="`/profile/${review.reviewer.id}`" class="avatar" :style="avatarPath(review.reviewer)"></router-link>

            <!--  -->
            <div class="content">
                <header>
                    <div class="author">
                        <span class="name">{{ review.reviewer.name }} {{ review.reviewer.surname }}</span>
                        <span class="date">{{ formatDate(review.createdAt) }}</span>
                    </div>
                    <div class="score" :class="generateScoreColorClass(review)">
                        <span>{{ review.score }}</span>
                    </div>
                </header>
                <p>{{ review.explanation }}</p>
            </div>
        </div>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { avatarPath } from "@/composable/useUser";
import formatDate from "@/utils/formatDate";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    setup() {
        const generateScoreColorClass = (review: { score: number }): string => {
            return `score-${Math.floor(review.score)}`;
        };
        //
        return { avatarPath, formatDate, generateScoreColorClass };
    }
});
</script>
