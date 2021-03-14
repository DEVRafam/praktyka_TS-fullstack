<template>
    <h1 class="title">{{ offer.title }}</h1>
    <!--  -->
    <h4 class="label">Description</h4>
    <p class="description">{{ offer.description }}</p>
    <!--  -->
    <h4 class="label">Advantages</h4>
    <ul class="adventages">
        <li v-for="asset in offer.advantages" :key="asset">{{ asset }}</li>
    </ul>
    <!--  -->
    <h4 class="label">Contact</h4>
    <ul>
        <li v-for="key in Object.keys(offer.contact)" :key="key">
            <strong>{{ capitalize(key) }}:</strong>
            <span>{{ offer.contact[key] }}</span>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    setup() {
        const capitalize = (text: string) => {
            return text[0].toUpperCase() + text.slice(1);
        };
        //
        return { capitalize };
    }
});
</script>
