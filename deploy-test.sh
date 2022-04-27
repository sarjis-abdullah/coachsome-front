# Build new code
cd /srv/www/test.coachsome.com/www/coachsome-nuxt-client || { echo "Deploy folder not found"; exit 1; }
export HOME=$PWD

# git cmd
git checkout staging || { echo "Git checkout failed"; exit 2; }
git stash || { echo "Git stash failed"; exit 3; }
git pull origin staging || { echo "Git pull failed"; exit 4; }

# npm cmd
npm install || { echo "Npm install failed"; exit 5; }
npm run build || { echo "Npm build failed"; exit 6; }

# pm2 cmd
pm2 stop ecosystem.config.js
pm2 delete ecosystem.config.js
pm2 start  || { echo "pm2 is not started properly ..."; exit 1; }

echo "Deployment steps end"