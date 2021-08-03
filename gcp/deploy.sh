#!/bin/bash

ENV_FILE="${1:-.env}"

# load
source $ENV_FILE

# disply info
echo ""
echo "*******************************************"
echo "ENV_FILE=$ENV_FILE"
echo "FUNCTION_NAME=$FUNCTION_NAME"
echo "ENTRY_POINT=$ENTRY_POINT"
echo "RUNTIME=$RUNTIME"
echo "REGION=$REGION"
echo "TOPIC=$TOPIC"
echo "PROJECT_ID=$PROJECT_ID"
echo "ACCOUNT=$ACCOUNT"
echo "*******************************************"
echo "WEBHOOK_URL=$WEBHOOK_URL"
echo "SLACK_USERNAME=$SLACK_USERNAME"
echo "SLACK_ICON_EMOJI=$SLACK_ICON_EMOJI"
echo "SLACK_ICON_URL=$SLACK_ICON_URL"
echo "SLACK_CHANNEL=$SLACK_CHANNEL"
echo "SLACK_LINK_NAMES=$SLACK_LINK_NAMES"
echo "*******************************************"
echo ""


# build & deploy
npm run build && \
  gcloud functions deploy $FUNCTION_NAME \
  --account=$ACCOUNT \
  --runtime=$RUNTIME \
  --region=$REGION \
  --trigger-topic=$TOPIC \
  --project=$PROJECT_ID \
  --set-env-vars=WEBHOOK_URL=$WEBHOOK_URL,SLACK_USERNAME=$SLACK_USERNAME,SLACK_ICON_URL=$SLACK_ICON_URL,SLACK_CHANNEL=$SLACK_CHANNEL \
  --entry-point=$ENTRY_POINT