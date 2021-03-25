<template>
    <section id="login">
        <div class="box">
            <span class="circle"> <span class="space"></span><span class="space"></span> </span>
            <span class="circle"> <span class="space"></span><span class="space"></span> </span>
            <!--  -->
            <div class="content">
                <section class="form">
                    <h1>Login</h1>
                    <!--  -->
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="email" />
                    </div>
                    <!--  -->
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input :type="inputType" id="password" v-model="password" />
                        <button @click="showPassword = !showPassword">
                            <!-- there is no other way i guess -->
                            <font-awesome-icon v-if="showPassword" icon="eye-slash" />
                            <font-awesome-icon v-else icon="eye" />
                        </button>
                    </div>
                    <!--  -->
                    <button @click="login" class="send">Continoue</button>
                </section>
                <!--  -->
                <section class="errors">
                    <span v-if="passwordErrorMessage">{{ passwordErrorMessage }}</span>
                    <span v-if="emailErrorMessage">{{ emailErrorMessage }}</span>
                    <span v-if="credentialsErrorMessage">{{ credentialsErrorMessage }}</span>
                </section>
                <!--  -->
                <footer>
                    <router-link to="/register">Don't have account yet?</router-link>
                </footer>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import useLogin from "@/composable/auth/useLogin";
import { deepAuthenticate } from "@/composable/auth/authenticate";
//
export default defineComponent({
    setup() {
        // request logic
        const { password, email, errors, passwordErrorMessage, credentialsErrorMessage, emailErrorMessage } = useLogin;
        // form using tools
        const showPassword = ref<boolean>(false);
        const inputType = computed<string>(() => (showPassword.value ? "text" : "password"));
        //
        return { password, email, errors, showPassword, inputType, passwordErrorMessage, credentialsErrorMessage, emailErrorMessage };
    },
    methods: {
        async login() {
            const { handleLogin } = useLogin;
            await handleLogin();
            await deepAuthenticate();
        }
    }
});
</script>
