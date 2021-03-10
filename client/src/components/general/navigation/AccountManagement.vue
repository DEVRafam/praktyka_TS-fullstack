<template>
    <div class="auth">
        <!--  -->
        <template v-if="authenticated">
            <span class="signed-info">
                <span>Signed in as: </span>
                <strong>{{ user.name }} {{ user.surname }}</strong>
            </span>
            <a class="up" @click="logout">
                <span>Logout</span>
                <font-awesome-icon icon="sign-out-alt" />
            </a>
        </template>
        <!--  -->
        <template v-else>
            <router-link to="/login" class="in">
                <span>Sign in</span>
                <font-awesome-icon icon="sign-in-alt" />
            </router-link>
            <router-link to="/register" class="up">
                <span>Sign up</span>
                <font-awesome-icon icon="user" />
            </router-link>
        </template>
        <!--  -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deepAuthenticate, logout } from "@/composable/auth/authenticate";
//
export default defineComponent({
    async setup() {
        const authenticated = await deepAuthenticate();
        //
        return { authenticated, logout, user: JSON.parse(localStorage.getItem("user") as string) };
    }
});
</script>
