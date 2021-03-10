import axios from "axios";
import { API_ADDRESS } from "@/composable/env";
import { authenticate } from "@/composable/auth/authenticate";
import { ref } from "vue";
import { JoiError } from "@/@types/joiError";
import { _login } from "@/composable/auth/useLogin";
import generateJoiMessage from "@/helpers/generateJoiMessage";
//
const name = ref<string>("Mareczek");
const surname = ref<string>("Mariunio");
const email = ref<string>("mario123@gmail.com");
const password = ref<string>("zaq123456");
const repeatPassword = ref<string>("zaq123456");
const errors = ref<JoiError[]>([]);
//
const nameErrorMessage = generateJoiMessage(errors, "name");
const surnameErrorMessage = generateJoiMessage(errors, "surname");
const emailErrorMessage = generateJoiMessage(errors, "email");
const passwordErrorMessage = generateJoiMessage(errors, "password");
const repeatPasswordErrorMessage = generateJoiMessage(errors, "repeat_password");
//
interface RegisterResponse {
    result: "positive" | "negative";
    errors?: JoiError[];
}
//
//
//
const handleRegister = async () => {
    if (authenticate()) return;
    //
    const { data }: { data: RegisterResponse } = await axios.post(`${API_ADDRESS}/api/auth/register`, {
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
        // eslint-disable-next-line
        repeat_password: repeatPassword.value
    });
    console.log(data);
    if (data.result === "negative") return (errors.value = data.errors as JoiError[]);
    //
    else {
        await _login({
            email: email.value,
            password: password.value
        });
    }
};
export default { name, email, password, surname, repeatPassword, handleRegister, nameErrorMessage, surnameErrorMessage, emailErrorMessage, passwordErrorMessage, repeatPasswordErrorMessage };
