import { unauthenticate } from "@/composable/auth/authenticate";
//
// eslint-disable-next-line
export const unauthenticateGuard = (to: any, from: any, next: any) => {
    unauthenticate() ? next() : next("/");
};
// eslint-disable-next-line
export const authenticateGuard = (to: any, from: any, next: any) => {
    unauthenticate() ? next("/") : next();
};
