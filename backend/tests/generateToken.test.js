const jwt = require('jsonwebtoken');
const generateToken = require('../src/utils/generateToken');
const dotenv = require("dotenv");
dotenv.config();


describe("generateToken", ()=>{
    test("should generate valid JWT token", ()=>{
        const userId = "12345";
        const token = generateToken(userId);

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        expect(decoded.id).toBe(userId);
    })
})