cd client;
rm -rf .next out;
npm run build;
rm -rf ../public/*;
mv  ./out/* ../public;
rm -rf ./out/;
cd ..;
npm run build;
du -sh ./public;

# npm start
# git add .;
# git commit -am "heroku release" 
# git push heroku main;
