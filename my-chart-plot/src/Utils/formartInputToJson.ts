// This function return an array of string Json. 
export default function formartInputToJson(str: any) {

    let str1 = str.trim(); // clear "dirt"

    let array = str1.split('\n'); // divides the input into rows when it finds the '\n' '\n'

    for (let i = 0; i < array.length; i++) {
        array[i] = eval("(" + (array[i]) + ")");

    }

    return array;
}