import { Response } from "express";
import path from "path";
//
interface GetPhotoRequest {
    params: {
        section: string | undefined;
        folder: string | undefined;
        image: string | undefined;
    };
}
interface GetAvatarRequest {
    params: {
        image: string | undefined;
    };
}
//
class GetPhotoController {
    getImage(req: GetPhotoRequest, res: Response) {
        try {
            const { folder, image, section } = req.params;
            if (folder && image && section) {
                const imgPath = path.join(__dirname, "..", "..", "upload", section, folder, image);
                return res.sendFile(imgPath);
            }
            //
            else return res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
    //
    //
    //
    getAvatar(req: GetAvatarRequest, res: Response) {
        try {
            const { image } = req.params;
            if (image) {
                const imgPath = path.join(__dirname, "..", "..", "upload", "avatars", image);
                return res.sendFile(imgPath);
            }
            //
            else return res.sendStatus(404);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new GetPhotoController();
