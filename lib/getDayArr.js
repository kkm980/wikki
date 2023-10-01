function generateHourArray() {
    const currentHour = new Date().getHours();
    const hourArray = [];
  
    for (let i = 0; i < 24; i++) {
      const hour = (currentHour - i + 24) % 24; // Ensure the hour remains within 0-23
      hourArray.unshift(hour); // Add the hour to the beginning of the array
    }
  
    return hourArray;
  }
  
  const hoursArray = generateHourArray();
  export default hoursArray;
  