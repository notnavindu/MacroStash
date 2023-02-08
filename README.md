# MacroStash

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
4. Go to the "Firestore" tab in your Firebase dashboard and "Create a database"
5. Paste the following security rules in the "Rules" tab

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	function hasAccount() {
    	return request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid));
    }

    match /{document=**} {
      allow read, write: if false; // other requests are handled by the admin sdk
    }

    match /events/{eventId} {
      allow read: if hasAccount();
    }

    match /projects/{projectId} {
      allow read, write: if hasAccount();
    }

    match /users/{userId} {
      allow read, write: if hasAccount();
    }

     match /pending_users/{userId} {
      allow read: if hasAccount();
    }
  }
}
```

6. Grab a cookie

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

1. After setting up your MacroStash instance, go to `yourdomain.vercel.app/projects` and create a new project
2. Open a project to view it's API endpoint
3. Send a POST request to the API endpoint to log events

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fnotnavindu%2FMacroStash&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
