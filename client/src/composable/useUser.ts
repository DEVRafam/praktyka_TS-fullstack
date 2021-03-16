import { User } from "@/@types/user";
import { API_ADDRESS } from "@/composable/env";
//
export const avatarPath = (user: User, genrateStyle = true): string => {
    const avatar = user.avatar ? `${API_ADDRESS}/api/photo/avatar/${user.avatar}` : "/images/default_user_avatar.jpg";
    return genrateStyle ? `background-image: url(${avatar})` : avatar;
};
//
export const computeReviews = (user: User, which: "reviews_about_self" | "reviews_about_others" = "reviews_about_self") => {
    const averge = (() => {
        // eslint-disable-next-line
        const { [which]: reviews } = user as any;
        if (!reviews) return null;
        let total = 0;
        reviews?.forEach((el: { score: number }) => (total += el.score as number));
        return (total / reviews.length).toFixed(2);
    })();
    //
    const starsAmount = user.reviews_about_self?.length ? Math.floor(Number(averge)) : 0;
    const halfStar = Number(averge) - starsAmount >= 0.5;
    //
    return { averge, starsAmount, halfStar };
};
export default { avatarPath };
``;
