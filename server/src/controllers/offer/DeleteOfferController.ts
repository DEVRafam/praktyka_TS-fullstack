import path from "path";
import fse from "fs-extra";
import { Response } from "express";
//
import { DeleteRequest } from "../../@types/Offers";
import { Offer, User } from "../../services/Models";
//
class DeleteOfferController {
    protected req: DeleteRequest;
    protected offer: any;
    protected uploadPath: string = path.join(__dirname, "..", "..", "..", "upload", "offers");
    //
    //helpers
    //
    protected async userIsAdmin(): Promise<boolean> {
        const user = await User.findOne({ where: { id: this.req.authorizedToken.id } });
        return user.role === "ADMIN";
    }
    protected userIsOwner(): boolean {
        return this.req.authorizedToken.id === this.offer.creator_id;
    }
    protected async handleDelete() {
        await fse.remove(path.join(this.uploadPath, this.offer.folder));
        await this.offer.destroy();
    }
    protected async findOffer() {
        this.offer = await Offer.findOne({ where: { id: this.req.params.id } });
        return this.offer;
    }
    //
    //
    //
    async main(req: DeleteRequest, res: Response) {
        try {
            this.req = req;
            if (!(await this.findOffer())) return res.sendStatus(404);
            //
            if (this.userIsOwner() || (await this.userIsAdmin())) {
                await this.handleDelete();
                return res.sendStatus(200);
            } else return res.sendStatus(401);
        } catch (e: any) {
            return res.sendStatus(500);
        }
    }
}
export default new DeleteOfferController();
