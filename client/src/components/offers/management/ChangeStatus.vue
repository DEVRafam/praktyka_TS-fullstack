<template>
    <div class="change-status-buttons">
        <button class="common" @click="hideOffer">{{ status === "HIDDEN" ? "Show" : "Hide" }} offer</button>
        <button class="sell" @click="markAsSold">{{ status === "SOLD" ? "Mark as unsold" : "Mark as sold" }}</button>
        <button class="common" @click="banOffer" v-if="isAdmin">{{ status === "BANNDER" ? "Unban" : "Ban" }}</button>
        <button class="delete" @click="() => deleteOffer(id)">Delete</button>
    </div>
</template>

<script lang="ts">
//
import { defineComponent, PropType } from "vue";
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
        }
    },
    setup(props) {
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
        return { isAdmin, markAsSold, hideOffer, banOffer, deleteOffer };
    }
});
</script>
