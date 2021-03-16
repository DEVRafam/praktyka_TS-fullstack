<template>
    <section id="reviewed">
        <!--  -->
        <Header :profile="profile"></Header>
        <!--  -->
        <section class="content" v-if="profile.reviews_about_others.length">
            <Chart :profile="profile" type="bar" :data="reviewedChartData()" id="reviewed" colors="review" label="Amount of reviewed"></Chart>
            <!--  -->
            <ReviewdList :profile="profile"></ReviewdList>
        </section>
        <!--  -->
        <h2 v-else class="blank-notification">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
            <span>This user has not reviewed any other user yet</span>
        </h2>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { reviewedChartData } from "@/composable/useProfileChartData";
//
import Chart from "@/components/profile/activities/stats/Chart.vue";
import Header from "./Highlight.vue";
import ReviewdList from "./ReviewdList.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    components: { Header, Chart, ReviewdList },
    setup() {
        return { reviewedChartData };
    }
});
</script>
