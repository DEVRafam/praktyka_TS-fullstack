<template>
    <div class="avatar">
        <div class="img" :style="avatarPath(profile)"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { avatarPath } from "@/composable/useUser";
import { currentUser } from "@/composable/auth/authenticate";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    setup() {
        return { avatarPath, currentUser };
    }
});
</script>
