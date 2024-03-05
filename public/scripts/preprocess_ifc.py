import ifcopenshell
import os
import shutil
import random
import json


def getChildrenOfType(ifcParentElement, ifcType):
    items = []
    if type(ifcType) != list:
        ifcType = [ifcType]
    _getChildrenOfType(items, ifcParentElement, ifcType, 0)
    return items


def _getChildrenOfType(targetList, element, ifcTypes, level):
    if (element.is_a('IfcSpatialStructureElement')):
        for rel in element.ContainsElements:
            relatedElements = rel.RelatedElements
            for child in relatedElements:
                _getChildrenOfType(targetList, child, ifcTypes, level + 1)
    if (element.is_a('IfcObjectDefinition')):
        for rel in element.IsDecomposedBy:
            relatedObjects = rel.RelatedObjects
            for child in relatedObjects:
                _getChildrenOfType(targetList, child, ifcTypes, level + 1)
    for typ in ifcTypes:
        if (element.is_a(typ)):
            targetList.append(element)


class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if type(o).__name__ == 'entity_instance':
            return o.to_string()
        return super().default(o)


data_folder = '../../data'

ifc_folder = os.path.join(data_folder, "ifc")
json_folder = os.path.join(data_folder, "json")

if os.path.exists(json_folder):
    shutil.rmtree(json_folder)

os.mkdir(json_folder)

for fn in os.listdir(ifc_folder):
    if fn.endswith(".ifc"):
        f = ifcopenshell.open(os.path.join(ifc_folder, fn))
        general_json = {}

        for e in f.by_type("IfcProduct"):
            e_json = {}
            e_json["props"] = e.get_info(recursive=False)

            e_json["psets"] = ifcopenshell.util.element.get_psets(
                e, psets_only=True)

            if e.is_a() == "IfcBuildingStorey":
                e_json["props"]["spaces"] = [
                    s.GlobalId for s in getChildrenOfType(e, "IfcSpace")]

            general_json[e.GlobalId] = e_json

        file_path = os.path.join(json_folder, f"{fn.split('.')[0]}.json")

        with open(file_path, 'w') as json_file:
            json.dump(general_json, json_file,
                      cls=EnhancedJSONEncoder, indent=2)

jsons_container = []

for fn in os.listdir(json_folder):
    jsons_container.append(
        json.load(open(os.path.join(json_folder, fn), 'r')))

ifc_info = dict(pair for d in jsons_container for pair in d.items())

ifctype2guids = {}
for k, v in ifc_info.items():
    ifc_type = v["props"]["type"]
    if ifc_type in ifctype2guids.keys():
        ifctype2guids[ifc_type].append(k)
    else:
        ifctype2guids[ifc_type] = [k]

guid2euid = {}
euid2guid = {}


pset_name = "PSet_Revit_Dimensions"
p_name = "Volume"

result = {}
for s in ifctype2guids["IfcSpace"]:

    try:
        if p_name in ifc_info[s]["psets"][pset_name]:
            c = ifc_info[s]["psets"][pset_name][p_name]
        else:
            c = 0

        c = c + random.randint(1, 500)

        result[s] = c
    except:
        result[s] = random.randint(1, 500)


with open(os.path.join(json_folder, "ifcInfo.json"), 'w') as json_file:
    json.dump(ifc_info, json_file, indent=2)

with open(os.path.join(json_folder, "ifctype2guids.json"), 'w') as json_file:
    json.dump(ifctype2guids, json_file, indent=2)

with open(os.path.join(json_folder, "energyData.json"), 'w') as json_file:
    json.dump(result, json_file, indent=2)
