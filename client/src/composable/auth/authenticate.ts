import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { RefreshTokenResponse, LocalStorageUser } from "@/@types/auth";
import { ref, computed, reactive } from "vue";
//
export const isDeepAuthenticated = ref<boolean>(false);
export const currentUser = reactive({} as LocalStorageUser & { id: number });
export const isAdmin = computed<boolean>(() => {
    if (isDeepAuthenticated.value) return currentUser.role === "ADMIN";
    else return false;
});
//
export const removeUserFormLocalStorage = () => {
    localStorage.setItem("user", JSON.stringify({}));
};
//
//
//
export const unauthenticate = () => {
    const user = localStorage.getItem("user");
    if (["{}", null].includes(user)) return true;
    else {
        const user: LocalStorageUser = JSON.parse(localStorage.getItem("user") as string);
        let userIsBad = false;
        ["name", "surname", "accessToken", "refreshToken", "email"].forEach(prop => {
            if (!Object.keys(user).includes(prop)) userIsBad = true;
        });
        //
        return userIsBad;
    }
};
//
export const authenticate = () => !unauthenticate();
//
export const deepAuthenticate = async () => {
    if (unauthenticate()) return false;
    try {
        const user = JSON.parse(localStorage.getItem("user") as string) as LocalStorageUser;
        const { accessToken, refreshToken } = user;
        const { data: feedback }: { data: RefreshTokenResponse } = await axios.post(`${API_ADDRESS}/api/auth/refresh-token`, { accessToken, refreshToken });
        // update access token
        if (feedback.accessToken) {
            user.accessToken = feedback.accessToken;
            //
            if (feedback.userData) {
                ["name", "surname", "email", "role", "role"].forEach(prop => {
                    // eslint-disable-next-line
                    (user as any)[prop] = (feedback.userData as any)[prop];
                    // eslint-disable-next-line
                    (currentUser as any)[prop] = (feedback.userData as any)[prop];
                });
                currentUser.id = feedback.userData.id;
                currentUser.accessToken = feedback.accessToken;
            }
            //
            isDeepAuthenticated.value = true;
            localStorage.setItem("user", JSON.stringify(user));
            //
            return true;
        } else {
            isDeepAuthenticated.value = false;
            removeUserFormLocalStorage();
            return false;
        }
    } catch (e) {
        isDeepAuthenticated.value = false;
        removeUserFormLocalStorage();
        return false;
    }
};
//
export const logout = async () => {
    if (!(await deepAuthenticate())) return location.reload();
    //
    try {
        const user = JSON.parse(localStorage.getItem("user") as string) as LocalStorageUser;
        const url = `${API_ADDRESS}/api/auth/logout`;
        const data = { refreshToken: user.refreshToken };
        const options = {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        };
        //
        await axios.post(url, data, options);
        removeUserFormLocalStorage();
        location.reload();
    } catch (e) {
        removeUserFormLocalStorage();
        location.reload();
    }
};
