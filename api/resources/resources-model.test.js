const db = require("../../data/dbConfig");
const Resource = require("./resources-model");

describe("Resource model", () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });

  beforeEach(async () => {
    await db("resources").truncate();
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("insert()", () => {
    it("creates a new resource", async () => {
      const resource = await Resource.insert({ name: "sheep" });

      expect(resource).toMatchObject({ name: "sheep" });
    });
  });

  describe("remove()", () => {
    it("removes resource", async () => {
      const { id } = await Resource.insert({ name: "sheep" });

      await Resource.remove(id);

      expect(await Resource.getById(id)).toBeUndefined();
    });
  });
});
