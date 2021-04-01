import { authenticateGuard } from "./_guards";
import CreateArticle from "@/views/articles/CreateArticle.vue";
//
export default [
    {
        path: "/create-article",
        name: "CreateOffer",
        component: CreateArticle,
        beforeEnter: authenticateGuard
    }
];
