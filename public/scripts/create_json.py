import ifcopenshell
import os
import json

def getChildrenOfType(ifcParentElement,ifcType):
    items=[]
    if type(ifcType) != list:
        ifcType=[ifcType]
    _getChildrenOfType(items,ifcParentElement,ifcType,0)
    return items

def _getChildrenOfType(targetList,element,ifcTypes,level):
    if (element.is_a('IfcSpatialStructureElement')):
        for rel in element.ContainsElements:
            relatedElements = rel.RelatedElements
            for child in relatedElements:
                _getChildrenOfType(targetList,child, ifcTypes, level + 1)
    if (element.is_a('IfcObjectDefinition')):
        for rel in element.IsDecomposedBy:
            relatedObjects = rel.RelatedObjects
            for child in relatedObjects:
                _getChildrenOfType(targetList,child, ifcTypes, level + 1)
    for typ in ifcTypes:
        if (element.is_a(typ)):
            targetList.append(element)

class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if type(o).__name__ == 'entity_instance':
            return o.to_string()
        return super().default(o)

ifc_folder = '../data/ifc'
json_folder = '../data/json'
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
                e_json["props"]["spaces"] = [s.GlobalId for s in getChildrenOfType(e, "IfcSpace")]
            
            general_json[e.GlobalId] = e_json

          
        file_path = os.path.join(json_folder, f"{fn.split('.')[0]}.json")

        with open(file_path, 'w') as json_file:
            json.dump(general_json, json_file,
                      cls=EnhancedJSONEncoder, indent=2)
