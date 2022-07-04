const debounce = (func) => {
  let timeout;
  return function executedFunction(...args) {
    const debounceDuration = (args[1] || 500)
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, debounceDuration);
  };
};

export default debounce