import * as functions from "firebase-functions";
import { notifySlack } from "./modules/slack";

// Set your deploy region
const REGION = "asia-northeast1";

export const notifyBuild = functions
  .region(REGION)
  .pubsub.topic("cloud-builds")
  .onPublish(notifySlack);
