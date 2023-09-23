# SPA-APEX
SPA-Apex make enables the Oracle Apex developers to build the Single Page Application in Oracle Apex 23.1.

Here is the list of files and their purposes:

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
2. Upload in Static Workspace Files `Application > Shared Components > Static Workspace Files` of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in `Application > Shared Components > User Interfaces > JavaScript > File URLs`

### 2. spa-css.css
1. Donwload from gitHub.
2. Upload in Static Workspace Files `Application > Shared Components > Static Workspace Files` of your Application.
3. Copy the Reference/Path
4. Add the Reference/Path in `Application > Shared Components > User Interfaces > CSS > File URLs`

### 3. Creating Page Template
1. Go to `Application > Shared Components > Templates`
2. Copy `Modal Dialog` as `spaDialog`
3. Scroll to **Dialog Initialization Code** section
4. Replace `apex.theme42.dialog` with `spaDialog`
5. Save the Template

All done!

## 📖 Usage
If you've completed the installation steps, you are ready to use it.

### Home Page
This is a Index/Home/Calling page that will remain visible all the time. 

#### To Create a Home Page
Create a Page with following `Page Properties` setting

| Property       | Value           |
|----------------|-----------------|
| `Page Mode`    | `Normal`        |
| `CSS Classes`  | `spa-home`      |


### SPA Dialogs
SPA Dialogs are the pages called over the Home page.

#### To Create a SPA Dialog Page
Create a Page with following `Page Properties` setting

| Property         | Value           |
|------------------|-----------------|
| `Page Mode`      | `Modal Dialog`  |
| `Dialog Template`| `spaDialog`     |

#### SPA Dialog Customization
You can further modify the layout of SPA Dialogs be adding one or more classes from the following list in `Page Prperties > Dialog > CSS Classes` section. Classes must be seprated by `space`

| Class Name                | Purpose                                                                                                    | 
|---------------------------|------------------------------------------------------------------------------------------------------------|
| `spa-noTitle`             | This class will remove the titlebar from SPA Dialogs. You've to add close button to close it.              |
| `spa-Draggable`           | This class will make the SPA dialog Draggable. By ddfault SPA Dialogs are not draggable.                   |
| `spa-Resizable`           | This class will make the SPA dialog Resizable. By ddfault SPA Dialogs are not Resizable.                   |
| `spa-showBreadcrumb`      | SPA Dialog will position after the `Breadcrumbs` area of Home Page.                                        |
| `spa-showFooter`          | SPA Dialog will end before the Footer, making it visible all the time.                                     |


### Author
**Farhan Akram**  
Sr. Oracle Apex Developer  
mrfarhanakram@outlook.com  
[Linkedln](https://www.linkedin.com/in/mrfarhanakram)
