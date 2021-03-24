<template>
    <header class="main-offer-header">
        <div class="level buttons" v-if="isDeepAuthenticated && (isOwner(offer) || isAdmin)">
            <button class="green" @click="markAsSold">{{ offer.status === "SOLD" ? "Mark as unsold" : "Mark as sold" }}</button>
            <button class="black" @click="hideOffer">{{ offer.status === "HIDDEN" ? "Show" : "Hide" }} offer</button>
            <button class="black" @click="banOffer" v-if="isAdmin">{{ offer.status === "BANNED" ? "Unban" : "Ban" }}</button>
            <button class="red" @click="displayModal = true">Delete</button>
        </div>
        <div class="level info">
            <div class="date-and-follow">
                <Follow :data="offer"></Follow>
                <div class="date-and-localization">
                    <strong class="color">{{ formatDate(offer.updatedAt) }},</strong>
                    <span>{{ offer.localization }},</span>
                    <strong>{{ offer.country }}</strong>
                </div>
            </div>
            <!--  -->
            <div class="price" v-if="offer.price">
                <span>{{ priceSeparators(offer) }}</span>
                <span class="currency">{{ offer.currency }}</span>
            </div>
        </div>
        <!--  -->
        <!--  -->
        <!--  -->
        <Modal v-model="displayModal" v-if="displayModal && isDeepAuthenticated" size="small">
            <template #header>
                <h2>Are you sure?</h2>
            </template>
            <!--  -->
            <template #default>
                <h3 class="info">
                    Delete offer <span class="color"> {{ offer.title }}</span>
                </h3>
                <div class="confirmation">
                    <button class="accept" @click="() => deleteOffer(offer.id, true)">Confirm</button>
                    <button class="discard" @click="displayModal = false">Discard</button>
                </div>
            </template>
            <!--  -->
        </Modal>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import formatDate from "@/utils/formatDate";
import priceSeparators from "@/utils/priceSeparators";
import { OfferStatus } from "@/@types/Offer";
import { isAdmin, isDeepAuthenticated } from "@/composable/auth/authenticate";
import { changeStatus, deleteOffer, isOwner } from "@/composable/offers/useOffersManagement";
import { offer } from "@/composable/offers/useSingleOffer";
//
import Follow from "./Follow.vue";
//
export default defineComponent({
    components: { Follow },
    setup() {
        const displayModal = ref<boolean>(false);
        const changeStatusLocally = (status: OfferStatus) => {
            offer.value.status = status;
        };
        //
        const markAsSold = async () => {
            const newStatus: OfferStatus = offer.value.status === "SOLD" ? "DEFAULT" : "SOLD";
            changeStatusLocally(newStatus);
            await changeStatus(offer.value.id, newStatus);
        };
        //
        const hideOffer = async () => {
            const newStatus: OfferStatus = offer.value.status === "HIDDEN" ? "DEFAULT" : "HIDDEN";
            changeStatusLocally(newStatus);
            await changeStatus(offer.value.id, newStatus);
        };
        //
        const banOffer = async () => {
            if (!isAdmin) return;
            const newStatus: OfferStatus = offer.value.status === "BANNED" ? "DEFAULT" : "BANNED";
            changeStatusLocally(newStatus);
            await changeStatus(offer.value.id, newStatus);
        };
        return { isDeepAuthenticated, isOwner, offer, formatDate, priceSeparators, isAdmin, markAsSold, hideOffer, banOffer, deleteOffer, displayModal };
    }
});
</script>
