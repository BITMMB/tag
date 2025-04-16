import { phpResponseParser } from '../utils/phpResponseParser';
import { SECRET_ZONE_FIELDS } from '../constants';

export const getSecretZonesDeliverySettings = async ({
  setZones,
  result,
  zoneUrl,
  headers,
}) => {
  const requests = Object.keys(result.secretZones).map((secretZone) => {
    return fetch(
      `https://${zoneUrl.hostname}/${SECRET_ZONE_FIELDS[secretZone]}/${result.secretZones[secretZone]}?xxvlad_day_nastroyky`,
      headers
    )
      .then((response) => response.text())
      .then((text) => {
        const zoneData = phpResponseParser(text);
        setZones((prev) => [
          ...prev,
          { ...zoneData, zone_id: result.secretZones[secretZone] },
        ]);
      })
      .catch((err) => {
        console.error(
          `Ошибка при получении настроек диливери для ${secretZone}:`,
          err
        );
        return null;
      });
  });

  await Promise.all(requests);
  return result;
};
