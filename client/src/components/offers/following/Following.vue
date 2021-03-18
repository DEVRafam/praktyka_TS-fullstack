<template>
    <section id="following">
        <!--  -->
        <h1 class="main-header">
            <span>FOLLOWING OFFERS- </span>
            <span class="color">{{ following.length }}</span> in total
        </h1>
        <!--  -->
        <div class="single-following-offer" v-for="(offer, index) in following" :key="offer.slug">
            <Image :data="offer"></Image>
            <div class="content">
                <header>
                    <span class="date">
                        <span>At </span>
                        <strong>{{ formatDate(offer.updatedAt) }}</strong>
                        <span> in category </span>
                        <router-link :to="`/?category=${offer.category}&order=newest`">
                            <strong class="dark">{{ findLabel(offer.category) }}</strong>
                        </router-link>
                    </span>
                    <span class="price">
                        <span>{{ priceSeparators(offer) }}</span>
                        <strong class="dark">{{ offer.currency }}</strong>
                        <button class="unfollow" @click="() => unfollow(offer.id, index)">Unfollow</button>
                    </span>
                </header>
                <h3>{{ offer.title }}</h3>
                <p>{{ offer.description.slice(0, 250) }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useFollowing from "@/composable/offers/useFollowing";
import Image from "@/components/offers/many/display_offers/single_offer/Image.vue";
import formatDate from "@/utils/formatDate";
import priceSeparators from "@/utils/priceSeparators";
import { findLabel } from "@/composable/offers/useCategoriesList";
// import { FollowingOffer } from "@/@types/Offer";
//
export default defineComponent({
    components: { Image },
    async setup() {
        const { fetchFollowingOffers, following, unfollow } = useFollowing;
        await fetchFollowingOffers();
        return { following, formatDate, priceSeparators, findLabel, unfollow };
    }
});
</script>
