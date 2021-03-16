<template>
    <header>
        <h1 class="label">My opinion</h1>
        <div class="management-wrap">
            <div class="management-swap" :class="{ active: currentState === 'editing' }">
                <!--  -->
                <div class="management-item">
                    <button class="edit" @click="handleEditClick">Edit</button>
                    <button class="delete" @click="handleDelete">Delete</button>
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
import { currentState, handleUpdate, handleDelete } from "@/composable/profile/useMyOpinion";
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
        }
    },
    setup() {
        const handleEditClick = () => {
            currentState.value = currentState.value === "displaying" ? "editing" : "displaying";
        };
        return { handleEditClick, currentState, handleUpdate, handleDelete };
    }
});
</script>
