<template>
    <section id="general-informations" class="field">
        <!--  -->
        <h1 class="label">General:</h1>
        <!--  -->
        <div class="form-group">
            <label for="title">Title: </label>
            <input type="text" id="title" v-model="data.title" />
            <strong class="error"></strong>
        </div>
        <!--  -->
        <div class="form-group">
            <label for="category">Category: </label>
            <select id="category" v-model="data.category">
                <option v-for="category in categoriesList" :key="category.val" :value="category.val">{{ category.label }}</option>
            </select>
        </div>
        <!--  -->
        <div class="form-group price">
            <label for="price">Price: </label>
            <input type="number" id="price" v-model="data.price" />
            <select v-model="data.currency" id="currency">
                <option v-for="currency in availableCurrencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>
        </div>
        <!--  -->
        <div class="form-group">
            <label for="localization">Localization: </label>
            <input type="text" id="localization" v-model="data.localization" />
        </div>
        <!--  -->
        <div class="form-group">
            <label for="country">Country: </label>
            <input type="text" id="country" v-model="data.country" />
        </div>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
import useCategoriesList from "@/composable/offers/useCategoriesList";

//
export default defineComponent({
    setup() {
        const { data, availableCurrencies } = useCreateOffer;
        const { categoriesList } = useCategoriesList;
        //
        return { data, categoriesList, availableCurrencies };
    }
});
</script>
