import { ACTIVE_DOMAINS } from '../constants';

export const findDomains = async ({ url, setDomains, runFactory, zones }) => {
  try {
    const zoneUrl = new URL(url);
    const domain = zoneUrl.hostname;
    if (ACTIVE_DOMAINS[domain] && !zoneUrl.search) {
      setDomains((prev) => ({ ...prev, [zoneUrl]: ACTIVE_DOMAINS[domain] }));
      runFactory({ zoneUrl, zones });
      console.log('Найдена зона:', zoneUrl);
    }
  } catch (e) {
    console.error('Ошибка при обработке URL:', e);
  }
};
