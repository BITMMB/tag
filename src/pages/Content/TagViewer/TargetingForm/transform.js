// Преобразование объекта preset в строку параметров запроса
export const transform = (preset) =>
  Object.keys(preset)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(preset[key])}`
    )
    .join('&');
