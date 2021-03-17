<template>
    <section id="my-opinion">
        <!--  -->
        <OpinionExists v-if="typeof myOpinion === 'object'" :profile="profile" :myOpinion="myOpinion"></OpinionExists>
        <CreateNewOffer v-else :profile="profile" :myOpinion="myOpinion"></CreateNewOffer>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
//
import OpinionExists from "./opinion_exists/OpinionExists.vue";
import CreateNewOffer from "./opinion_does_not_exist/CreateNewOffer.vue";
//
export default defineComponent({
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
    components: { OpinionExists, CreateNewOffer },
    setup() {
        interface NewReview {
            score: number;
            explanation: string;
        }
        const newReview = reactive({
            score: 0,
            explanation: ""
        } as NewReview);
        //
        const currentState = ref<"displaying" | "editing">("displaying");
        //
        return { newReview, currentState };
    }
});
</script>
