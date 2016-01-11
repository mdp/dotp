#!/bin/bash

if [[ -n $(git status -s) ]]; then
  echo 'Uncommited changes, cannot publish'
  exit 1
fi

cd demo
npm i
npm run build
cd ..
cp -R demo/build/dotp/* pages/.
cd pages
git add .
git ci -m "Update gh-pages"
git push origin gh-pages
cd ..
git add pages
git ci -m "Update gh-pages submodule"
git push origin master

