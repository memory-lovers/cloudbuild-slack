import { IncomingWebhook, IncomingWebhookSendArguments } from "@slack/webhook";

const WEBHOOK_URL = process.env.WEBHOOK_URL || "";
const SLACK_USERNAME = process.env.SLACK_USERNAME;
const SLACK_ICON_EMOJI = process.env.SLACK_ICON_EMOJI;
const SLACK_ICON_URL = process.env.SLACK_ICON_URL;
const SLACK_CHANNEL = process.env.SLACK_CHANNEL;
const SLACK_LINK_NAMES = process.env.SLACK_LINK_NAMES;

const webhook = new IncomingWebhook(WEBHOOK_URL);

function createMessage(data: any): string {
  console.info(`data=${JSON.stringify(data, null, 2)}`);
  const status = data.status;
  const repoName = data.substitutions?.REPO_NAME;
  const branchName = data.substitutions?.BRANCH_NAME;
  const refName = data.substitutions?.REF_NAME;
  const shortSha = data.substitutions?.SHORT_SHA;
  const logUrl = data.logUrl;

  // skip cloud functions
  if (!repoName) return "";

  switch (status) {
    case "QUEUED":
    case "SUCCESS":
    case "FAILURE":
    case "INTERNAL_ERROR":
    case "TIMEOUT":
    case "CANCELLED":
      return [
        `${status}, repo: ${repoName}, branch: ${branchName}, ref: ${refName}, short SHA: ${shortSha}`,
        `${logUrl}`,
      ].join("\n");
    case "WORKING":
    default:
      return "";
  }
}

export async function notifySlack(message: any): Promise<void> {
  const body = message.data
    ? Buffer.from(message.data, "base64").toString()
    : null;
  if (!body) {
    console.log("body is null");
    return;
  }
  const data = JSON.parse(body);
  const text = createMessage(data);
  if (!text) {
    console.log(`${data.status} skipped`);
    return;
  }

  const sendArgs: IncomingWebhookSendArguments = {
    text: text,
  };
  if (!!SLACK_USERNAME) sendArgs.username = SLACK_USERNAME;
  if (!!SLACK_ICON_EMOJI) sendArgs.icon_emoji = SLACK_ICON_EMOJI;
  if (!!SLACK_ICON_URL) sendArgs.icon_url = SLACK_ICON_URL;
  if (!!SLACK_CHANNEL) sendArgs.channel = SLACK_CHANNEL;
  if (!!SLACK_LINK_NAMES) sendArgs.link_names = true;

  await webhook.send(sendArgs);
}
