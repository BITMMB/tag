import { phpResponseParser } from '../utils/phpResponseParser';
import { getTagType } from '../utils/getTagType';

export const getSecretZonesGawtSettings = async ({
  result,
  zoneUrl,
  updateZoneById,
  headers,
}) => {
  const requests = Object.keys(result.secretZones).map((secretZone) => {
    return fetch(
      `https://${zoneUrl.hostname}/debug/fetch_cache/zone_info_${result.secretZones[secretZone]}`,
      headers
    )
      .then((response) => response.text())
      .then((text) => {
        const gawtZoneSettings = phpResponseParser(text);

        const additionalFields = {
          direction: gawtZoneSettings.direction,
          subformat: gawtZoneSettings.subformat,
          type: getTagType(gawtZoneSettings),
          parentZone: gawtZoneSettings.subformat_parent_id,
          additionalFetched: true,

          zoneId: result.secretZones[secretZone],
        };

        updateZoneById(result.secretZones[secretZone], additionalFields);
      })
      .catch((err) => {
        console.error(
          `Ошибка при получении настроек из гафта для ${secretZone}:`,
          err
        );
        return null;
      });
  });

  await Promise.all(requests);
  return result;
};
