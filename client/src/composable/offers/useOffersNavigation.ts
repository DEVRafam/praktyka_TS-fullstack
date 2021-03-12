import { ref, computed, watch } from "vue";
//
// order
//
const layout = ref<string>(
    (() => {
        return localStorage.getItem("offersDisplayingMode") || "GRID";
    })()
);
watch(layout, val => {
    localStorage.setItem("offersDisplayingMode", val);
});
const router = ref();
const order = ref<string>("newest");
const category = ref<string>("");
//
// background managements
//
const background = ref<null | string>(null);
const displayBackgroundAccess = ref<boolean>(false);
const backgroundStyles = computed<string>(() => {
    return `background-image: url('/images/home/${category.value || background.value}.jpg')`;
});
const hoverInit = (val: string) => {
    background.value = val;
    displayBackgroundAccess.value = true;
};
//
//
export default { background, displayBackgroundAccess, hoverInit, backgroundStyles, layout, order, category, router };
