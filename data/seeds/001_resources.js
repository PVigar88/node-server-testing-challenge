exports.seed = function (knex) {
  // Deletes ALL existing entries and resets ids
  return knex("resources")
    .truncate()
    .then(function () {
      return knex("resources").insert([
        { name: "sheep" },
        { name: "wood" },
        { name: "ore" },
        { name: "brick" },
      ]);
    });
};
