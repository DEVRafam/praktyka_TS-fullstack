const categoriesList = [
    {
        val: "services",
        label: "Services",
        icon: "users"
    },
    {
        val: "automotive",
        label: "Automotive",
        icon: "car"
    },
    {
        val: "education",
        label: "Education",
        icon: "university"
    },
    {
        val: "sport",
        label: "Sport",
        icon: "football-ball"
    },
    {
        val: "fashion",
        label: "Fashion",
        icon: "tshirt"
    },
    {
        val: "electronic",
        label: "Electronic",
        icon: "tv"
    },
    {
        val: "real-estate",
        label: "Real estate",
        icon: "home"
    },
    {
        val: "job",
        label: "Job offer",
        icon: "handshake"
    },
    {
        val: "house-and-garden",
        label: "House and garden",
        icon: "tree"
    },
    {
        val: "computer-and-games",
        label: "Computer and games",
        icon: "gamepad"
    }
];
//
export const findLabel = (category: string) => {
    const result = categoriesList.find(target => target.val === category)?.label;
    return result;
};
//
const findIcon = (category: string) => {
    const result = categoriesList.find(target => target.val === category)?.icon;
    return result;
};
//
//
//
export default { categoriesList, findLabel, findIcon };
