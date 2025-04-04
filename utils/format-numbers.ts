/**
 * Formats a number to a human-readable string with K, M, or B suffixes
 * @param num The number to format
 * @param digits The number of decimal places to show (default: 1)
 * @returns Formatted string (e.g., 1.2K, 3.4M, 5.6B)
 */
export function formatViewCount(num?: string | number, digits = 1): string {
    if (num === undefined || num === null) return "0 views"
  
    // Convert to number if it's a string
    const value = typeof num === "string" ? Number.parseInt(num, 10) : num
  
    // Handle invalid numbers
    if (isNaN(value)) return "0 views"
  
    // Format the number with appropriate suffix
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
    ]
  
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = lookup
      .slice()
      .reverse()
      .find((item) => value >= item.value)
  
    const result = item ? (value / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
  
    return `${result} ${result === "1" ? "view" : "views"}`
  }
  
  