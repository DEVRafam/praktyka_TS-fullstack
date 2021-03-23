<template>
    <section id="management">
        <h1 class="main-header">
            <span class="color">{{ data.offers.length }}</span> offers from <span class="color">{{ `${data.name} ${data.surname}` }}</span>
        </h1>
        <!--  -->
        <div class="single-following-offer" v-for="offer in data.offers" :key="offer.slug">
            <div class="img-wrap" :class="offer.status">
                <Image :data="offer"></Image>
                <router-link :to="`/offer/${offer.slug}`" class="status" :class="offer.status">
                    <span class="message">{{ offer.status }}</span>
                </router-link>
            </div>
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
                    <ChangeStatus :status="offer.status" :id="offer.id" :title="offer.title"></ChangeStatus>
                </header>
                <!--  -->
                <span class="follows" v-if="offer.follows.length">
                    <span>Followed by </span>
                    <span class="color">{{ offer.follows.length }}</span>
                    <span>{{ offer.follows.length == 1 ? " user" : " users" }}</span>
                </span>
                <!--  -->
                <h3>{{ offer.title }}</h3>
                <p>{{ offer.description.slice(0, 250) }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useOffersManagement from "@/composable/offers/useOffersManagement";
import formatDate from "@/utils/formatDate";
import { findLabel } from "@/composable/offers/useCategoriesList";
import { currentUser } from "@/composable/auth/authenticate";
import { useRoute } from "vue-router";
//
import Image from "@/components/offers/many/display_offers/single_offer/Image.vue";
import ChangeStatus from "./ChangeStatus.vue";
//
export default defineComponent({
    components: { Image, ChangeStatus },
    async setup() {
        const { fetchData, data } = useOffersManagement;
        await fetchData(Number(useRoute().params.id));

        //
        return { data, formatDate, findLabel, currentUser };
    }
});
</script>
