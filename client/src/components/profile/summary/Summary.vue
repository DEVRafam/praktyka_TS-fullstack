<template>
    <section id="summary">
        <!--  -->
        <section class="visit">
            <div class="avatar">
                <div class="img" :style="avatarPath(profile)"></div>
            </div>
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
        <!--  -->
        <MyOpinion :profile="profile" v-if="myOpinion" :myOpinion="myOpinion"></MyOpinion>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import formatDate from "@/utils/formatDate";
import { avatarPath } from "@/composable/useUser";
import { myOpinion } from "@/composable/profile/useMyOpinion";
//
import MyOpinion from "./my_opinion/MyOpinion.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    },
    components: { MyOpinion },
    setup() {
        //
        return { formatDate, avatarPath, myOpinion };
    }
});
</script>
