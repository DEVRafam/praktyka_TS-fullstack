<template>
    <section id="offers">
        <h1 class="label">Offers</h1>
        <!--  -->
        <div class="offers-wrap" v-if="profile.offers.length">
            <div class="swap">
                <SingleOffer v-for="offer in profile.offers" :key="offer.id" :offer="offer"></SingleOffer>
            </div>
        </div>
        <!--  -->
        <h2 v-else class="blank-notification">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
            <span>This user has not any offer published</span>
        </h2>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
//
import SingleOffer from "./SingleOffer.vue";
//
export default defineComponent({
    components: { SingleOffer },
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        }
    }
});
</script>
