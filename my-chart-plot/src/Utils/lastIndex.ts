// This function return index of lattest start type event 
export default function lastIndex(array: any) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].type === 'start') {
            return i;
        }
    }
    // not found;
    return -1;
}