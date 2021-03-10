import { RouteRecordRaw } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import { unauthenticateGuard } from "./_guards";
//
export default [
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: unauthenticateGuard
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        beforeEnter: unauthenticateGuard
    }
] as RouteRecordRaw[];
