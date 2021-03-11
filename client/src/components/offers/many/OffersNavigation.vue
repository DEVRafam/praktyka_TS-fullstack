<template>
    <header id="many-offers-main-nav" :class="{ displayBackground }">
        <span class="background" :style="backgroundStyles"></span>
        <h1>Choose category:</h1>
        <section class="categories-wrap">
            <!--  -->
            <div class="category" v-for="category in categoriesList" :key="category.label" @mouseenter="hoverInit(category.val)" @mouseleave="displayBackground = false">
                <font-awesome-icon :icon="category.icon" />
                <span>{{ category.label }}</span>
            </div>
            <!--  -->
        </section>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
//
export default defineComponent({
    props: {
        //
    },
    components: {},
    setup() {
        const categoriesList = [
            {
                val: "services",
                label: "Services",
                icon: "users"
            },
            {
                val: "automotive",
                label: "Automotive",
                icon: "car"
            },
            {
                val: "education",
                label: "Education",
                icon: "university"
            },
            {
                val: "sport",
                label: "Sport",
                icon: "football-ball"
            },
            {
                val: "fashion",
                label: "Fashion",
                icon: "tshirt"
            },
            {
                val: "electronic",
                label: "Electronic",
                icon: "tv"
            },
            {
                val: "real-estate",
                label: "Real estate",
                icon: "home"
            },
            {
                val: "job",
                label: "Job advertisement",
                icon: "handshake"
            },
            {
                val: "house-and-garden",
                label: "House and garden",
                icon: "tree"
            },
            {
                val: "computer-and-games",
                label: "Computer and games",
                icon: "gamepad"
            }
        ];
        const background = ref<null | string>(null);
        const displayBackground = ref<boolean>(false);
        const backgroundStyles = computed<string>(() => {
            return `background-image: url('/images/home/${background.value}.jpg')`;
        });
        const hoverInit = (val: string) => {
            background.value = val;
            displayBackground.value = true;
        };
        //
        return { categoriesList, background, displayBackground, hoverInit, backgroundStyles };
    }
});
</script>
