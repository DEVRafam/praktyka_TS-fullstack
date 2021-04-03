import { CreateArticleBody } from "@/@types/articles";
//
export default (data: CreateArticleBody) => {
    return {
        resetData: () => {
            data = {
                title: "",
                mentioned_offers: [],
                content: [],
                tags: []
            };
        },
        resetContent: () => (data.content = [])
    };
};
