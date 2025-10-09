export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('runPerformanceCheck', () => {
    return new Promise((resolve) => {
      const times = [];
      const fpsHistory = [];
      const FPS_THRESHOLD = 48; // fps threshold to show blobs
      const STABILITY_THRESHOLD = 5; // fps variance allowed
      const MIN_SAMPLES = 10; // minimum readings before checking stability
      let fps;
      let rafId;

      const fpsLoop = (timestamp) => {
        while (times.length > 0 && times[0] <= timestamp - 1000) {
          times.shift();
        }

        times.push(timestamp);
        fps = times.length;

        // Collect FPS history for stability check
        if (fps > 0) {
          fpsHistory.push(fps);

          // Keep only recent samples
          if (fpsHistory.length > MIN_SAMPLES) {
            fpsHistory.shift();
          }

          // Check for stability after minimum samples
          if (fpsHistory.length >= MIN_SAMPLES) {
            const avgFps = fpsHistory.reduce((a, b) => a + b) / fpsHistory.length;
            const maxVariance = Math.max(...fpsHistory) - Math.min(...fpsHistory);

            // If FPS is stable (low variance)
            if (maxVariance <= STABILITY_THRESHOLD) {
              // Stop the loop
              if (rafId) {
                cancelAnimationFrame(rafId);
              }
              
              // Resolve with boolean result
              resolve(avgFps >= FPS_THRESHOLD);
              return;
            }
          }
        }

        rafId = requestAnimationFrame(fpsLoop);
      };

      rafId = requestAnimationFrame(fpsLoop);
    });
  });
});