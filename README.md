# Slack Notifer for Cloud Build

Slack Notifier for Cloud Build

- [Incoming Webhook](https://slack.com/apps/A0F7XDUAZ--incoming-webhook-?tab=settings&next_id=0)

## How to Use

### Cloud Functions for Firebase

#### Setup Deploy Region

Default region is `asia-northeast1`.  
Please change it if you deploy to other rigion.

```typescript
// firebase/functions/src/index.ts

// Set your deploy region
const REGION = "asia-northeast1";
```

#### Setup environment configuration

```sh
$ firebase functions:config:set slack.webhook_url="YOUR_WEBHOOK_URL"

# optional customizations
$ firebase functions:config:set slack.username="..."
$ firebase functions:config:set slack.icon_emoji="..."
$ firebase functions:config:set slack.icon_url="..."
$ firebase functions:config:set slack.channel="..."
$ firebase functions:config:set slack.link_names="true"
```

Please see below for customizations.

- [Incoming Webhooks | Slack](https://api.slack.com/legacy/custom-integrations/messaging/webhooks#legacy-customizations)

Please see below for Environment Configuration in Firebase.

- [Environment configuration  |  Firebase](https://firebase.google.com/docs/functions/config-env)

#### Deploy to Cloud Function for Firebase

```sh
$ cd firebase

# deploy
$ npm run deploy
# or
$ firebase deploy --only functions:notifyBuild
```

### GCP Cloud Functions

#### Setup GCP ProjectId / Deploy Region

```json
// gcp/package.json
{
  // ...
  "config": {
    "region": "asia-northeast1",
    "gcp_project": "YOUR_PROJECT_ID"
    // ...
  }
  // ...
}
```

#### Setup Environment Variables

To use runtime environment variables, plaese setup `.env.yaml`.

```sh
cd gcp
cp sample.env.yaml .env.yaml
```

```yaml
WEBHOOK_URL: "YOUR_WEBHOOK_URL"

# optional customizations
SLACK_USERNAME: ""
SLACK_ICON_EMOJI: ""
SLACK_ICON_URL: ""
SLACK_CHANNEL: ""
SLACK_LINK_NAMES: ""
```

Please see below for Using Environment Variables in GCP.

[Using Environment Variables  |  Cloud Functions Documentation](https://cloud.google.com/functions/docs/configuring/env-var)

#### Deploy to GCP Cloud Function

```sh
$ cp gcp
$ npm run deploy

# or
$ npm run build
$ gcloud functions deploy notifySlackBuild \
    --runtime=nodejs14 \
    --region=asia-northeast1 \
    --trigger-topic=cloud-builds \
    --project=<YOUR_PROJECT_ID> \
    --env-vars-file=./.env.yaml \
    --entry-point=notifyBuild
```

### `deploy.sh` for GCP Cloud Functions

deploy.sh is utility tool to deploy functions.

```sh
$ cp gcp
$ cp sample_env .env
$ ./deploy.sh .env
```

## Licence

[MIT](https://github.com/memory-lovers/cloudbuild-slack/blob/master/LICENCE)

## Author

Memory Lovers, LLC.

- [GitHub](https://github.com/memory-lovers)
- [WebSite](https://memory-lovers.com/)
- [Twitter](https://twitter.com/MemoryLoverz))
