const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.test",
});

beforeAll(async () => {
  await mongoose.connect(
    process.env.TEST_MONGO_URI
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API", () => {
  test("Should fail with invalid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "wrong@test.com",
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);

  },10000);
});
