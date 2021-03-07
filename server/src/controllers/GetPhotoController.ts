import { Response } from "express";
import path from "path";
//
interface GetImageRequest {
    params: {
        section: string | undefined;
        folder: string | undefined;
        image: string | undefined;
    };
}
//
class GetPhotoController {
    getImage(req: GetImageRequest, res: Response) {
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
}
export default new GetPhotoController();
