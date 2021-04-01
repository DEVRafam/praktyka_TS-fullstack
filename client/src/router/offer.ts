import { authenticateGuard } from "./_guards";
import SingleOffer from "@/views/SingleOffer.vue";
import Following from "@/views/Following.vue";
import CreateOffer from "@/views/CreateOffer.vue";
import Management from "@/views/Management.vue";
//
export default [
    {
        path: "/offer/:slug",
        name: "SingleOffer",
        component: SingleOffer
    },
    {
        path: "/following",
        name: "Following",
        component: Following,
        beforeEnter: authenticateGuard
    },
    {
        path: "/offer/dealer/:id",
        name: "Management",
        component: Management,
        beforeEnter: authenticateGuard
    },
    {
        path: "/create-offer",
        name: "CreateOffer",
        component: CreateOffer,
        beforeEnter: authenticateGuard
    }
];
