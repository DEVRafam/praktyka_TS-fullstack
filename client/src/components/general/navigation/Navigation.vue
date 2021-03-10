<template>
    <section id="main-navigation">
        <router-link to="/" class="main-logo">OLX v2</router-link>
        <!--  -->
        <!--  -->
        <!--  -->
        <div class="wrap">
            <input type="text" placeholder="Search an offer..." />
            <!--  -->
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
    components: { AccountManagement }
});
</script>
