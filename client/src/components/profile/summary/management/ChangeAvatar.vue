<template>
    <input type="file" accept="image/x-png,image/jpeg" @change="onInputChange" ref="input" style="display: none" id="avatar-input" />
    <button @click="$refs.input.click()" class="dark">Change avatar</button>
    <!--  -->
    <div class="change-avatar-confirmation" :class="{ active: newAvatar }">
        <h3>Confirm avatar's changes</h3>
        <div class="buttons">
            <button class="green" @click="confirm">Change</button>
            <button class="red" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { profile } from "@/composable/profile/useProfile";
import { API_ADDRESS } from "@/composable/env";
import { currentUser, deepAuthenticate } from "@/composable/auth/authenticate";
//
interface InputFile extends InputEvent {
    target: HTMLInputElement & {
        files: FileList;
    };
}
//
export default defineComponent({
    setup() {
        const newAvatar = ref();
        const oldAvatar = ref(profile.value?.avatar);
        //
        const onInputChange = (e: InputFile) => {
            newAvatar.value = e.target.files[0];
            //
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = result => {
                if (result.target && profile.value) profile.value.avatar = result.target.result as string;
            };
            //
        };
        //
        const cancel = () => {
            if (!profile.value) return;
            profile.value.avatar = oldAvatar.value;
            newAvatar.value = null;
            (document.getElementById("avatar-input") as HTMLInputElement).value = "";
        };
        //
        const confirm = async () => {
            if (!(await deepAuthenticate())) return;
            //
            const data = new FormData();
            data.append("avatar", newAvatar.value);
            const options = {
                "content-type": "multipart/form-data",
                headers: {
                    authorization: `Bearer ${currentUser.accessToken}`
                }
            };
            await axios.post(`${API_ADDRESS}/api/user/change-avatar?user=${profile.value?.id}`, data, options);
            location.reload();
        };
        //
        return { newAvatar, onInputChange, cancel, confirm };
    }
});
</script>
