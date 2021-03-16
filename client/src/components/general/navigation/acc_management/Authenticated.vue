<template>
    <router-link :to="`/profile/${currentUser.id}`" class="icon" :style="currentUserAvatar()"> </router-link>
    <span class="signed-info">
        <span>Signed in as: </span>
        <strong>{{ currentUser.name }} {{ currentUser.surname }}</strong>
    </span>
    <a class="up" @click="logout">
        <span>Logout</span>
        <font-awesome-icon icon="sign-out-alt" />
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { logout, currentUserAvatar, currentUser } from "@/composable/auth/authenticate";
//
export default defineComponent({
    setup() {
        return { currentUser, currentUserAvatar, logout };
    }
});
</script>
