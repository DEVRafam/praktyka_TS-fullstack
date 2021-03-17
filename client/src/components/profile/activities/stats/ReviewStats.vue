<template>
    <div class="field">
        <header>
            <h1 class="label">Reviews</h1>
            <div>
                <span class="field">
                    <span>Total: </span>
                    <strong>{{ profile.reviews_about_self.length }}</strong>
                </span>
                <!--  -->
                <span class="field">
                    <span>Average: </span>
                    <strong>{{ averge }}</strong>
                </span>
            </div>
        </header>
        <!--  -->
        <Chart :profile="profile" type="bar" :data="reviewsChartData()" id="review" colors="review" label="Amount of review"></Chart>
        <!--  -->
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { computeReviews } from "@/composable/useUser";
import { reviewsChartData } from "@/composable/profile/useProfileChartData";
//
import Chart from "./Chart.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    components: { Chart },
    setup(props) {
        const { averge } = computeReviews(props.profile);
        return { averge, reviewsChartData };
    }
});
</script>
