export function mapToJson(map) {
    const jsonObj = {};
    for (const [key, value] of map) {
        if (value instanceof Map) {
            jsonObj[key] = mapToJson(value); 
        } else {
            jsonObj[key] = value;
        }
    }
    return JSON.stringify(jsonObj);
}

export function jsonToMap(json) {
    const map = new Map();
    for (const [key, value] of Object.entries(JSON.parse(json))) {
        map.set(key, value);
    }
    return map;
}