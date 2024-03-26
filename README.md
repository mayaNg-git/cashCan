CashCan's Seller Side

This repository contains source-code for the CashCan's seller side. To get more familiar what CashCan is and what tools we have used up to this stage you can either continue reading this documentation

## Users in CashCan
There are only two types of users in CashCan: **sellers** and **drivers**. This repository contains source code for seller side only. However, it also includes basic general pages and elements like Loading, Login, Register, Home pages, Dropdown Menu, etc.

## Installation

To start working on the project you need to have the following on your computer:
1. [Node 12 LTS](https://nodejs.org/en/download/)
2. [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) (optional, but very recommended)
3. [React Native](https://reactnative.dev/docs/environment-setup)
4. [Expo CLI](https://reactnative.dev/docs/environment-setup) (same link as React Native)
5. [Android Studio with AVD](https://developer.android.com/studio?gclid=CjwKCAiAh_GNBhAHEiwAjOh3ZHahg2NhAJ5BaWQuG5tSYLGU9GDWKsuWu2f2lGqeY2lcyu2Hi3m6WhoCqqoQAvD_BwE&gclsrc=aw.ds) if you're planning to run and test application using Android
6. [Xcode](https://developer.apple.com/xcode/) with [iOS simulator](https://developer.apple.com/library/archive/documentation/IDEs/Conceptual/iOS_Simulator_Guide/GettingStartedwithiOSSimulator/GettingStartedwithiOSSimulator.html) if you're planning to run and test application using iOS
7. [Visual Studio Code](https://code.visualstudio.com/) or any other preferred IDE
8. [Git](https://git-scm.com/downloads)

## Run the Application
After you have installed everything from the list above, you can run the application using instructions below:

1. Open your cmd (it is assumed that you are using Windows) and navigate to the `CashCan` folder. It is important to run scripts below from `CashCan` folder and not its parent.
2. Run the following script in your cmd

```Batchfile
yarn install
yarn start
```

3. After *a while*, expo should automatically open a new tab in your default browser. This tab is dedicated for dev tools and is usually located at `localhost:19002`. If that didn't happen, check your command line terminal. You should find a QR code and possible actions listed there when Metro Bundle is completed.
4. Open you Android emulator
5. You can run your application on Android by either pressing `A` on your keyboard while in the command line terminal or you can navigate to your dev tools tab and press "Run on Android emulator/simulator" button
6. You should now have your application up and running!

## Firebase
This application is using Firebase as its DBMS. If you are a student trying to get access to the Firebase part of the project — email your client and ask him to give you a role. 

### How to add members in Firebase
To add anyone to your Firebase's project, go to [https://console.firebase.google.com/](https://console.firebase.google.com/) and choose your project (in this case, it should be called Team-2-CashCan). At the top left you can find a gear icon. Press it and choose "Users and permissions". On this page you can find "Add member" button. Press it and enter desired email address and role you want to grant (it is recommended to grant either `Owner` or `Editor`). After clicking "Add member", an invitation should be sent. When person accepts it — they become a member of the project and can start development!

## Start Developing
You can fork this repository ([more about forking here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)) and use this repository as a base for your development. If you have never used Git before, it is recommended for you to checkout the [following video](https://youtu.be/USjZcfj8yxE). Additionally, you can watch this video about GitHub [here](https://youtu.be/nhNq2kIvi9s). 

The process for merging branches with master branch consists of the following steps:
```bash
git checkout master
git pull                   # get the latest version
git checkout <your branch> # put your branch's name here
git rebase master          # resolve any conflicts if there're any
git checkout -             # '-' means the last branch you're on, which is master
git merge -                # merge your branch
git log -1                 # you should see your commit on the top
git status                 # should only have 1 commit ahead
git push origin master     # push on GitHub
```
## Project's file structure
When you open the `CashCan` folder, you will see `components` folder. This folder contains all pages in the application. They have both front-end and back-end in one file  (i.e., HomePage.tsx has logic for active returns, as well as `ScrollView` that contains all active returns, if any.

There is also `App.tsx` in the `CashCan` folder. It contains most of the navigation logic (i.e., what to load when application is launched, if user is logged in, etc.).

The `common` folder contains common components that are used throughtout the project (i.e., `BodyText`).

All you should ever need to further the application is stored within `components`, `common` and `App.tsx`. If you want to add new page, you can use any script from `components` folder as a template.
