import request from "supertest";
import { app } from "../../app";
import { beforeAll, describe, expect, it } from "@jest/globals";
import { initializeDataSource } from "../../common/database";

// ! Please replace token if expires
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOWE5NjlhZi1jYjZmLTRjOTUtYWU3OC0wNDAwZWMwZDU0NzgiLCJlbWFpbCI6ImJla0BnbWFpbC5jb20iLCJpYXQiOjE3MjgyODAzMjAsImV4cCI6MTcyODI4NzUyMH0.0MEQb_KbFmYL43pYGIINzQXml7jzhmGfJbaborKEOjI";

beforeAll(async () => {
  await initializeDataSource();
});

describe("Blog controller tests: ", () => {
  it("should return 401", async () => {
    const response = await request(app)
      .post("/blogs")
      .set("Content-Type", "application/json")
      .send({
        title: "blog title",
        content: "something",
        tags: ["dkfd", "dfldjfkd"],
      });

    expect(response.status).toBe(401);
  });

  it("should create new blog", async () => {
    const reqBlog = {
      title: "Blog title",
      content: "some random contennt",
      tags: ["new ", "blog", "test"],
    };
    const response = await request(app)
      .post("/blogs")
      .set("Authorization", "Bearer " + authToken)
      .set("Content-Type", "application/json")
      .send(reqBlog);

    expect(response.status).toBe(201);
  });
});
