// convert 12H fromat string type time to minute
const timeInMinute = (timeToConvert) => {
    let minute = parseInt(timeToConvert.slice(0, 2)) * 60 + parseInt(timeToConvert.slice(3, 5));
    minute += timeToConvert.slice(6, 8) === 'PM' ? 12 * 60 : 0;
    return minute;
}


// check if a class time overlap to any other class time
const timeOverlaped = (classTimeData, savedClassTimes) => {
    let startTimeAtMinute = timeInMinute(classTimeData.startTime);
    let endTimeAtMinute = timeInMinute(classTimeData.endTime);

    const overlapedTime = savedClassTimes.filter(({ startTime, endTime }) => {
        const startAt = timeInMinute(startTime);
        const endAt = timeInMinute(endTime);

        return startTimeAtMinute >= startAt && startTimeAtMinute <= startAt || endTimeAtMinute <= endAt && endTimeAtMinute <= endAt;
    })

    return overlapedTime;
}


// export all functions
module.exports = { timeInMinute, timeOverlaped };