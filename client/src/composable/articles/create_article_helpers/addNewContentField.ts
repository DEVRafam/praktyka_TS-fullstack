import { CreateArticleBody, ArticleContentField, ArticleContentType } from "@/@types/articles";
//
export default (data: CreateArticleBody) => {
    return (type: ArticleContentType) => {
        const field: ArticleContentField = { type, value: "" };
        if (type === "mention_offer") {
            delete field.value;
            field.offer_id = null;
            field._offer_data = {};
        }
        if (type === "list") field.value = [""];
        if (type === "image") field.value = String(Date.now());
        //
        data.content.push(field);
        //
        setTimeout(
            () =>
                scroll({
                    behavior: "smooth",
                    top: document.body.scrollHeight,
                    left: 0
                }),
            1
        );
    };
};
