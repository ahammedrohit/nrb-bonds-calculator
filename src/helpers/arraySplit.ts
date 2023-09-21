import { PickingTasks } from "@interfaces/PrintExport";

export const pickingTasksSplit = (array: PickingTasks[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        res.push(array.slice(i, i + chunkSize))
    }
    return res;
}