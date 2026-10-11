# Catch the Cat — Retro Pixel Arcade Game 🐾

A cozy retro pixel arcade game inspired by pixel-art aesthetics. Test your reflexes trying to catch an agile cat wandering around a cozy bedroom!

## ✨ Features

- **Pixel-Art Aesthetic**: Hand-crafted SVG pixel cat with 4 customizable skins (Midnight, Snowball, Smokey, Marmalade) and a top-down 3/4 bedroom background.
- **Dynamic Animations**: Walking paws, tail wag, blinking eyes, cozy loaf sleep state, and surprised catch reactions.
- **Competitive Difficulty Curve**:
  - Cat shrinks in size and speeds up as your score increases.
  - Hover dodges (up to 75% dodge chance on INSANE).
  - Miss penalty breaks combo streaks.
  - Accuracy tracking & 6 ranking tiers (D through S+).
- **Tactical Nap & Sneak Attack**: Cat takes cozy naps on the floor — tap it while sleeping for a **+2 Sneak Attack Bonus**!
- **Hiding Mini-Game**: If you don't catch the cat before it wakes up, it bolts into hiding behind bedroom furniture (bed, desk, bookshelf, curtain). Tap the furniture to search!
- **Zero-Dependency 8-Bit Audio**: Synthesized 8-bit sound effects using the Web Audio API with a one-click mute toggle.
- **Friendly Ghost Easter Egg**: Tap the little ghost buddy in the room for a cheer and +2s bonus time!
- **Zero-Scroll Viewport**: Fits phones, tablets, and laptops seamlessly with touch-action lock.

## 🛠️ Tech Stack

- **React 19**
- **Vite 8**
- **Vanilla CSS** with modern viewport units (`dvh`)
- **Web Audio API**

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

## 🌐 Deploying to GitHub Pages

1. Create a new repository on [GitHub](https://github.com/new) named `catch-the-cat`.
2. Push your code:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/catch-the-cat.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! The included `.github/workflows/deploy.yml` workflow will automatically build and publish your game to `https://<YOUR-USERNAME>.github.io/catch-the-cat/`.
