import { notifySlack } from "./modules/slack";

export const notifyBuild = async (message: any) => {
  await notifySlack(message);
};
