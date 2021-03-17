<template>
    <section id="user-visit">
        <Avatar :profile="profile"></Avatar>
        <!--  -->
        <div class="admin-bar" v-if="profile.role === 'ADMIN'">ADMIN</div>
        <br v-else />
        <!--  -->
        <header class="main-header">
            <span class="color">{{ profile.surname }}</span>
            <span>{{ profile.name }}</span>
        </header>
        <!--  -->
        <span class="member-since">
            <span>Member since: </span>
            <span class="color">{{ formatDate(profile.createdAt) }}</span>
        </span>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import formatDate from "@/utils/formatDate";
import { avatarPath } from "@/composable/useUser";
//
import Avatar from "./Avatar.vue";
export default defineComponent({
    components: { Avatar },
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    setup() {
        return { formatDate, avatarPath };
    }
});
</script>
