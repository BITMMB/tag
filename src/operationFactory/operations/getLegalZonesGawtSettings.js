import { phpResponseParser } from '../utils/phpResponseParser';
import { getTagType } from '../utils/getTagType';
import { findSecretZones } from '../utils/findSecretZones';

export const getLegalZonesGawtSettings = async ({
  headers,
  zoneUrl,
  updateZoneById,
  result,
}) => {
  try {
    const zoneInfoText = await fetch(
      `https://${zoneUrl.hostname}/debug/fetch_cache/zone_info_${result.parentZoneId}`,
      {
        headers,
      }
    ).then((response) => response.text());

    const gawtZoneSettings = phpResponseParser(zoneInfoText);

    const secretZones = findSecretZones(gawtZoneSettings, result);

    const additionalFields = {
      direction: gawtZoneSettings.direction,
      subformat: gawtZoneSettings.subformat,
      type: getTagType(gawtZoneSettings),
      additionalFetched: true,
      zoneId: result.parentZoneId,
      secretZones,
    };

    updateZoneById(result.parentZoneId, additionalFields);
    result.secretZones = secretZones;
    return result;
  } catch (err) {
    console.error(
      `Ошибка при получении debug info для zone_id=${result.parentZoneId}:`,
      err
    );
    return {};
  }
};
