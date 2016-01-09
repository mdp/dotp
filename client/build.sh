#!/bin/bash

cordova platform add ios
cordova platform add android
plugman install --platform ios --project ./platforms/ios --plugin https://github.com/phonegap/phonegap-plugin-barcodescanner.git
plugman install --platform android --project ./platforms/android --plugin https://github.com/phonegap/phonegap-plugin-barcodescanner.git
cordova build ios
