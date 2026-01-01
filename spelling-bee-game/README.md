# 🐝 Spelling Bee Game

An interactive spelling bee game for kids with speech recognition and typing modes!

## Features

✨ **Three Difficulty Levels**
- Easy
- Medium  
- Hard

🎮 **Two Game Modes**
- ✍️ Type the spelling
- 🎙️ Speak the word

🏆 **Scoring System**
- Points for correct answers
- Difficulty multipliers
- Real-time feedback

## Quick Deploy to Vercel

### Step 1: Push to GitHub (Optional but recommended)

If you want to deploy with GitHub integration:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/spelling-bee-game.git
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: From GitHub (Recommended)**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Deploy"
5. Done! You'll get a live URL

**Option B: Direct Upload (Easiest)**
1. Go to https://vercel.com/new
2. Click "Continue with GitHub" or "Continue with Email"
3. Drag and drop this folder onto Vercel
4. Click "Deploy"
5. Done! You'll get a live URL

### Step 3: Access on iPhone

1. Get the URL from Vercel (something like `https://spelling-bee-game.vercel.app`)
2. Open Safari on iPhone
3. Paste the URL in the address bar
4. Tap the **Share button** (arrow pointing out)
5. Tap **"Add to Home Screen"**
6. Name it "Spelling Bee"
7. Tap **"Add"**

Now it will be on her home screen like a real app! 🎉

## Local Development

To run locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

```
spelling-bee-vercel/
├── components/
│   └── SpellingBeeGame.jsx    # Main game component
├── pages/
│   ├── _app.js                # App wrapper
│   └── index.js               # Home page
├── styles/
│   └── globals.css            # Global styles
├── package.json               # Dependencies
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind config
├── postcss.config.js          # PostCSS config
└── README.md                  # This file
```

## Technologies Used

- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Web Speech API** - Voice recognition
- **SpeechSynthesis API** - Text to speech

## Browser Support

Works best on:
- ✅ Chrome/Edge
- ✅ Safari (iOS 14.5+)
- ✅ Firefox
- ✅ Mobile browsers

## Features Breakdown

### 🎓 Word Lists
- 30 words total (10 per difficulty)
- All from Grade 2 curriculum
- With definitions

### 🎯 Gameplay
- Random word selection
- Real-time feedback
- Progress tracking
- Streak counter
- Score multipliers

### 🎙️ Speech Recognition
- Works on most modern browsers
- Mobile friendly
- Clear visual feedback

## Troubleshooting

**Speech recognition not working?**
- Use Chrome, Edge, or Safari (iOS)
- Check microphone permissions
- Try typing mode instead

**Not saving to home screen?**
- Make sure to use Safari (not Chrome) on iPhone
- The URL must be HTTPS (Vercel provides this)

## Need Help?

Check out:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

Happy spelling! 🐝✨
