cd client;
rm -rf .next;
npm run build;
cp -r ./out/ ../public;
cd ..;
npm run build;
# git add .;
# git commit -am "heroku release" 
# git push heroku main;
