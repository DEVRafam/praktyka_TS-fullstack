<template>
    <header class="info" :class="{ scroll: category }">
        <h1 class="categories">Choose category:</h1>
        <h1 class="categories choosen">
            <span>Choosen: </span>
            <span class="color">{{ findLabel(category) }}</span>
        </h1>
    </header>
    <section id="categories-wrap">
        <!--  -->
        <div
            class="category"
            v-for="singleCategory in categoriesList"
            :key="singleCategory.label"
            @mouseenter="hoverInit(singleCategory.val)"
            @mouseleave="displayBackgroundAccess = false"
            @click="selectCategory(singleCategory)"
            :class="{ active: singleCategory.val === category }"
        >
            <font-awesome-icon :icon="singleCategory.icon" />
            <span>{{ singleCategory.label }}</span>
        </div>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCategoriesList from "@/composable/offers/useCategoriesList";
import useOffersNavigation from "@/composable/offers/useOffersNavigation";
//
export default defineComponent({
    setup() {
        const { categoriesList, findLabel } = useCategoriesList;
        const { hoverInit, displayBackgroundAccess, category } = useOffersNavigation;
        const selectCategory = (cat: { val: string }) => {
            category.value = cat.val === category.value ? "" : cat.val;
        };
        //
        return { categoriesList, hoverInit, displayBackgroundAccess, category, selectCategory, findLabel };
    }
});
</script>
