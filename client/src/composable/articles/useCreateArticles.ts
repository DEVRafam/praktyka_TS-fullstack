import { ref, watch } from "vue";
import { CreateArticleBody } from "@/@types/articles";
const LOCALSTORAGE_KEY = "create_article";
//
export const data = ref<CreateArticleBody>({
    title: "",
    mentioned_offers: [],
    content: []
});
//
export const photos = ref<{ [key: string]: File }>({});
export const photosURLS = ref<{ [key: string]: string }>({});
//
watch(
    data,
    val => {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
);
const articleFromLocalStorage: CreateArticleBody = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) as string);
if (articleFromLocalStorage) {
    data.value.title = articleFromLocalStorage.title;
    data.value.mentioned_offers = articleFromLocalStorage.mentioned_offers;
    data.value.content = articleFromLocalStorage.content;
}
//
export default { data, photos, photosURLS };
