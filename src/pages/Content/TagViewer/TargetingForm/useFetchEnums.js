import { useEffect, useState } from 'react';

export const useFetchEnums = () => {
  const [enums, setEnums] = useState({});

  useEffect(() => {
    fetch('https://adgo.gglx.me/tools/random_ip_ua/index/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const geoList = data.data.geos.map(({ geo, name }) => ({
            label: name,
            value: geo,
          }));

          const platforms = data.data.platforms.map(({ name }) => ({
            label: name,
            value: name,
          }));

          setEnums({ geoList, platforms });
        }
      })
      .catch((error) => {
        throw new Error(`${error.message}. Check VPN connection!`);
      });
  }, []);

  return enums;
};
