<template>
    <div class="change-status-buttons">
        <button class="common" @click="hideOffer">{{ status === "HIDDEN" ? "Show" : "Hide" }} offer</button>
        <button class="sell" @click="markAsSold">{{ status === "SOLD" ? "Mark as unsold" : "Mark as sold" }}</button>
        <button class="common" @click="banOffer" v-if="isAdmin">{{ status === "BANNED" ? "Unban" : "Ban" }}</button>
        <button class="delete" @click="() => (displayModal = true)">Delete</button>
        <!--  -->
        <Modal v-model="displayModal" v-if="displayModal" size="small">
            <template #header>
                <h2>Are you sure?</h2>
            </template>
            <!--  -->
            <template #default>
                <h3 class="info">
                    Delete offer <span class="color"> {{ title }}</span>
                </h3>
                <div class="confirmation">
                    <button class="accept" @click="() => deleteOffer(id)">Confirm</button>
                    <button class="discard" @click="displayModal = false">Discard</button>
                </div>
            </template>
            <!--  -->
        </Modal>
    </div>
</template>

<script lang="ts">
//
import { defineComponent, PropType, ref } from "vue";
import { OfferStatus } from "@/@types/Offer";
import { changeStatus, data, deleteOffer } from "@/composable/offers/useOffersManagement";
import { isAdmin } from "@/composable/auth/authenticate";
//
export default defineComponent({
    props: {
        status: {
            type: String as PropType<OfferStatus>,
            required: true
        },
        id: {
            type: Number as PropType<number>,
            required: true
        },
        title: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props) {
        const displayModal = ref<boolean>(false);
        const changeStatusLocally = (status: OfferStatus) => {
            const currentElement = data.value?.offers.find(target => target.id == props.id);
            if (currentElement) {
                currentElement.status = status;
            }
        };
        //
        const markAsSold = async () => {
            const newStatus: OfferStatus = props.status === "SOLD" ? "DEFAULT" : "SOLD";
            changeStatusLocally(newStatus);
            await changeStatus(props.id, newStatus);
        };
        //
        const hideOffer = async () => {
            const newStatus: OfferStatus = props.status === "HIDDEN" ? "DEFAULT" : "HIDDEN";
            changeStatusLocally(newStatus);
            await changeStatus(props.id, newStatus);
        };
        //
        const banOffer = async () => {
            if (!isAdmin) return;
            const newStatus: OfferStatus = props.status === "BANNED" ? "DEFAULT" : "BANNED";
            changeStatusLocally(newStatus);
            await changeStatus(props.id, newStatus);
        };
        return { isAdmin, markAsSold, hideOffer, banOffer, deleteOffer, displayModal };
    }
});
</script>
