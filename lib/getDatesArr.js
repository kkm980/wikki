function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}
  
  function generateDateArray() {
    const today = new Date();
    const datesArray = [];
  
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      datesArray.push(formatDate(currentDate));
    }
  
    return datesArray;
  }
  
  const thirtyDaysAgo = generateDateArray();
  
export default thirtyDaysAgo
  