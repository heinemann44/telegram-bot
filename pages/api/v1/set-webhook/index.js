import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import telegram from "models/telegram.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandler);

async function postHandler(request, response) {
  await telegram.setWebhook();

  return response.status(200).json({});
}
