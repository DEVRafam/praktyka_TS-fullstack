<template>
    <section id="user-profile">
        <!--  -->
        <Summary :profile="profile"></Summary>
        <Activities :profile="profile"></Activities>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useProfile from "@/composable/useProfile";
//
import Summary from "./summary/Summary.vue";
import Activities from "./activities/Activites.vue";
//
export default defineComponent({
    components: { Summary, Activities },
    async setup() {
        const { fetchData, profile } = useProfile;
        await fetchData(Number(useRoute().params.id));
        //
        return { profile };
    }
});
</script>
