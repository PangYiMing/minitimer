

// setInterval(() => {
//     let n = 0;
//     while (n++ < 1000000000);
// }, 0);
export function timer(totalDuration = 10 * 1000, setTime) {
    let requestRef = null;
    let startTime;
    let timerType = 'interval';
    let prevTime;
    let currentCount = totalDuration;
    let endTime;
    let timeDifference = 0; // 每1s倒计时偏差值，单位ms
    let interval = 1000;
    let nextTime = interval;
    const animate = (timestamp) => {
        if (prevTime !== undefined) {
            const deltaTime = timestamp - prevTime;
            if (deltaTime >= nextTime) {
                prevTime = timestamp;
                endTime = new Date().getTime();
                currentCount = currentCount - 1000;
                console.log("currentCount: ", currentCount / 1000);
                timeDifference = endTime - startTime - (totalDuration - currentCount);
                console.log(timeDifference);
                nextTime = interval - timeDifference;
                // 慢太多了，就立刻执行下一个循环
                // 慢到一定临界点，比正常循环的时间数稍微慢点，再执行下一个循环
                if (nextTime < 900) {
                    nextTime = 900;
                }
                console.log(`距离下一次执行渲染的还有：${nextTime}ms`);
                if (currentCount <= 0) {
                    currentCount = 0;
                    cancelTimer()
                    console.log(`累计偏差值： ${endTime - startTime - totalDuration}ms`);
                    setTime(formatDateTime(currentCount) + " 计时结束")
                    Notification.requestPermission(function (status) {
                        console.log(status); // 仅当值为 "granted" 时显示通知
                        var n = new Notification("title", { body: "notification body" }); // 显示通知
                        n.onshow = function () {
                            //   setTimeout(n.close.bind(n), 5000);
                            // alert('aaa')
                        }
                    });
                    // var n = new Notification("Hi!");
                    // n.onshow = function () {
                    //     setTimeout(n.close.bind(n), 5000);
                    // }
                    return;
                }
                setTime(formatDateTime(currentCount))
            }

        } else {
            // 第一次初始化
            prevTime = timestamp;
            endTime = startTime = new Date().getTime();
            setTime(formatDateTime((totalDuration + startTime) + - endTime))

        }
    };
    requestRef = startTimer()
    function startTimer() {
        let ref
        if (timerType === 'interval') {
            ref = setInterval(() => {
                animate(new Date().getTime())
            }, 10)
        } else {
            ref = requestAnimationFrame(animate);
        }
        return ref
    }
    function cancelTimer() {
        if (timerType === 'interval') {
            clearInterval(requestRef)
        } else {
            cancelAnimationFrame(requestRef);
        }
    }
}


/*
* 时间转换方法
* @param s  时间戳
* @return
*/
function formatDateTime(s) {
    let times = Math.floor(s / 1000)


    let DateTimes = "";

    // let day = (s / (60 * 60 * 24));
    let hours = Math.floor(times / (60 * 60));
    let minutes = Math.floor(times / 60 % 60);
    let seconds = times % 60;
    let mils = s % 1000;
    // if (day > 0) {
    //     DateTimes += day + "天前";
    //     return DateTimes;
    // }
    if (hours > 0) {
        DateTimes += (hours >= 10 ? hours : '0' + hours);
    } else {
        DateTimes += '00';
    }

    if (minutes > 0) {
        DateTimes += ':' + (minutes >= 10 ? minutes : '0' + minutes);
    } else {
        DateTimes += ':00';
    }

    if (seconds > 0) {
        DateTimes += ':' + (seconds >= 10 ? seconds : '0' + seconds);
    } else {
        DateTimes += ':00';
    }
    // if (mils > 0) {
    //     DateTimes += mils + "毫秒";
    // }
    return DateTimes;
}
