<template>
    <Header :profile="profile" :myOpinion="myOpinion"></Header>
    <!--  -->
    <div class="content-wrap" :class="{ active: currentState === 'editing' }">
        <div class="content-swap">
            <Editing :profile="profile" :myOpinion="myOpinion"></Editing>
            <Displaying :profile="profile" :myOpinion="myOpinion"></Displaying>
        </div>
    </div>
    <!--  -->
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { currentState } from "@/composable/profile/useMyOpinion";
//
import Header from "./Header.vue";
import Editing from "./Editing.vue";
import Displaying from "./Displaying.vue";
//
export default defineComponent({
    components: { Header, Editing, Displaying },
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        },
        myOpinion: {
            type: [Object, String] as PropType<ReviewAboutSelf | "OPINION_DOES_NOT_EXIST">,
            required: true
        }
    },
    setup() {
        return { currentState };
    }
});
</script>
