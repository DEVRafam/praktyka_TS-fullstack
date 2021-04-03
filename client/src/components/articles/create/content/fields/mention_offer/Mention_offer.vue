<template>
    <div class="field mention">
        <Manager :index="index" label="Mention offer">
            <template v-if="offerIsSelected">
                <router-link :to="{ path: `/offer/${field._offer_data.slug}` }" target="_blank">Open in new tab</router-link>
                <button @click="clearSelectedOffer" class="dark">Clear</button>
            </template>
            <input type="text" placeholder="Search for an offer..." v-model="searchingPhrase" v-else />
        </Manager>
        <!--  -->
        <!-- SELECTED OFFER -->
        <!--  -->
        <SingleOffer v-if="offerIsSelected" :offer="field._offer_data" :field="field" class="selected"></SingleOffer>
        <!--  -->
        <!-- SEARCHING RESULTS -->
        <!--  -->
        <div class="search-result" v-else-if="searchingPhrase">
            <template v-if="searchResult.length">
                <SingleOffer v-for="(offer, index) in searchResult" :offer="offer" :key="index" :field="field"></SingleOffer>
            </template>
            <!-- NO RESULTS -->
            <h3 class="no-results" v-else>
                <template v-if="searchingPhrase">
                    <font-awesome-icon icon="times-circle"></font-awesome-icon>
                    <span>There are no results that whould contain phrase </span>
                    <span class="color" v-text="searchingPhrase"></span>
                </template>
            </h3>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { computed, defineComponent, PropType, ref, watch } from "vue";
import useCreateArticles from "@/composable/articles/useCreateArticles";
import { ArticleContentField } from "@/@types/articles";
import { Offer } from "@/@types/Offer";
import { API_ADDRESS } from "@/composable/env";
//
import Manager from "../_FieldManager.vue";
import SingleOffer from "./SingleOfferResult.vue";
//
export default defineComponent({
    components: { Manager, SingleOffer },
    props: {
        field: {
            type: Object as PropType<ArticleContentField>,
            required: true
        },
        index: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup(props) {
        const { contentFieldScroll } = useCreateArticles;
        const searchingPhrase = ref<string>("");
        const searchResult = ref<Offer[]>([]);
        //
        const offerIsSelected = computed<boolean>(() => !!Object.keys(props.field._offer_data as never).length);
        //
        watch(searchingPhrase, async val => {
            if (val) {
                contentFieldScroll(props.index);
                const { data } = await axios.get(`${API_ADDRESS}/api/offer?search=${val}&limit=3`);
                searchResult.value = data.rows;
            }
        });
        const clearSelectedOffer = () => {
            props.field.offer_id = null;
            props.field._offer_data = {};
        };
        //
        return { searchingPhrase, searchResult, clearSelectedOffer, offerIsSelected };
    }
});
</script>
