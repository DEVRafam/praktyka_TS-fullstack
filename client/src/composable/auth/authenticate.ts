import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { RefreshTokenResponse, LocalStorageUser } from "@/@types/auth";
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
                user.name = feedback.userData.name;
                user.surname = feedback.userData.surname;
                user.avatar = feedback.userData.avatar;
                user.email = feedback.userData.email;
                user.role = feedback.userData.role;
            }
            //
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            removeUserFormLocalStorage();
            return false;
        }
        //
        return true;
    } catch (e) {
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
