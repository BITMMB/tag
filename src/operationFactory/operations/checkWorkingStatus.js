export const checkWorkingStatus = ({
  setZones,
  zones,
  result,
  updateZoneById,
}) => {
  result.zones.forEach((key) => {
    const value = sessionStorage.getItem(key);

    updateZoneById(key, { isActive: value });
  });
};
