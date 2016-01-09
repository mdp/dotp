#!/bin/bash

cd react-src
npm run build
cd ..
cordova run android --device
