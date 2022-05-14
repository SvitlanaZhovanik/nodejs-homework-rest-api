// const request = require("supertest");
// const app = require("../../app");

// describe("Test the login path", () => {
//   it("It should response the POST method return status 200", async (done) => {
//     const response = await request(app)
//       .post("/api/users/login")
//       .send("email=Cat@i.ua", "password=123456");
//     expect(response.status).toBe(200);
//     expect(response.body.token).toBe(true);
//     expect(response.body.user).toBe({ email: String, subscription: String });
//     done();
//   });
// });
