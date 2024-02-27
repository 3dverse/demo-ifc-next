import os
import json
import random

json_folder = '../data/json'

ifc_types = json.load(open(os.path.join(json_folder,"ifctype2guids.json"),"r"))
ifc_info = json.load(open(os.path.join(json_folder,"ifcInfo.json"),"r"))

pset_name = "PSet_Revit_Dimensions"
p_name = "Volume"

result = {}
for s in ifc_types["IfcSpace"]:
    print(s)
    if p_name in ifc_info[s]["psets"][pset_name]:
        print(ifc_info[s]["psets"][pset_name][p_name])
        c = ifc_info[s]["psets"][pset_name][p_name]
    else:
        c = 0
    
    c = c + random.randint(1, 500)
    
    result[s] = c

with open(os.path.join(json_folder,"energyData.json"), 'w') as json_file:
    json.dump(result, json_file, indent=2)

