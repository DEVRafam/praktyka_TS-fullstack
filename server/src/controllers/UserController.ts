import { User } from "../services/Models";
import bcrypt from "bcrypt";
//
type DataToCreateNewUser = {
    user: {
        name: string; //
        surname: string;
        email: string;
        password: string;
    };
};
//
class UserController {
    // queries
    async getAll() {
        const user = JSON.parse(JSON.stringify(await User.findAll()));
        return user;
    }
    async getCertin(_: never, args: { id: number }) {
        const user = JSON.parse(JSON.stringify(await User.findOne({ where: { id: args.id } })));
        return user;
    }
    // mutations
    async addUser(_: never, args: DataToCreateNewUser) {
        try {
            const { password, name, email, surname } = args.user;
            const salt = await bcrypt.genSalt();
            const newPassword = await bcrypt.hash(password, salt);
            //
            await User.create({
                name,
                email,
                surname,
                password: newPassword,
            });
            //
            return 200;
        } catch (e) {
            return 500;
        }
    }
}
//
export default new UserController();
