# Demo IFC - 3D BIM/Digital Twin web application powered by 3dverse.

![Alt text](public/docs/demo_ifc.png?raw=true)

### Purpose
This repo aims to enable anyone to develop its own 3D BIM/Digital Twin web application supporting the IFC format.\
It's possible to either build on top of this repo or to get inspiration from it.
 
### Tech stack
The framework used is [Next.js](https://nextjs.org/) and the IFC functions have been developed using [IfcOpenShell](https://ifcopenshell.org/).

***The whole 3D rendering part of the application is handled by [3dverse](https://3dverse.com/), and the tools to manipulate/modify/query your 3D scene are provided by its [SDK](https://docs.3dverse.com/sdk/).***

## Getting started quickly with the default IFC file
### Prerequisites
- #### Node.js
https://nodejs.org/en/download/current

To run this repo locally, open your command line and paste:
```
git clone https://github.com/3dverse/demo-ifc-next
cd demo-ifc-next
npm install
npm run dev
```
This should open your browser. If it's not, open your browser and use http://localhost:3000/.
## Getting started with your own IFC file(s)
### Clone the repository
```
git clone https://github.com/3dverse/demo-ifc-next
```
### Prerequisites
- #### ifcopenshell-python
```
python -m pip install ifcopenshell
```
To test if your installation was successfull, run `python -c "import ifcopenshell;print(ifcopenshell.version)"`.
This should output something like `v0.7.0-f0e03c79d`.
- #### Node.js
https://nodejs.org/en/download/current


### 3dverse Console setup
- Create a 3dverse account at https://console.3dverse.com/
- Create a Project from the template **Empty** - *Start from scratch*
- On the left pane select *Asset Browser* and then from the file explorer you see on the screen, go to the *Public* folder
- Once in the public folder, upload your IFC file
You will see a *Main Scene* element appears. Click on it and then on the right pane click on the *Asset UUID* section. This will copy the UUID of your scene which will be of use for the next step. 

### Get access to your Project and your scene
To get access to your Project and your scene you need to get a token for all and pass it in your web application config file located at `src\utils\config.js`.
#### Scene UUID
If you already copied your Scene UUID you can skip the next instruction. Otherwise:
- Go to *Asset Browser* -> *Public* folder, and click on *Main Scene*. On the right pane, click on the *Asset UUID* section to copy it
- Edit this line with the Scene UUID you just copied: `export const mainSceneUUID = %YOUR_MAIN_SCENE_UUID%;`

#### Public token
- Go to *API Access* and copy your public token
- Edit this line with the Scene UUID you just copied: `export const publicToken = %YOUR_PUBLIC_TOKEN%;`

### Preprocess your IFC file
In `public\data\ifc`, delete the default IFC file, place your own IFC file, and run the following commands:
```
cd public\scripts
python preprocess_ifc.py
cd ..
```

 ### Run the application
```
npm install
npm run dev
```
This should open your browser. If it's not, open your browser and use http://localhost:3000/.
