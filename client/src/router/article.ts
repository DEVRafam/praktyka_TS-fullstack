import { authenticateGuard } from "./_guards";
import CreateArticle from "@/views/articles/CreateArticle.vue";
//
export default [
    {
        path: "/create-article",
        name: "CreateArticle",
        component: CreateArticle,
        beforeEnter: authenticateGuard
    }
];
