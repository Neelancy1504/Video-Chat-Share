// window.process = require('process');
// window.global = window;

if (typeof window !== 'undefined') {
    const process = require('process');
    window.process = process;
    window.global = window;
    
    // Add nextTick implementation
    if (!process.nextTick) {
      process.nextTick = function(callback) {
        setTimeout(callback, 0);
      };
    }
  }