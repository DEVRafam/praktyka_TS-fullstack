<template>
    <section id="photos" class="field">
        <header>
            <h1 class="label">Photos:</h1>
            <button @click="$refs['inp-photos'].click()">Add photos</button>
        </header>
        <input type="file" id="test" accept="image/x-png,image/jpeg" multiple style="display:none" ref="inp-photos" @change="saveImages" />
        <!--  -->
        <div class="images" v-if="photosURLs.length">
            <div class="single-img" v-for="(el, index) in photosURLs" :key="index">
                <img :src="el" />
                <div class="buttons">
                    <button @click="modalIndex = index">Zoom</button>
                    <button @click="() => deleteCertinImage(index)">Remove</button>
                </div>
            </div>
        </div>
        <!--  -->
        <!--  -->
        <!--  -->
        <Modal :modelValue="modalIndex" v-if="modalIndex !== null" @update:modelValue="val => (modalIndex = val)">
            <div class="image-preview" :style="`background-image: url('${photosURLs[modalIndex]}')`"></div>
            <template #footer v-if="photosURLs.length > 1">
                <button class="previous" @click="() => changeImageIndex('prev')">
                    <font-awesome-icon icon="chevron-left"></font-awesome-icon>
                </button>
                <!--  -->
                <label>{{ modalIndex + 1 }} of {{ photosURLs.length }}</label>
                <!--  -->
                <button class="next" @click="() => changeImageIndex('next')">
                    <font-awesome-icon icon="chevron-right"></font-awesome-icon>
                </button>
            </template>
        </Modal>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
import { InputFile } from "@/@types/general";
//
export default defineComponent({
    setup() {
        const { data, photosURLs } = useCreateOffer;
        const modalIndex = ref<number | null>(null);
        const saveImages = (e: InputFile) => {
            [...e.target.files].forEach((el: File) => {
                data.value.photos.push(el);
                const reader = new FileReader();
                reader.readAsDataURL(el);
                reader.onload = e => {
                    if (e.target) photosURLs.value.push(e.target.result as string);
                };
            });
            e.target.value = "";
        };
        const deleteCertinImage = (index: number) => {
            photosURLs.value.splice(index, 1);
            data.value.photos.splice(index, 1);
        };
        //
        const changeImageIndex = (destination: "next" | "prev") => {
            if (typeof modalIndex.value === "object") return;
            if (destination === "next" && modalIndex.value < photosURLs.value.length - 1) modalIndex.value++;
            else if (destination === "prev" && modalIndex.value > 0) modalIndex.value--;
        };
        //
        return { data, saveImages, photosURLs, deleteCertinImage, modalIndex, changeImageIndex };
    }
});
</script>
