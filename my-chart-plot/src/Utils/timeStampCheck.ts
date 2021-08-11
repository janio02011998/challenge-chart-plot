// check interval between time current and time (max and mim);
export default function timeStampCheck (timeInt: any, timeCurrent: any) {
    return ((timeCurrent >= timeInt[0]) && (timeCurrent <= timeInt[1]));
}