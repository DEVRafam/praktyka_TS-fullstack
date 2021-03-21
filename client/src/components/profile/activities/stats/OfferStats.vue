<template>
    <div class="field">
        <header>
            <h1 class="label">Offers</h1>
            <div>
                <span class="field">
                    <span>Total: </span>
                    <strong>{{ offersAmount }}</strong>
                </span>
                <span class="field">
                    <span>Top category: </span>
                    <strong>{{ topCategory() }}</strong>
                </span>
            </div>
        </header>
        <!--  -->
        <Chart :profile="profile" type="pie" :data="offersChartData()" id="offer" label="Amount of offers"></Chart>
        <!--  -->
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { topCategory } from "@/composable/profile/useProfile";
import { offersChartData } from "@/composable/profile/useProfileChartData";
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
        let offersAmount = 0;
        props.profile.offers_stats.forEach(el => (offersAmount += Number(el.amount)));
        return { topCategory, offersChartData, offersAmount };
    }
});
</script>
