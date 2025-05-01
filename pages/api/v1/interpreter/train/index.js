import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import interpreter from "models/interpreter";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandler);

async function postHandler(request, response) {
  await interpreter.train();

  return response.status(200).json({});
}
