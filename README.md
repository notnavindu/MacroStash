# MacroStash

🚧 Documentation is not complete

![MacroStash](https://socialify.git.ci/notnavindu/MacroStash/image?description=1&descriptionEditable=A%20tiny%20self%20hostable%20log%20stash&font=Inter&forks=1&issues=1&logo=https%3A%2F%2Fmacro-stash.vercel.app%2Flogo.png&name=1&pattern=Plus&pulls=1&stargazers=1&theme=Dark)

## Good for...

- Side Projects
- Cron-jobs
- Raspberry Pi event logging

## Setting up

### How to deploy

1. Log in to the [demo dashboard](https://macro-stash.vercel.app/events)
2. Click "Deploy for free" at the bottom right
3. Follow the instructions
4. Grab a cookie

### Environment Variables

You can find these values from your Firebase Console. Instructions on how to get these values are below.

These values are from your Firebase Config

- `PUBLIC_FIREBASE_APIKEY`
- `PUBLIC_FIREBASE_AUTHDOMAIN`
- `PUBLIC_FIREBASE_PROJECT_ID`
- `PUBLIC_FIREBASE_STORAGE_BUCKET`
- `PUBLIC_FIREBASE_MESSAGE_SENDER_ID`
- `PUBLIC_FIREBASE_APP_ID`

This is from the Firebase Service Account

- `FIREBASE_SERVICE_ACCOUNT` - Paste your entire Firebase service account `json` file here

### Firebase Setup

- Create a firebase project [here](https://console.firebase.google.com/). This project will be used to store all of your logs
- Click the "Web" button and fill in the details to register a new web app. Make sure to copy the firebaseConfig object. You will need this later
- Click on the little cog icon next to `Project Overview` in your Firebase console and go to `Project Settings`
- Go to the "Service accounts" tab
- Click "Generate new private key"

## Logging Events

TODO
