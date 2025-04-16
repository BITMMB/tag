import { useState } from 'react';
import { getLegalZonesDeliverySettings } from './operations/getLegalZonesDeliverySettings';
import { checkWorkingStatus } from './operations/checkWorkingStatus';
import { getLegalZonesGawtSettings } from './operations/getLegalZonesGawtSettings';
import { getSecretZonesDeliverySettings } from './operations/getSecretZonesDeliverySettings';
import { getSecretZonesGawtSettings } from './operations/getSecretZonesGawtSettings';

const useOperationList = () => {
  let headers;
  const [zones, setZones] = useState([]);

  const updateZoneById = (id, newFields) => {
    setZones((prevZones) =>
      prevZones.map((zone) =>
        zone.zone_id === id ? { ...zone, ...newFields } : zone
      )
    );
  };

  chrome.storage.local.get('headers', (data) => {
    if (data.headers) {
      headers = data.headers;
    }
  });

  const initialOperations = {
    getLegalZonesDeliverySettings: {
      operation: ({ zoneUrl, result }) =>
        getLegalZonesDeliverySettings({
          setZones,
          zoneUrl,
          headers,
          result,
        }),
      state: 'pending',
      result: {},
      error: null,
    },
    getLegalZonesGawtSettings: {
      operation: ({ zoneUrl, result }) =>
        getLegalZonesGawtSettings({
          zoneUrl,
          headers,
          setZones,
          updateZoneById,
          result,
        }),
      state: 'pending',
      result: {},
      error: null,
    },
    getSecretZonesDeliverySettings: {
      operation: ({ result, zoneUrl }) =>
        getSecretZonesDeliverySettings({ setZones, result, zoneUrl }),
      state: 'pending',
      result: {},
      error: null,
    },
    getSecretZonesGawtSettings: {
      operation: ({ result, zoneUrl }) =>
        getSecretZonesGawtSettings({
          result,
          zoneUrl,
          updateZoneById,
          headers,
        }),
      state: 'pending',
      result: {},
      error: null,
    },
    checkWorkingStatus: {
      operation: ({ result, zones }) =>
        checkWorkingStatus({ result, zones, setZones, updateZoneById }),
      state: 'pending',
      result: {},
      error: null,
    },
  };

  const [operations, setOperations] = useState(initialOperations);

  const resetOperations = () => {
    setOperations(initialOperations);
    setZones([]);
  };

  return {
    operations,
    setOperations,
    resetOperations,
    zones,
    setZones,
  };
};

export default useOperationList;
