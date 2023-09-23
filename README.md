# SPA-APEX
Single Page Application in Oracle Apex 23.1

Here is the list of files and there purpose:

| Name                     | Description                                                              |
|--------------------------|--------------------------------------------------------------------------|
|spa-js.js                 | This file is contains the necessary functions to manage the layout.      |
|spa-css.css               | This file contains necessary CSS styles.
|SampleApp.sql             | This is a sample applicaiton file. You can import it to see how it works.|


## Requirements

- Oracle Apex 23.1

## How to Install

First, download the following files:


### 1. spa-js.js
1. Donwload from gitHub.
2. Upload in Static Workspace Files(Application > Shared Components > Static Workspace Files) of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in (Application > Shared Components > User Interfaces > JavaScript > File URLs)

### 2. spa-css.css
1. Donwload from gitHub.
2. Upload in Static Workspace Files(Application > Shared Components > Static Workspace Files) of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in (Application > Shared Components > User Interfaces > CSS > File URLs)

### 3. Creating Page Template
1. Go to Application > Shared Components > Templates
2. Copy "Modal Dialog" as "spaDialog"
3. Scroll to "Dialog Initialization Code" section
4. Replace "apex.theme42.dialog" with "spaDialog"

## 📖 Usage
This technique can be used to develop a pretty SPA (Single Page Application) in Oracle Apex.
