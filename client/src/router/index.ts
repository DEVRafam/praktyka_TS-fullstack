import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Page404 from "@/views/404.vue";
import auth from "./auth";
//
const routes: Array<RouteRecordRaw> = [
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: Page404
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    ...auth
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
