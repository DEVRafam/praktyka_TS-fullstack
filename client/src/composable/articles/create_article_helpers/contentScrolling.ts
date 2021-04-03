type direction = "TOP" | "BOTTOM";
/**
 * Vertical reposition in relation to certain content field
 */
export const contentFieldScroll = (index: number, direction: direction = "TOP") => {
    const fieldNode = [...document.querySelectorAll(".field")][index];
    const correction = direction === "TOP" ? window.scrollY - 250 : fieldNode.getBoundingClientRect().height - 350;
    setTimeout(() => {
        scroll({
            top: fieldNode.getBoundingClientRect().top + correction,
            behavior: "smooth",
            left: 0
        });
    }, 1);
};
//
export default { contentFieldScroll };
