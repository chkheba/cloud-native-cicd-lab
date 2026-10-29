
const { test } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../app");

test("GET /health returns OK", async () => {
  const response = await request(app)
    .get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "OK");
});

test("POST /tasks rejects an empty title", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({ title: "" });

  assert.equal(response.status, 400);
});

test("PUT /tasks rejects invalid completed status", async () => {
  const response = await request(app)
    .put("/tasks/1")
    .send({
      title: "Learn Docker",
      completed: "yes"
    });

  assert.equal(response.status, 400);
});
