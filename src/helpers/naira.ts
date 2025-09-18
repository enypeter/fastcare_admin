export const formatNaira = (amount: string | number): string => {
  if (typeof amount === 'string') {
    // If it's already formatted (contains ₦), return as is
    if (amount.includes('₦')) return amount;
    
    // Try to parse the string to a number
    const numericValue = parseFloat(amount);
    if (isNaN(numericValue)) return 'Invalid amount';
    amount = numericValue;
  }

  // Format the number with commas and add the Naira symbol
  return `₦ ${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const parseNairaToNumber = (nairaString: string): number => {
  // Remove the Naira symbol, commas, and any whitespace
  const cleanedString = nairaString.replace(/[₦,\s]/g, '');
  const numericValue = parseFloat(cleanedString);
  
  return isNaN(numericValue) ? 0 : numericValue;
};