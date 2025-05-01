import interpreter from "models/interpreter.js";

beforeEach(async () => {
  await interpreter.train();
});

describe("Generate answer", () => {
  describe("Reply with success", () => {
    describe("Greeting", () => {
      test("Olá! Tudo bem?", async () => {
        const answer = interpreter.generateAnswer("Tudo bem?");

        expect(answer).toBe("Ola tudo bem?");
      });
    });

    describe("Photo", () => {
      test("Manda foto ai!", async () => {
        const answer = interpreter.generateAnswer("Manda foto ai!");

        expect(answer).toBe("Não mando fotos!");
      });
    });

    describe("Link", () => {
      test("Vende conteúdo?", async () => {
        const answer = interpreter.generateAnswer("Vende conteúdo?");

        expect(answer).toBe("www.google.com");
      });
    });

    // describe("Não entendi", () => {
    //   test("Que dia é hoje", async () => {
    //     const answer = interpreter.generateAnswer("Sabor de pizza");

    //     expect(answer).toBe("Desculpe, nao entendi");
    //   });
    // });
  });
});
