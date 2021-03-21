<template>
    <div class="img" :style="imgPath(offer, imgIndex)">
        <span class="status" :class="offer.status">{{ offer.status }}</span>
        <!--  -->
        <template v-if="offer.photos.length > 1">
            <button class="next" @click="() => changeImageIndex('next')">
                <font-awesome-icon icon="chevron-right"></font-awesome-icon>
            </button>
            <!--  -->
            <button class="previous" @click="() => changeImageIndex('prev')">
                <font-awesome-icon icon="chevron-left"></font-awesome-icon>
            </button>
        </template>
        <label>{{ imgIndex + 1 }} of {{ offer.photos.length }}</label>
        <!--  -->
        <!--  -->
        <!--  -->
        <BigImageModal :offer="offer" v-model:imgIndex="imgIndex" v-model:displayModal="displayModal"></BigImageModal>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Offer } from "@/@types/Offer";
import useManyOffer from "@/composable/offers/useManyOffers";
import useKeydown from "@/composable/useKeydown";
//
import BigImageModal from "./BigImageModal.vue";
//
export default defineComponent({
    components: { BigImageModal },
    props: {
        offer: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    setup(props) {
        const { imgPath } = useManyOffer;
        const imgIndex = ref<number>(0);
        const displayModal = ref<boolean>(false);
        //
        const changeImageIndex = (destination: "next" | "prev") => {
            if (!props.offer.photos) return;
            if (destination === "next" && imgIndex.value < props.offer.photos.length - 1) imgIndex.value++;
            else if (destination === "prev" && imgIndex.value > 0) imgIndex.value--;
        };
        //
        useKeydown([
            {
                key: "ArrowRight",
                fn: () => changeImageIndex("next")
            },
            {
                key: "ArrowLeft",
                fn: () => changeImageIndex("prev")
            },
            {
                key: "+",
                fn: () => (displayModal.value = true)
            }
        ]);
        //
        return { imgPath, imgIndex, displayModal, changeImageIndex };
    }
});
</script>
