import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import telegram from "models/telegram.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandler);

async function postHandler(request, response) {
  await telegram.sendMessage(
    request.body.message.chat.id,
    request.body.message.text
  );

  return response.status(200).json({});
}
