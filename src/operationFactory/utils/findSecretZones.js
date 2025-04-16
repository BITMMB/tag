import { SECRET_ZONE_FIELDS } from '../constants';

export const findSecretZones = (obj, result) => {
  let list = {};
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.keys(SECRET_ZONE_FIELDS).includes(key)) {
        list[key] = obj[key];

        result.zones.push(obj[key]);
      }
      if (obj[key] && typeof obj[key] === 'object') {
        list = { ...list, ...findSecretZones(obj[key], result) };
      }
    }
  }
  return list;
};
