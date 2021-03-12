<template>
    <section class="management">
        <button class="delete" @click="displayModal = true">DELETE</button>
        <!--  -->
        <Modal v-model="displayModal" v-if="displayModal" size="small">
            <template #header>
                <h2>Are you sure?</h2>
            </template>
            <!--  -->
            <template #default>
                <h3 class="info">
                    Delete offer <span class="color"> {{ data.title }}</span>
                </h3>
                <div class="confirmation">
                    <button class="accept" @click="handleDelete">Confirm</button>
                    <button class="discard" @click="displayModal = false">Discard</button>
                </div>
            </template>
            <!--  -->
        </Modal>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Offer } from "@/@types/Offer";
import useManyOffers from "@/composable/offers/useManyOffers";
//
export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Offer>,
            required: true
        }
    },
    setup(props) {
        const { deleteOffer } = useManyOffers;
        const displayModal = ref<boolean>(false);
        const handleDelete = async () => await deleteOffer(props.data);
        //
        return { displayModal, handleDelete };
    }
});
</script>
