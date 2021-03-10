<template>
    <div class="icon" :style="avatarStyles"></div>
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
import { API_ADDRESS } from "@/composable/env";
import { logout } from "@/composable/auth/authenticate";
//
export default defineComponent({
    setup() {
        const user = JSON.parse(localStorage.getItem("user") as string);
        const avatar = user.avatar ? `${API_ADDRESS}/api/photo/avatar/${user.avatar}` : "/images/default_user_avatar.jpg";
        const avatarStyles = `background-image: url(${avatar})`;
        //
        return { user, avatarStyles, logout };
    }
});
</script>
