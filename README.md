# Demo IFC - 3D BIM/Digital Twin web application powered by 3dverse.

### Purpose
This repo aims to enable anyone to develop its own 3D BIM/Digital Twin web application supporting the IFC format.\
It's possible to either build on top of this repo or to get inspiration from it.
 
### Tech stack
The framework used is Next.js and the IFC functions have been developed using IfcOpenShell.

***The whole 3D rendering part of the application is handled by 3dverse, and the tools to manipulate/modify/query your 3D scene are provided by its SDK.***

### 3dverse Console setup
- Create a 3dverse account at https://console.3dverse.com/
- Create a Project from the template **Empty** - *Start from scratch*
- On the left pane select *Asset Browser* and then from the file explorer you see on the screen, select the *Public* folder
- Once in the public folder, upload your IFC file

### Preprocess IFC data
```
cd public/scripts
python create_json.py
python post_process.py
```

### Getting started

```
npm install
npm run dev
```
