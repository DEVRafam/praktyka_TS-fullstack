<template>
    <section id="contact" class="field">
        <h1 class="label">Photos:</h1>
        <input type="file" id="test" accept="image/x-png,image/jpeg" multiple style="display:none" ref="inp-photos" @change="saveImages" />
        <!--  -->
        <div class="img-wrap" v-for="(el, index) in photosURLs" :key="index">
            <img :src="el" />
            <button @click="() => deleteCertinImage(index)">Remove</button>
        </div>
        <!--  -->
        <button @click="$refs['inp-photos'].click()">Add photos</button>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useCreateOffer from "@/composable/offers/useCreateOffer";
import { InputFile } from "@/@types/general";
//
export default defineComponent({
    setup() {
        const { data, photosURLs } = useCreateOffer;
        const saveImages = (e: InputFile) => {
            [...e.target.files].forEach((el: File) => {
                data.value.photos.push(el);
                const reader = new FileReader();
                reader.readAsDataURL(el);
                reader.onload = e => {
                    if (e.target) photosURLs.value.push(e.target.result as string);
                };
            });
        };
        const deleteCertinImage = (index: number) => {
            photosURLs.value.splice(index, 1);
            data.value.photos.splice(index, 1);
        };
        //
        return { data, saveImages, photosURLs, deleteCertinImage };
    }
});
</script>
