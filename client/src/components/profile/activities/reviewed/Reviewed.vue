<template>
    <section id="reviewed">
        <!--  -->
        <Header :profile="profile"></Header>
        <!--  -->
        <section class="content">
            <Chart :profile="profile" type="bar" :data="reviewedChartData()" id="reviewed" colors="review" label="Amount of reviewed"></Chart>
            <!--  -->
            <ReviewdList :profile="profile"></ReviewdList>
        </section>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { reviewedChartData } from "@/composable/useProfile";
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
