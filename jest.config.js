module.exports = {
  roots: ["<rootDir>/src"], // Ensure it includes 'test' directory
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "node",
};
