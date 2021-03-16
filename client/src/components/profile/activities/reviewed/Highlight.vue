<template>
    <header class="highlight">
        <h1 class="label">Reviewed</h1>
        <div v-if="profile.reviews_about_others.length">
            <span class="field">
                <span>Total: </span>
                <strong>{{ profile.reviews_about_others.length }}</strong>
            </span>
            <!--  -->
            <span class="field">
                <span>Average: </span>
                <strong>{{ averge }}</strong>
            </span>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { computeReviews } from "@/composable/useUser";
// import { reviewedChartData } from "@/composable/useProfile";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    setup(props) {
        const { averge } = computeReviews(props.profile, "reviews_about_others");
        //
        return { averge };
    }
});
</script>
