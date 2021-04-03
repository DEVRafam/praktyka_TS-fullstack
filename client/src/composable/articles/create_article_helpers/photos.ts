import { ref } from "vue";
//
export const photos = ref<{ [key: string]: File }>({});
export const photosURLS = ref<{ [key: string]: string }>({});
//
export default { photos, photosURLS };
