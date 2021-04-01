<template>
    <div class="field image">
        <Manager :index="index" label="Image"></Manager>
        <!-- <img :src="photosURLS[field.value]"  /> -->
        <img :src="photosURLS[field.value]" style="width: 300px" />
        <input type="file" accept="image/x-png,image/jpeg" style="display:none" ref="inp-photos" @change="saveImage" />
        <div class="buttons-wrap">
            <button @click="$refs['inp-photos'].click()">{{ buttonMessage }}</button>
            <button @click="() => (modalIndex = true)">Zoom</button>
        </div>
        <!--  -->
        <!--  -->
        <!--  -->
        <Modal :modelValue="modalIndex" v-if="modalIndex" @update:modelValue="val => (modalIndex = val)">
            <div class="image-preview" :style="`background-image: url('${photosURLS[field.value]}')`"></div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import useCreateArticles from "@/composable/articles/useCreateArticles";
import { ArticleContentField } from "@/@types/articles";
import { InputFile } from "@/@types/general";
//
import Manager from "./_FieldManager.vue";
//
export default defineComponent({
    components: { Manager },
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
    mounted() {
        const { photosURLS } = useCreateArticles;
        if (!photosURLS.value[this.field.value as string]) (this.$refs["inp-photos"] as HTMLInputElement).click();
    },
    setup(props) {
        const { photos, photosURLS } = useCreateArticles;
        const modalIndex = ref<boolean>(false);
        //
        const buttonMessage = computed<string>(() => {
            return photos.value[props.field.value as string] ? "Change image" : "Add image";
        });
        const saveImage = (e: InputFile) => {
            const imageIndex = props.field.value as string;
            const image = e.target.files[0];
            if (!image) return;
            //
            photos.value[imageIndex] = image;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                if (e.target) photosURLS.value[imageIndex] = e.target.result as string;
            };
        };
        //
        return { buttonMessage, saveImage, photos, photosURLS, modalIndex };
    }
});
</script>
