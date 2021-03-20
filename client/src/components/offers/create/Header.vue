<template>
    <header id="main-header">
        <h1 class="label">Create an offer</h1>
        <button @click="handleAdd">Add</button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { deepAuthenticate, currentUser } from "@/composable/auth/authenticate";
import useCreateOffer from "@/composable/offers/useCreateOffer";
//
export default defineComponent({
    methods: {
        async handleAdd() {
            if (!(await deepAuthenticate())) return;
            const { uploading, data, errors, status, resetData } = useCreateOffer;
            //
            uploading.value = true;
            status.value = "pending";
            // prepare data
            const body = new FormData();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["title", "category", "description", "price", "country", "currency", "localization"].forEach(key => body.append(key, (data.value as any)[key]));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["contact", "advantages"].forEach(key => body.append(key, JSON.stringify((data.value as any)[key])));
            body.append("photos", JSON.stringify(data.value.photos.map((_, index) => `image-number-${index + ``}`)));
            data.value.photos.forEach((el, index) => body.append(`image-${index}`, el));
            //
            const { data: response } = await axios.post(`${API_ADDRESS}/api/offer`, body, {
                headers: {
                    Authorization: `Bearer ${currentUser.accessToken}`
                }
            });
            //
            if (response.result === "negative") {
                status.value = "negative";
                errors.value = response.errors;
            } else {
                this.$router.push({ path: `/offer/${response.slug}` });
                resetData();
            }
        }
    }
});
</script>
