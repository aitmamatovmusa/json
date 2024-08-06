const DEFAULT_DELAY = 5000;

export async function delayResponse<T>(value: T, delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}
