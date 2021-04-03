import { Restriction } from "@/@types/general";
//
export interface Restrictions {
    title: Restriction;
    content: {
        header: Restriction;
        text: Restriction;
        listItem: Restriction;
    };
    tags: Restriction;
}
export const dataRestrictions: Restrictions = {
    title: { min: 3, max: 50 },
    content: {
        header: { min: 3, max: 150 },
        text: { min: 10, max: 2000 },
        listItem: { min: 10, max: 250 }
    },
    tags: { min: 3, max: 50 }
};
//
export default { dataRestrictions };
