<template>
    <section id="offers">
        <header>
            <h1 class="label">Offers</h1>
            <router-link :to="{ path: `/offer/dealer/${profile.id}` }" v-if="isAdmin">Inspect offers</router-link>
        </header>
        <!--  -->
        <div class="offers-wrap" v-if="profile.offers.length">
            <div class="swap">
                <SingleOffer v-for="offer in profile.offers" :key="offer.id" :offer="offer"></SingleOffer>
            </div>
        </div>
        <!--  -->
        <h2 v-else class="blank-notification">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
            <span>This user does not have any offer available</span>
        </h2>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile } from "@/@types/user";
import { isAdmin } from "@/composable/auth/authenticate";
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
    },
    setup() {
        return { isAdmin };
    }
});
</script>
