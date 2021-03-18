<template>
    <section id="summary">
        <Management :profile="profile" v-if="managementAccess"></Management>
        <Visit :profile="profile"></Visit>
        <MyOpinion :profile="profile" v-if="myOpinion" :myOpinion="myOpinion"></MyOpinion>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { myOpinion } from "@/composable/profile/useMyOpinion";
//
import MyOpinion from "./my_opinion/MyOpinion.vue";
import Visit from "./visit/Visit.vue";
import Management from "./management/Management.vue";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        },
        managementAccess: {
            type: Boolean as PropType<boolean>,
            required: true
        }
    },
    components: { MyOpinion, Visit, Management },
    setup() {
        return { myOpinion };
    }
});
</script>
