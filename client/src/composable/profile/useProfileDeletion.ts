import axios from "axios";
import { ref, computed, reactive, toRefs } from "vue";
import { API_ADDRESS } from "@/composable/env";
import { profile, developDeletionConf, managementAccess } from "@/composable/profile/useProfile";
import { Profile } from "@/@types/user";
import { currentUser, deepAuthenticate } from "@/composable/auth/authenticate";
//
interface ConfirmationCredentials {
    email: string;
    password: string;
    repeat_password: string;
}
//
const data = reactive({
    email: "jebac_gorzen@gmail.com",
    password: "qwertyjebacgorzen",
    repeat_password: "qwertyjebacgorzen"
} as ConfirmationCredentials);
//
const displayConfirmButtonAccess = computed<boolean>(() => {
    const { email, password, repeat_password } = data;
    return !!(email && password && repeat_password == password);
});
//
const mainDisplay = ref(false);
const mainType = computed<"text" | "password">(() => (mainDisplay.value ? "text" : "password"));
const repeatDisplay = ref(false);
const repeatType = computed<"text" | "password">(() => (repeatDisplay.value ? "text" : "password"));
//
const handleDelete = async () => {
    if (!developDeletionConf.value || !managementAccess || !(await deepAuthenticate())) return;
    await axios.post(`${API_ADDRESS}/api/user/${(profile.value as Profile).id}/delete`, data, {
        headers: {
            Authorization: `Bearer ${currentUser.accessToken}`
        }
    });
    location.href = "/";
};
//
export default { developDeletionConf, mainDisplay, mainType, repeatDisplay, repeatType, displayConfirmButtonAccess, ...toRefs(data), handleDelete };
