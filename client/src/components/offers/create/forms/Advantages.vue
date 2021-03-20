<template>
    <section id="advantages" class="field">
        <header>
            <h1 class="label">Advantages:</h1>
            <button @click="addAdvantage">Add new advantage</button>
        </header>
        <!--  -->
        <div class="advantages-list">
            <div class="advantage" v-for="(asset, index) in data.advantages" :key="index">
                <span class="number">{{ index + 1 }}</span>
                <input type="text" v-model="data.advantages[index]" />
                <!--  -->
                <LengthNotification :value="data.advantages[index]" :restrictions="RESTRICTIONS.advantages.single" @change-val="val => (data.advantages[index] = val)"></LengthNotification>
                <!--  -->
                <button @click="() => removeCertinAdvantage(index)"><font-awesome-icon icon="times-circle"></font-awesome-icon></button>
            </div>
        </div>
        <!--  -->
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
import LengthNotification from "./LengthNotification.vue";
//
export default defineComponent({
    components: { LengthNotification },
    setup() {
        const { data, RESTRICTIONS } = useCreateOffer;
        const removeCertinAdvantage = (index: number) => {
            data.value.advantages.splice(index, 1);
        };
        const addAdvantage = () => {
            data.value.advantages.push("");
        };
        //
        return { data, removeCertinAdvantage, addAdvantage, RESTRICTIONS };
    }
});
</script>
