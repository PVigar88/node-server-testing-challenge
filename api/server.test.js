const db = require("../data/dbConfig");
const server = require("./server");
const request = require("supertest");
const Resource = require("./resources/resources-model");

describe("server", () => {
  test("check if in testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("[POST] /resources", () => {
    it("creates a resource and returns it", async () => {
      const res = await request(server)
        .post("/resources")
        .send({ name: "Sheep" });

      expect(res.body).toMatchObject({ name: "Sheep" });
      expect(await resource.getById(res.body.id)).toMatchObject({
        name: "Sheep",
      });
    });
  });

  describe("[DELETE] /resources/:id", () => {
    it("deletes the resource if it exists", async () => {
      const resource = await Resource.insert({ name: "Sheep" });
      await request(server).delete(`/resources/${resource.id}`).expect(204);

      expect(await Resource.getById(resource.id)).toBeUndefined();
    });

    it(`returns a 404 if the resource doesn't exist`, async () => {
      return request(server)
        .delete("/resources/12345")
        .expect(404, { message: "resource not found" });
    });
  });
});
