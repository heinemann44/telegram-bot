async function setWebhook() {
  const baseUrl = process.env.TELEGRAM_HOST;
  const token = process.env.TELEGRAM_TOKEN;
  const myWebhookUrl = `${process.env.MY_WEBHOOK_URL}/api/v1/webhook`;
  const completeUrl = `${baseUrl}/bot${token}/setWebhook?url=${myWebhookUrl}`;

  const response = await fetch(completeUrl);

  const responseBody = await response.json();

  if (responseBody.ok && responseBody.result) {
    console.log("Webhook set successfully");
    return;
  }

  throw new ServiceError("Failed to set webhook");
}

async function sendMessage(chatId, text) {
  const baseUrl = process.env.TELEGRAM_HOST;
  const token = process.env.TELEGRAM_TOKEN;
  const completeUrl = `${baseUrl}/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`;

  const response = await fetch(completeUrl);

  const responseBody = await response.json();

  if (responseBody.ok && responseBody.result) {
    console.log("Message sent successfully");
    return;
  }

  throw new ServiceError("Failed to send message");
}

const webhook = {
  setWebhook,
  sendMessage,
};

export default webhook;
