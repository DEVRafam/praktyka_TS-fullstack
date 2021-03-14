<template>
    <div class="icon" :style="currentUserAvatar()"></div>
    <span class="signed-info">
        <span>Signed in as: </span>
        <strong>{{ user.name }} {{ user.surname }}</strong>
    </span>
    <a class="up" @click="logout">
        <span>Logout</span>
        <font-awesome-icon icon="sign-out-alt" />
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { logout, currentUserAvatar } from "@/composable/auth/authenticate";
//
export default defineComponent({
    setup() {
        const user = JSON.parse(localStorage.getItem("user") as string);
        //
        return { user, currentUserAvatar, logout };
    }
});
</script>
