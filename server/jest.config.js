module.exports = {
    roots: ["./src/test"],
    transform: { "^.+\\.tsx?$": "ts-jest" },
    setupFilesAfterEnv: ["./src/test/setupFilesAfterEnv.ts"],
};
