#!/bin/sh

rm -rf ./react-admin-ui/src
rm -rf ./react-admin-ui/assets

mkdir -p ./react-admin-ui/assets ./react-admin-ui/src/reducers
cp -R ./assets/ ./react-admin-ui/assets/

cp -R ./src/actions/ ./react-admin-ui/src/actions/

cp -R ./src/components ./react-admin-ui/src/components
rm -rf ./react-admin-ui/src/components/App

cp -R ./src/pages ./react-admin-ui/src/pages
cp ./src/reducers/snackbar.js ./react-admin-ui/src/reducers/snackbar.js

cp -R ./src/utils ./react-admin-ui/src/utils
cp -R ./src/validate ./react-admin-ui/src/validate


cd ./react-admin-ui

rm -rf ./react-admin-ui/node_modules

npm publish
