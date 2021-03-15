import { onBeforeUnmount } from "vue";
//
type ClickEvent = {
    key: string;
    fn(): void;
};
export default (eventList: ClickEvent[]) => {
    const handle = (e: KeyboardEvent) => {
        eventList.forEach((singleEvent: ClickEvent) => {
            if (e.key === singleEvent.key) singleEvent.fn();
        });
    };
    //
    window.addEventListener("keydown", handle);
    onBeforeUnmount(() => {
        window.removeEventListener("keydown", handle);
    });
};
