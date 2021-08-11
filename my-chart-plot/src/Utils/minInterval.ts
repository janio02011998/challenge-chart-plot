// This function return a timestamp in format of minutes

export default function minInterval(timestamp: any) {
    let date = new Date(timestamp);
    let timeString = date.toISOString().substr(11, 5);
    return timeString;

}