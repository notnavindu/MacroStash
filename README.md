# MacroStash

A tiny self-hostable log stash.

## Good for...

- Side Projects
- Cron-jobs
- Raspberry Pi event logging

## Setting up

### How to deploy

Use this ⤵️

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnotnavindu%2FMacroStash&env=PUBLIC_FIREBASE_APIKEY,PUBLIC_FIREBASE_AUTHDOMAIN,PUBLIC_FIREBASE_PROJECT_ID,PUBLIC_FIREBASE_STORAGE_BUCKET,PUBLIC_FIREBASE_MESSAGE_SENDER_ID,PUBLIC_FIREBASE_APP_ID,FIREBASE_SERVICE_ACCOUNT&envDescription=Visit%20this%20link%20to%20find%20how%20to%20get%20these%20values&envLink=https%3A%2F%2Fgithub.com%2Fnotnavindu%2FMacroStash%23environment-variables&project-name=macro-stash&repository-name=macro-stash&demo-title=Macro%20Stash&demo-description=A%20tiny%20self-hostable%20event%20log&demo-url=http%3A%2F%2Fmacro-stash.vercel.app%2F)

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
