export const formatCurrency = (points: string): string => {
	const numericValue = parseFloat(points); // Convert string to a number

	if (isNaN(numericValue)) {
		return "Invalid points"; // Handle invalid number input
	}

	const formatNumber = (value: number): string => {
		return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1); // Remove decimal if no digits after it
	};

	if (numericValue >= 1000000000) {
		return `${formatNumber(numericValue / 1000000000)}b`; // Convert to billions
	} else if (numericValue >= 1000000) {
		return `${formatNumber(numericValue / 1000000)}m`; // Convert to millions
	} else if (numericValue >= 10000) {
		return `${formatNumber(numericValue / 1000)}k`; // Convert to thousands
	} else if (numericValue >= 1000) {
		return numericValue.toLocaleString("en-US"); // add commas
	}

	return numericValue.toString();
};
