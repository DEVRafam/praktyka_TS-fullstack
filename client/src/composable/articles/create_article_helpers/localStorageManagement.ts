import { watch } from "vue";
import { CreateArticleBody } from "@/@types/articles";
//
const LOCALSTORAGE_KEY = "create_article";
//
export default (data: CreateArticleBody) => {
    //
    // save changes in LS
    //
    watch(
        data,
        val => {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(val));
        },
        { deep: true }
    );
    //
    // check if article data expists in LS and if does use it
    //
    const articleFromLocalStorage: CreateArticleBody = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) as string);
    if (articleFromLocalStorage) {
        data.title = articleFromLocalStorage.title;
        data.mentioned_offers = articleFromLocalStorage.mentioned_offers;
        data.content = articleFromLocalStorage.content;
    }
};
