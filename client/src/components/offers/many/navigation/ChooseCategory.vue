<template>
    <section id="choose-category" :class="{ develop: categorySectionDevelop }">
        <header class="info" :class="{ scroll: category }">
            <div class="headers-wrap">
                <h2 class="categories">Categories:</h2>
                <h2 class="categories choosen">
                    <span>Choosen category: </span>
                    <span class="color">{{ findLabel(category) }}</span>
                </h2>
            </div>
            <!--  -->
            <div class="buttons-wrap">
                <button @click="categorySectionDevelop = !categorySectionDevelop">Develop</button>
                <button @click="categorySectionDevelop = !categorySectionDevelop">Hide</button>
            </div>
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
        const { hoverInit, displayBackgroundAccess, category, categorySectionDevelop } = useOffersNavigation;
        const selectCategory = (cat: { val: string }) => {
            category.value = cat.val === category.value ? "" : cat.val;
        };
        //
        //
        return { categoriesList, hoverInit, displayBackgroundAccess, category, selectCategory, findLabel, categorySectionDevelop };
    }
});
</script>
