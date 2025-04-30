describe("POST to /api/v1/set-webhook   ", () => {
  describe("Anonymous user", () => {
    describe("Seting webhook telegram", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/set-webhook",
          {
            method: "POST",
          }
        );

        const responseBody = await response.json();

        expect(response.status).toBe(200);
      });
    });
  });
});
