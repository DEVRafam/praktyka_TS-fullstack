<template>
    <section class="reviewed-list">
        <div class="single-reviewed" v-for="(review, index) in profile.reviews_about_others" :key="index">
            <router-link :to="`/profile/${review.dealer.id}`" class="avatar" :style="avatarPath(review.dealer)"></router-link>
            <!--  -->
            <div class="content">
                <header>
                    <div class="author">
                        <span class="name">{{ review.dealer.name }} {{ review.dealer.surname }}</span>
                        <span class="date">{{ formatDate(review.createdAt) }}</span>
                    </div>
                    <div class="score" :class="generateScoreColorClass(review)">
                        <span>{{ review.score }}</span>
                    </div>
                </header>
                <p>{{ review.explanation }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { avatarPath } from "@/composable/useUser";
import { generateScoreColorClass } from "@/composable/profile/useProfile";
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
        return { avatarPath, formatDate, generateScoreColorClass };
    }
});
</script>
