function getTimeString(time){
    const hour = parseInt(time /3600);
    let remaining = time % 3600;
    const minute = parseInt(remaining / 60);
    remaining = remaining % 60;
    return ` ${hour} hour ${minute} minutes ${remaining} second`;
}
console.log(getTimeString(7864));