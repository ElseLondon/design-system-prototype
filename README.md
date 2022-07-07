# ELSE's Design System
A Prototype for ELSE's Design System

* Frontend form for User to submit changes to padding top, left, right, and bottom. Input stored in a Firestore DB
* Plugin code for a Figma file to fetch the latest changes to the above padding information, and apply them globally to all frames

# Frontend
FE: https://design-system-prototype-5a79b.ew.r.appspot.com/
* ensure correct credentials in `App.tsx`
* `npm run build`
* `gcloud init` & check that settings are as expected
* `gcloud app deploy`

# Backend
DB: https://console.firebase.google.com/u/0/project/design-system-prototype-5a79b/firestore/data/~2Fusers~2F6MU0LKOQPpG2k9nAbfBk

# Plugin
* `tsc` to compile plugin