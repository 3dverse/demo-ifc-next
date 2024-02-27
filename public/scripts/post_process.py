import json
import os
import collections
import ifcopenshell


def guid_to_euid(guid):
    euid = ifcopenshell.guid.split(ifcopenshell.guid.expand(guid))
    euid = euid[1:-1]
    return euid


json_folder = '../data/json'
output_names = ["ifcInfo.json", "guid2euid.json",
                "euid2guid.json", "ifctype2guids"]
jsons_container = []

for fn in os.listdir(json_folder):
    if fn.endswith(".json") and fn not in output_names:
        print(fn)
        jsons_container.append(
            json.load(open(os.path.join(json_folder, fn), 'r')))

dd = dict(pair for d in jsons_container for pair in d.items())

ifctype2guids = {}
for k, v in dd.items():
    ifc_type = v["props"]["type"]
    if ifc_type in ifctype2guids.keys():
        ifctype2guids[ifc_type].append(k)
    else:
        ifctype2guids[ifc_type] = [k]

guid2euid = {}
euid2guid = {}

for guid in dd.keys():
    euid = guid_to_euid(guid)
    guid2euid[guid] = euid
    euid2guid[euid] = guid


with open(os.path.join(json_folder, "ifcInfo.json"), 'w') as json_file:
    json.dump(dd, json_file, indent=2)

with open(os.path.join(json_folder, "guid2euid.json"), 'w') as json_file:
    json.dump(guid2euid, json_file, indent=2)

with open(os.path.join(json_folder, "euid2guid.json"), 'w') as json_file:
    json.dump(euid2guid, json_file, indent=2)

with open(os.path.join(json_folder, "ifctype2guids.json"), 'w') as json_file:
    json.dump(ifctype2guids, json_file, indent=2)
