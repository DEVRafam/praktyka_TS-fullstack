<template>
    <section id="advantages" class="field">
        <h1 class="label">Advantages:</h1>
        <!--  -->
        <div class="advantages-list">
            <div class="advantage" v-for="(asset, index) in data.advantages" :key="index">
                <span class="number">{{ index + 1 }}</span>
                <input type="text" v-model="data.advantages[index]" />
                <button @click="() => removeCertinAdvantage(index)">Delete</button>
            </div>
        </div>
        <!--  -->
        <button @click="addAdvantage">Add new advantage</button>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
export default defineComponent({
    setup() {
        const { data } = useCreateOffer;
        const removeCertinAdvantage = (index: number) => {
            data.value.advantages.splice(index, 1);
        };
        const addAdvantage = () => {
            data.value.advantages.push("");
        };
        //
        return { data, removeCertinAdvantage, addAdvantage };
    }
});
</script>
