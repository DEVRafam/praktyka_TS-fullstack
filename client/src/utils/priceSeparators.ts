import { Offer } from "@/@types/Offer";
//
export default (offer: Offer): string => {
    const addSeparators = (val: string): string => {
        return val
            .split("")
            .reverse()
            .map((el, index) => {
                return (index - 1) % 3 === 2 ? `${el} ` : el;
            })
            .reverse()
            .join("");
    };
    const result = String(offer.price);
    const fractionIndex = result.indexOf(".");
    if (fractionIndex === -1) return addSeparators(result);
    else {
        return addSeparators(result.slice(0, fractionIndex)) + `,${result.slice(fractionIndex + 1)}`;
    }
};
