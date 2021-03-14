import { User } from "@/@types/user";
import { API_ADDRESS } from "@/composable/env";
//
export const avatarPath = (user: User, genrateStyle = true): string => {
    const avatar = user.avatar ? `${API_ADDRESS}/api/photo/avatar/${user.avatar}` : "/images/default_user_avatar.jpg";
    return genrateStyle ? `background-image: url(${avatar})` : avatar;
};
//
export default { avatarPath };
