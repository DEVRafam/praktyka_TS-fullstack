<template>
    <section id="user-profile">
        <!--  -->
        <Summary :profile="profile" :managementAccess="managementAccess"></Summary>
        <Activities :profile="profile" :managementAccess="managementAccess"></Activities>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import useProfile from "@/composable/profile/useProfile";
//
import Summary from "./summary/Summary.vue";
import Activities from "./activities/Activites.vue";
//
export default defineComponent({
    components: { Summary, Activities },
    async setup() {
        const { fetchData, profile, managementAccess } = useProfile;
        await fetchData(Number(useRoute().params.id));
        //
        return { profile, managementAccess };
    }
});
</script>
