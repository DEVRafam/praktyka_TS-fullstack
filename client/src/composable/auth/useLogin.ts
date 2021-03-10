import axios from "axios";
import { ref, computed } from "vue";
import { API_ADDRESS } from "@/composable/env";
import { authenticate } from "@/composable/auth/authenticate";
import { JoiError } from "@/@types/joiError";
import generateJoiMessage from "@/helpers/generateJoiMessage";
//
//
//
type Errors = JoiError[] | "credentials_do_not_match";
interface LoginResponse {
    result: "positive" | "negative";
    errors?: Errors;
    tokens?: {
        accessToken: string;
        refreshToken: string;
    };
    userData?: {
        id: number | string;
        name: string;
        surname: string;
        email: string;
        avatar: string;
    };
}
interface LoginBody {
    email: string;
    password: string;
}
//
//
//
const email = ref<string>("jebac_gorzen@gmail.com");
const password = ref<string>("qwertyjebacgorzen");
const errors = ref<Errors>([]);
//
const credentialsErrorMessage = computed<string | boolean>(() => {
    if (errors.value === "credentials_do_not_match") return "Either email or password is invalid!";
    else return false;
});
//
const emailErrorMessage = generateJoiMessage(errors, "email");
const passwordErrorMessage = generateJoiMessage(errors, "password");
//
export const _login = async (body: LoginBody) => {
    if (authenticate()) return;
    //
    const { data }: { data: LoginResponse } = await axios.post(`${API_ADDRESS}/api/auth/login`, body);
    if (data.result === "negative") {
        // eslint-disable-next-line
        return (errors.value = data.errors as any);
    } else {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: data.userData?.name,
                surname: data.userData?.surname,
                email: data.userData?.email,
                avatar: data.userData?.avatar,
                accessToken: data.tokens?.accessToken,
                refreshToken: data.tokens?.refreshToken
            })
        );
        location.reload();
    }
};
//
const handleLogin = async () => {
    await _login({
        email: email.value,
        password: password.value
    });
};
//
export default { password, email, handleLogin, errors, emailErrorMessage, passwordErrorMessage, credentialsErrorMessage, _login };
