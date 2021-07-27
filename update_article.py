import os
import re
import json
path1 = "./article/"
json1 = []
for path, _, files in os.walk(path1):
    for f in files:
        with open(os.path.join(path, f), "r", encoding="UTF-8") as file:
            content = file.read()
            title = re.sub("TITLE: ", "", re.search(pattern=r"TITLE:.+", string=content).group(0))
            preview = re.sub("PREVIEW: ", "", re.search(pattern=r"PREVIEW:.+", string=content).group(0))[:100]
            createdon = re.sub("CREATED_ON: ", "", re.search(pattern=r"CREATED_ON:.+", string=content).group(0))
            json1.append({
                "title": title,
                "preview_text": preview,
                "created_on": createdon,
                "link": os.path.join(path, f)
            })
with open("./article.json", "w", encoding="UTF-8") as json_data:
    json.dump(json1, json_data, indent=4)