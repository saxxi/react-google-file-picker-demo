# Google File Picker Demo with React

For this demo I've used ngrok as other competitors had some issues (?).

## Installation

1. Get a ngrok custom domain or accept the temporary assigned one

2. Setup google file picker in console.

  - Under "Credentials"

    - Create an "Api key"
      - Restriction on "Websites", specify the domain, eg. `https://[my-domain].ngrok-free.app`
      - API restrictions
        - Google Cloud Storage JSON API
        - Google Picker API
        - Google Cloud APIs

    - Create an entry under "OAuth 2.0 Client IDs"
      - Fill everything and here copy "Client ID" from "Additional information"

  - Under "OAuth consent screen"
    - Create a new consent
      - Use `[my-domain].ngrok-free.app` as Application home page
      - Use `[my-domain].ngrok-free.app` as Authorised domains
      - Use these as scopes
        - https://www.googleapis.com/auth/drive.readonly
        - https://www.googleapis.com/auth/userinfo.email
        - https://www.googleapis.com/auth/userinfo.profile
        - openid
      - Set test users until the app is published

## Run

```bash
# Terminal 1
PORT=3009 npm start

# Terminal 2
ngrok http --domain=[my-domain].ngrok-free.app 3009
```
