@echo off
chdir /d "C:\Users\Usuario\Desktop\bootcamp_superkode\backend\em-pulse"
git add frontend/src/components/ShareButtons.jsx frontend/src/components/index.js frontend/src/pages/Forum.jsx frontend/src/pages/NewsSection.jsx frontend/src/pages/AllNewsSection.jsx README.md
git commit -m "Agrega compartir en redes sociales (Twitter, Facebook, WhatsApp, LinkedIn, Email, copiar link)"
git push
pause
