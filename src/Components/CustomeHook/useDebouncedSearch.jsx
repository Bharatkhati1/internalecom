export function debounce(func, delay = 500) {
    let timer;
  
    return function (...args) {
      const context = this;
  
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
  