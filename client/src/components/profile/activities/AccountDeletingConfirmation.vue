<template>
    <section id="account-deletion-confirmation" :class="{ develop: developDeletionConf }">
        <header class="main-header">
            <h1 class="label">Delete Confirmation</h1>
            <button @click="handleDelete" v-if="displayConfirmButtonAccess">Confirm!</button>
        </header>
        <div class="form">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <!--  -->
            <div class="form-group">
                <label for="password">Password:</label>
                <input :type="mainType" id="password" v-model="password" />
                <button @click="mainDisplay = !mainDisplay">
                    <!-- there is no other way i guess -->
                    <font-awesome-icon v-if="mainDisplay" icon="eye-slash" />
                    <font-awesome-icon v-else icon="eye" />
                </button>
            </div>
            <!--  -->
            <div class="form-group">
                <label for="repeatPassword">Repeat:</label>
                <input :type="repeatType" id="repeatPassword" v-model="repeat_password" />
                <button @click="repeatDisplay = !repeatDisplay">
                    <!-- there is no other way i guess -->
                    <font-awesome-icon v-if="repeatDisplay" icon="eye-slash" />
                    <font-awesome-icon v-else icon="eye" />
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useProfileDeletion from "@/composable/profile/useProfileDeletion";
//
export default defineComponent({
    setup() {
        const { developDeletionConf, mainDisplay, mainType, repeatDisplay, repeatType, handleDelete, email, password, repeat_password, displayConfirmButtonAccess } = useProfileDeletion;
        return { developDeletionConf, mainDisplay, mainType, repeatDisplay, repeatType, handleDelete, email, password, repeat_password, displayConfirmButtonAccess };
    }
});
</script>
