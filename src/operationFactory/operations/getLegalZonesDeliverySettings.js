import { phpResponseParser } from '../utils/phpResponseParser';

export const getLegalZonesDeliverySettings = async ({
  setZones,
  zoneUrl,
  headers,
}) => {
  try {
    const text = await fetch(
      `${zoneUrl.href}?xxvlad_day_nastroyky`,
      headers
    ).then((response) => response.text());

    const zone = phpResponseParser(text);
    setZones((prev) => [...prev, zone]);

    return { parentZoneId: zone.zone_id, zones: [zone.zone_id] };
  } catch (err) {
    console.error(`Ошибка при получении настроек диливери `, err);
  }
};
