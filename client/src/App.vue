<template>
    <Navigation></Navigation>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component"></component>
            </transition>
        </router-view>
    </main>
    <ScrollBtn></ScrollBtn>
</template>

<script>
import ScrollBtn from "@/components/general/Scrollbtn.vue";
import Navigation from "@/components/general/navigation/Navigation.vue";
//
export default {
    components: { Navigation, ScrollBtn },
    computed: {
        fullPath() {
            return this.$route.fullPath;
        }
    },
    watch: {
        fullPath() {
            scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
    }
};
</script>
