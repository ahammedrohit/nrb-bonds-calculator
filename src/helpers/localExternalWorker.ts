const key = "ExternalWorkers";

export function getExternalWorkersFromLocal() {
    const t = localStorage.getItem(key);
    if (t) {
        return JSON.parse(t);
    }
    return [];
}


export function setExternalWorkersToLocal(value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}