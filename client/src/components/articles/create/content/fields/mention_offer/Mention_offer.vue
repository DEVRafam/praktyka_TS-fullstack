<template>
    <div class="field mention">
        <Manager :index="index" label="Mention offer"></Manager>
        <!--  -->
        <template v-if="!Object.keys(field._offer_data).length">
            <input type="text" placeholder="Search for an offer..." v-model="searchingPhrase" />
            <div class="search-result">
                <SingleOffer v-for="(offer, index) in searchResult" :offer="offer" :key="index" :field="field"></SingleOffer>
            </div>
        </template>
        <!--  -->
        <template v-else>
            <header class="selected-offer">
                <h3>Selected offer</h3>
                <button @click="clearSelectedOffer">Clear</button>
            </header>
            <SingleOffer :offer="field._offer_data" :field="field"></SingleOffer>
        </template>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, PropType, ref, watch } from "vue";
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
        const searchingPhrase = ref<string>("");
        const searchResult = ref<Offer[]>([]);
        watch(searchingPhrase, async val => {
            if (val) {
                const { data } = await axios.get(`${API_ADDRESS}/api/offer?search=${val}&limit=3`);
                searchResult.value = data.rows;
            }
        });
        const clearSelectedOffer = () => {
            props.field.offer_id = null;
            props.field._offer_data = {};
        };
        //
        return { searchingPhrase, searchResult, clearSelectedOffer };
    }
});
</script>
