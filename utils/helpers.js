const mongoose = require('mongoose');

// convert 12H fromat string type time to minute
const timeInMinute = (timeToConvert) => {
    let minute = parseInt(timeToConvert.slice(0, 2)) * 60 + parseInt(timeToConvert.slice(3, 5));
    minute += timeToConvert.slice(6, 8) === 'PM' ? 12 * 60 : 0;
    return minute;
}


// check if a class time overlap to any other class time
const timeOverlaped = (classTimeData, savedClassTimes, currId) => {
    let startTimeAtMinute = timeInMinute(classTimeData.startTime);
    let endTimeAtMinute = timeInMinute(classTimeData.endTime);

    console.log(startTimeAtMinute, " ", endTimeAtMinute)

    const overlapedTime = savedClassTimes.filter(({ startTime, endTime, _id }) => {
        const startAt = timeInMinute(startTime);
        const endAt = timeInMinute(endTime);

        const id = String(_id);

        // console.log(id, " ", currId, typeof (id), typeof (currId), id !== currId);

        return (startTimeAtMinute > startAt && startTimeAtMinute < startAt || endTimeAtMinute < endAt && endTimeAtMinute < endAt) && id !== currId;
    })

    return overlapedTime;
}


const is_Start_Time_Greater_Then_Or_Equal_End_Time = (startTime, endTime) => {
    return timeInMinute(startTime) >= timeInMinute(endTime);
}

//   classTimeData = {startTime :'08:00 AM', endTime:'12:30 PM'};

//   const schedule = [
//     {startTime :'01:00 PM', endTime: '02:00 PM'},
//     {startTime :'08:00 AM', endTime:'12:30 PM'},
//     {startTime :'11:35 AM', endTime:'01:35 PM'},
//     {startTime :'10:35 AM', endTime:'11:35 AM'},
//   ];

//   const overlapedTime = classOverlap( classTimeData, schedule);
//   console.log(overlapedTime);

// export all functions
module.exports = { timeInMinute, timeOverlaped, is_Start_Time_Greater_Then_Or_Equal_End_Time };