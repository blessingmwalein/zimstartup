const formatMoney = (value: number): string => {
    if (isNaN(value)) return '$0.00'; // Handle invalid input
  
    // Format the number with thousands separator and two decimal places
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  
    return formattedValue;
  };
  

  export default formatMoney;
