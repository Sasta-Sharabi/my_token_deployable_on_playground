# `my_token`

Steps to get this repo running in your device: 

## Step 1: Clone the repo

```bash
git clone https://github.com/Sasta-Sharabi/my_token.git
cd my_token
```

## Step 2: Install packages

In `/my_token` directory, run :

```bash
npm install
```

In `/my-token/src/my_token_frontend/` directory, run :

```bash
npm install
```

## Step 3: Running Locally

In `/my-token` , run :

```bash
dfx start --clean --background
dfx deploy
```
## Step 4: View the output

Open the my_token_frontend (Recommended) URL :
```bash
  Frontend canister via browser:
    internet_identity:
      - http://uxrrr-q7777-77774-qaaaq-cai.localhost:4943/ (Recommended)
      - http://127.0.0.1:4943/?canisterId=uxrrr-q7777-77774-qaaaq-cai (Legacy)
    my_token_frontend:
      - http://uzt4z-lp777-77774-qaabq-cai.localhost:4943/ (Recommended)
      - http://127.0.0.1:4943/?canisterId=uzt4z-lp777-77774-qaabq-cai (Legacy)
  Backend canister via Candid interface:
    internet_identity: http://127.0.0.1:4943/?canisterId=umunu-kh777-77774-qaaca-cai&id=uxrrr-q7777-77774-qaaaq-cai
    my_token_backend: http://127.0.0.1:4943/?canisterId=umunu-kh777-77774-qaaca-cai&id=u6s2n-gx777-77774-qaaba-cai
```

If you are making frontend changes, you can start a development server in new terminal with

```bash
npm start
```

