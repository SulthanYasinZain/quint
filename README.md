


# LINE Bot with Vercel Serverless Functions  

This is a simple LINE bot that uses Vercel Serverless Functions to handle the webhook. The main logic is in `route.ts`, while helper functions (like the reply function) are stored in `lib/`.  

## 🚀 Features  
- Lightweight and easy to deploy  
- Uses **Vercel Serverless Functions** for hosting  
- Supports **basic command handling** (e.g., `!date`)  

## 📌 Setup Instructions  

1. **Clone this repository**  
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file and add your **LINE Channel Access Token**:  
   ```plaintext
   LINE_CHANNEL_ACCESS_TOKEN=your_token_here
   ```

4. **Deploy to Vercel**  
   ```bash
   vercel deploy
   ```

5. **Set your LINE webhook**  
   Go to your [LINE Developer Console](https://developers.line.biz/) and update the webhook URL:  
   ```
   https://your-vercel-app.vercel.app/api/webhook
   ```

## ⚠️ Common Issues  

### 1️⃣ **Cold Start Delay (Bot Not Responding Immediately)**  
A common problem is that Vercel’s serverless functions go to **sleep too quickly (<1 min)**. This causes a delay when calling commands like `!date`, as the bot may not respond on the first attempt.  

**Solution:**  
- Use **GitHub Actions** to ping the API every minute (keeps it warm).  
- Example `.github/workflows/keep-alive.yml`:  
  ```yaml
  name: Keep API Alive

  on:
    schedule:
      - cron: "*/1 * * * *"  # Run every 1 minute
    workflow_dispatch:  # Allows manual trigger

  jobs:
    keep-alive:
      runs-on: ubuntu-latest
      steps:
        - name: Ping API
          run: curl -I https://your-vercel-app.vercel.app/api/webhook
  ```

### 2️⃣ **401 Unauthorized (LINE API Error)**  
If the bot is not replying, check:  
- You correctly set `LINE_CHANNEL_ACCESS_TOKEN` in `.env.local`.  
- You are **sending the Bearer Token in Postman** when testing.  
- Your webhook URL is **correct and accessible**.  

## 💡 Contributing  
Feel free to **fork** this repo and add new features! PRs are welcome.  

## 📄 License  
This project is open-source and available under the **MIT License**.  
