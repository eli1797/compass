# compass

Hotter... hotter... colder... hotter...

Helping you find things

### Details

Using cordova for native mobile

Run on android with `ionic cordova run android -l` after following
[Android Setup](https://ionicframework.com/docs/installation/android)
and maybe [Running on Android](https://ionicframework.com/docs/building/android)

## Branching Structure

Create a personal branch

### Required Installations:

**Device Orientation**
(https://ionicframework.com/docs/native/device-orientation)

```
ionic cordova plugin add cordova-plugin-device-orientation
npm install @ionic-native/device-orientation
```

**Geolocation**
(https://ionicframework.com/docs/native/geolocation)

```
ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation
```

**Diagnostic**
(https://ionicframework.com/docs/native/diagnostic)

```
ionic cordova plugin add cordova.plugins.diagnostic
npm install @ionic-native/diagnostic
```

**Toast**
(https://ionicframework.com/docs/native/toast)

```
ionic cordova plugin add cordova-plugin-x-toast
npm install @ionic-native/toast
```

**AWS Amplify**
(https://aws-amplify.github.io/docs/)

```
npm install -g @aws-amplify/cli
amplify configure
npm install --save aws-amplify aws-amplify-angular
```

Followed these docs for setup:
(https://medium.com/@gerard.sans/build-your-first-full-stack-serverless-app-with-angular-and-aws-amplify-d2e4716de9bd)

Then ran

```
amplify init
```
