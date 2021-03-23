<template>
    <section id="main-navigation">
        <router-link to="/" class="main-logo">OLX v2</router-link>
        <!--  -->
        <!--  -->
        <!--  -->
        <button class="mobile-toggler" @click="mobileDevelop = !mobileDevelop"><font-awesome-icon icon="bars"></font-awesome-icon></button>
        <div class="wrap" :class="{ mobileDevelop }">
            <Suspense>
                <AccountManagement></AccountManagement>
            </Suspense>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AccountManagement from "./acc_management/AccountManagement.vue";
//
export default defineComponent({
    components: { AccountManagement },
    data() {
        return {
            mobileDevelop: false
        };
    },
    computed: {
        path() {
            return this.$route.fullPath;
        }
    },
    watch: {
        path() {
            this.mobileDevelop = false;
        }
    }
});
</script>
