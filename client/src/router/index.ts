import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { authenticateGuard } from "./_guards";
//
import Home from "../views/Home.vue";
import Page404 from "@/views/404.vue";
import SingleOffer from "@/views/SingleOffer.vue";
import Profile from "@/views/Profile.vue";
import Following from "@/views/Following.vue";
//
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
    {
        path: "/offer/:slug",
        name: "SingleOffer",
        component: SingleOffer
    },
    {
        path: "/profile/:id",
        name: "UserProfile",
        component: Profile
    },
    {
        path: "/following",
        name: "Following",
        component: Following,
        beforeEnter: authenticateGuard
    },
    ...auth
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
