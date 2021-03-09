<template>
    <section id="main-navigation">
        <router-link to="/" class="main-logo">OLX v2</router-link>
        <!--  -->
        <!--  -->
        <!--  -->
        <div class="wrap">
            <input type="text" placeholder="Search an offer..." />
            <!--  -->
            <div class="auth">
                <router-link to="/login" class="in">
                    <span>Sign in</span>
                    <font-awesome-icon icon="sign-in-alt" />
                </router-link>
                <router-link to="/register" class="up">
                    <span>Sign up</span>
                    <font-awesome-icon icon="user" />
                </router-link>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
//
export default defineComponent({
    setup() {
        //
    }
});
</script>
