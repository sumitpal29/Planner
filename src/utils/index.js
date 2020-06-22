function currentDateOnly(d) {
    const time = d.getTime();
    return time - (time % 86400000);
}

module.exports = {
    currentDateOnly
}