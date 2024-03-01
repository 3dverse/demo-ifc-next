# Demo - 3D BIM/Digital Twin web application powered by 3dverse.

### Purpose
This repo aims to enable anyone to develop its own 3D BIM/Digital Twin web application supporting the IFC format.\
It's possible to either build on top of this repo or to get inspiration from it.
 
### Tech stack
The framework used is Next.js and the IFC functions are developed thanks to IfcOpenShell.
The whole 3D part of the application is handled by 3dverse.

### 3dverse Console setup
- Create a 3dverse account at https://console.3dverse.com/
- Upload your IFC file

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
