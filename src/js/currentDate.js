export default function getCurrentDate() {
    const today = new Date();
    // today.setDate(today.getDate() - 1);
    today.setHours(today.getHours() - 25);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }