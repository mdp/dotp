#!/bin/bash

cd react-src
npm run build
cd ..
cordova run ios --device
