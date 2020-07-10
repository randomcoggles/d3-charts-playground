export function randomXYData(length, topX, topY) {
  return Array.from({length}, param => {
      return {x: Math.floor(Math.random() * topX), y: Math.floor(Math.random() * topY) };
  });
}