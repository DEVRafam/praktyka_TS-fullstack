import path from "path";
import { offerData } from "../assets/offer/data";
//
//
//
export const createOffer = async (token: string) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    };
    //
    return await (global as any).request
        .post("/api/offer")
        .set(headers) //
        .field("title", offerData.title)
        .field("category", offerData.category)
        .field("description", offerData.description)
        .field("price", offerData.price)
        .field("currency", offerData.currency)
        .field("contact", offerData.contact)
        .field("photos", offerData.photos)
        .field("localization", offerData.localization)
        .field("country", offerData.country)
        .field("advantages", offerData.advantages)
        .attach("sample_1", path.join(__dirname, "..", "assets", "offer", "sample_1.jpg"))
        .attach("sample_2", path.join(__dirname, "..", "assets", "offer", "sample_2.jpg"));
};
