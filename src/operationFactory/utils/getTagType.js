import { FIELD_TYPE_MAPPING } from '../constants';

export const getTagType = (zone) => {
  for (const field of Object.keys(FIELD_TYPE_MAPPING)) {
    if (zone.hasOwnProperty(field)) {
      if (Object.keys(zone[field]).length) return FIELD_TYPE_MAPPING[field];
    }
  }
};
