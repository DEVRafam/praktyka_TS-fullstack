<template>
    <header class="opinion-exists" :class="{ show: showForm }">
        <h1 class="label">My opinion</h1>
        <button class="show-form" @click="showForm = !showForm">Show</button>
        <!--  -->
        <div class="management-wrap">
            <div class="management-swap" :class="{ active: currentState === 'editing' }">
                <!--  -->
                <div class="management-item">
                    <button class="show-form" @click="handleEditClick">Edit</button>
                    <button class="delete" @click="handleDelete">Delete</button>
                    <button class="show-form" @click="showForm = !showForm">Hide</button>
                </div>
                <!--  -->
                <div class="management-item">
                    <button class="edit" @click="handleUpdate">Accept</button>
                    <button class="delete" @click="handleEditClick">Cancel</button>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Profile, ReviewAboutSelf } from "@/@types/user";
import { currentState, handleUpdate, handleDelete, showForm } from "@/composable/profile/useMyOpinion";
//
export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<Profile>,
            required: true
        },
        myOpinion: {
            type: [Object, String] as PropType<ReviewAboutSelf | "OPINION_DOES_NOT_EXIST">,
            required: true
        },
        modalValue: {
            type: Boolean as PropType<boolean>,
            required: true
        }
    },
    setup() {
        const handleEditClick = () => {
            currentState.value = currentState.value === "displaying" ? "editing" : "displaying";
        };
        //
        return { handleEditClick, currentState, handleUpdate, handleDelete, showForm };
    }
});
</script>
