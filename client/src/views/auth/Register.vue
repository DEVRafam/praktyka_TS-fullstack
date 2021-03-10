<template>
    <section id="register">
        <div class="box">
            <span class="circle"> <span class="space"></span><span class="space"></span> </span>
            <span class="circle"> <span class="space"></span><span class="space"></span> </span>
            <!--  -->
            <div class="content">
                <section class="form">
                    <h1>Register</h1>
                    <!--  -->
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" v-model="name" />
                    </div>
                    <!--  -->
                    <div class="form-group">
                        <label for="surname">Surname:</label>
                        <input type="text" id="surname" v-model="surname" />
                    </div>
                    <!--  -->
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
                        <input :type="repeatType" id="repeatPassword" v-model="repeatPassword" />
                        <button @click="repeatDisplay = !repeatDisplay">
                            <!-- there is no other way i guess -->
                            <font-awesome-icon v-if="repeatDisplay" icon="eye-slash" />
                            <font-awesome-icon v-else icon="eye" />
                        </button>
                    </div>
                    <!--  -->
                    <button @click="handleRegister" class="send">Continoue</button>
                </section>
                <!--  -->
                <section class="errors">
                    <span v-if="nameErrorMessage">{{ nameErrorMessage }}</span>
                    <span v-else-if="surnameErrorMessage">{{ surnameErrorMessage }}</span>
                    <span v-else-if="emailErrorMessage">{{ emailErrorMessage }}</span>
                    <span v-else-if="passwordErrorMessage">{{ passwordErrorMessage }}</span>
                    <span v-else-if="repeatPasswordErrorMessage">{{ repeatPasswordErrorMessage }}</span>
                    <br v-else />
                </section>
                <!--  -->
                <footer>
                    <router-link to="/login">Already have account?</router-link>
                </footer>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import useRegister from "@/composable/auth/useRegister";
//
export default defineComponent({
    setup() {
        // request logic
        const { name, email, password, surname, repeatPassword, handleRegister, nameErrorMessage, surnameErrorMessage, emailErrorMessage, passwordErrorMessage, repeatPasswordErrorMessage } = useRegister;
        // form using tools
        const mainDisplay = ref(false);
        const mainType = computed<"text" | "password">(() => (mainDisplay.value ? "text" : "password"));
        const repeatDisplay = ref(false);
        const repeatType = computed<"text" | "password">(() => (repeatDisplay.value ? "text" : "password"));
        //
        return { name, email, password, surname, repeatPassword, handleRegister, nameErrorMessage, surnameErrorMessage, emailErrorMessage, passwordErrorMessage, repeatPasswordErrorMessage, mainDisplay, mainType, repeatDisplay, repeatType };
    }
});
</script>
