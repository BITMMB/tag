import { transform } from '../pages/Content/TagViewer/TargetingForm/transform';

// Функция для запроса заголовков по переданному пресету
export const fetchHeaders = (preset) =>
  fetch(
    `https://adgo.gglx.me/tools/random_ip_ua/random/?${transform(preset)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'success') {
        chrome.storage.local.set({ headers: data.data, preset });
        return data.data;
      } else {
        throw new Error(data.message || "Can't load preset!");
      }
    });
