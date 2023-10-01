function generateMinuteArray() {
    const now = new Date();
    const minutesArray = [];

    for (let i = 0; i < 60; i++) {
        const currentMinute = new Date(now);
        currentMinute.setMinutes(now.getMinutes() - i);
        const mm = String(currentMinute.getMinutes()).padStart(2, '0');
        const HH = String(currentMinute.getHours()).padStart(2, '0');
        minutesArray.push(`${HH}:${mm}`);
    }

    return minutesArray;
}

const lastHourMinutes = generateMinuteArray();

export default lastHourMinutes;
  