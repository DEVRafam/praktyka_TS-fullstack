<template>
    <section id="dealer">
        <!--  -->
        <header>
            <h1>Dealer</h1>
            <h2 class="name">{{ dealer.name }} {{ dealer.surname }}</h2>
            <span
                >Member since: <span class="color">{{ memberSince }}</span></span
            >
        </header>
        <!--  -->
        <div class="img-wrap">
            <img :src="avatarPath(dealer, false)" />
        </div>
        <!--  -->
        <Reviews :dealer="dealer"></Reviews>
        <!--  -->
        <router-link :to="`/profile/${dealer.id}`">Show more details</router-link>
    </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/@types/user";
import { avatarPath } from "@/composable/useUser";
import formatDate from "@/utils/formatDate";
//
import Reviews from "./Reviews.vue";
//
export default defineComponent({
    props: {
        dealer: {
            type: Object as PropType<User>,
            required: true
        }
    },
    components: { Reviews },
    setup(props) {
        const memberSince = formatDate(props.dealer.createdAt as string);
        return { avatarPath, memberSince };
    }
});
</script>
