const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  await connectDB();
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
  }, 10000);

  test("Should register new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Amal",
      email: "amal1@test.com",
      password: "123456",
    });

    console.log(response,'lmmmm');

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("token");

    expect(response.body.email).toBe("amal1@test.com");
  }, 15000);
});
