import { computed } from "vue";
//
export default (index: number, collection: any) => {
    const _move = (secondItemIndex: number) => {
        const current = JSON.parse(JSON.stringify(collection[index]));
        const elementAbove = JSON.parse(JSON.stringify(collection[secondItemIndex]));
        collection[index] = elementAbove;
        collection[secondItemIndex] = current;
    };
    //
    const moveUp = () => {
        if (index !== 0) _move(index - 1);
    };
    const moveDown = () => {
        if (index !== collection.length - 1) _move(index + 1);
        //
    };
    const moveUpAccess = computed<boolean>(() => index !== 0);
    const moveDownAccess = computed<boolean>(() => index !== collection.length - 1);
    //
    return { moveUp, moveDown, moveUpAccess, moveDownAccess };
};
