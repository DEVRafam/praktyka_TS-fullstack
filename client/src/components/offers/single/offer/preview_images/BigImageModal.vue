<template>
    <button class="preview" @click="$emit('update:displayModal', true)"><font-awesome-icon icon="expand"></font-awesome-icon></button>
    <!--  -->
    <Modal :modelValue="displayModal" v-if="displayModal" @update:modelValue="val => $emit('update:displayModal', val)">
        <!--  -->
        <template #header>
            <h1>{{ offer.title }}</h1>
        </template>
        <div class="image-preview" :style="imgPath(offer, imgIndex)"></div>
        <!--  -->
        <template #footer v-if="offer.photos.length > 1">
            <button class="previous" @click="() => changeImageIndex('prev')">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </button>
            <!--  -->
            <label>{{ imgIndex + 1 }} of {{ offer.photos.length }}</label>
            <!--  -->
            <button class="next" @click="() => changeImageIndex('next')">
                <font-awesome-icon icon="chevron-right"></font-awesome-icon>
            </button>
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Offer } from "@/@types/Offer";
import useManyOffer from "@/composable/offers/useManyOffers";
//
export default defineComponent({
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        },
        imgIndex: {
            type: Number as PropType<number>,
            required: true
        },
        displayModal: {
            required: true
        }
    },
    // eslint-disable-next-line vue/no-setup-props-destructure
    setup(props, { emit }) {
        const { imgPath } = useManyOffer;
        //
        const changeImageIndex = (destination: "next" | "prev") => {
            if (!props.offer.photos) return;
            if (destination === "next" && props.imgIndex < props.offer.photos.length - 1) {
                emit("update:imgIndex", props.imgIndex + 1);
            } else if (destination === "prev" && props.imgIndex > 0) emit("update:imgIndex", props.imgIndex - 1);
        };
        //
        return { imgPath, changeImageIndex };
    }
});
</script>
