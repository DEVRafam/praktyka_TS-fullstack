import { ref } from "vue";
import { CreateArticleBody, ArticleContentType } from "@/@types/articles";
// helpers
import addNewContentFieldHelper from "./create_article_helpers/addNewContentField";
import localStorageManagement from "./create_article_helpers/localStorageManagement";
import resetsHelper from "./create_article_helpers/resets";
import DataRestrictionsHelper from "./create_article_helpers/restrictions";
import contentScrollingHelper from "./create_article_helpers/contentScrolling";
import photosHelper from "./create_article_helpers/photos";
//
// PREPARE DATA
//
export const data = ref<CreateArticleBody>({
    title: "",
    mentioned_offers: [],
    content: [],
    tags: []
});
//
// USE HELPERS
//
localStorageManagement(data.value);
export const { resetContent, resetData } = resetsHelper(data.value);
export const { dataRestrictions } = DataRestrictionsHelper;
export const { contentFieldScroll } = contentScrollingHelper;
export const { photos, photosURLS } = photosHelper;
export const addNewContentField = (type: ArticleContentType) => addNewContentFieldHelper(data.value)(type);
//
//
//
export default { data, photos, photosURLS, resetData, addNewContentField, contentFieldScroll, resetContent, dataRestrictions };
