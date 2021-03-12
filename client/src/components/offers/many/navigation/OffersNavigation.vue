<template>
    <header id="many-offers-main-nav" :class="{ displayBackground: displayBackgroundAccess || category }">
        <span class="background" :style="backgroundStyles"></span>
        <!--  -->
        <Organization></Organization>
        <ChooseCategory></ChooseCategory>
        <!--  -->
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
//
import ChooseCategory from "./ChooseCategory.vue";
import Organization from "./Organization.vue";
//
export default defineComponent({
    components: { ChooseCategory, Organization },
    setup() {
        const { backgroundStyles, displayBackgroundAccess, category } = useOffersNavigation;
        return { backgroundStyles, displayBackgroundAccess, category };
    }
});
</script>
