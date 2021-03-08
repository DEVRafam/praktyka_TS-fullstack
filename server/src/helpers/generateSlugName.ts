export default (word: string): string => {
    const letters = {
        ą: "a",
        ä: "a",
        ę: "e",
        ż: "z",
        ź: "z",
        ó: "o",
        ö: "o",
        ł: "l",
        ć: "c",
        ń: "n",
        ś: "s",
        ü: "u",
        ß: "b",
        _: "-",
        "#": "-",
        "%": "-",
        "?": "-",
        " ": "-",
    };
    //
    let result = word.toLowerCase().split("");
    result.forEach((letter, index) => {
        if (Object.keys(letters).includes(letter)) {
            result[index] = (letters as any)[letter];
        }
    });
    //
    return result.join("") + Date.now();
};
