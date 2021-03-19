<template>
    <footer>
        <span class="date">
            <span>{{ formatDate(data.updatedAt) }}</span>
            <span class="color">{{ data.localization }}</span>
        </span>
        <router-link :to="`/?category=${data.category}&order=newest`">
            <span class="category">
                {{ findLabel(data.category) }}
            </span>
        </router-link>
    </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
import formatDate from "@/utils/formatDate";
import useCategoriesList from "@/composable/offers/useCategoriesList";
// components
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>
        }
    },
    setup() {
        const { findLabel } = useCategoriesList;
        return { formatDate, findLabel };
    }
});
</script>
