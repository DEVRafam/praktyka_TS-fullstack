<template>
    <section id="user-management">
        <h1>Account settings</h1>
        <!--  -->
        <div class="wrap">
            <ChangeAvatar></ChangeAvatar>
            <button class="red">Delete account</button>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
//
import ChangeAvatar from "./ChangeAvatar.vue";
//
export default defineComponent({
    components: { ChangeAvatar },
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    }
});
</script>
