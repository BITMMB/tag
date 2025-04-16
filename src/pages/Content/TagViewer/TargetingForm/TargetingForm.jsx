import React, { useState, useEffect } from 'react';
import { Form, Select, message, Row, Col } from 'antd';
import { fetchHeaders } from '../../../../api/fetchHeaders';
import { useFetchEnums } from './useFetchEnums';
import { browserList } from './constants';
import styles from './TargetingForm.module.scss';

export const TargetingForm = ({ setLoading }) => {
  const [preset, setPreset] = useState({
    geo: '',
    platform: '',
    browser: '',
  });

  const { geoList, platforms } = useFetchEnums({ setLoading });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['preset'], (result) => {
        if (result && result.preset) {
          const storedPreset = result.preset;
          setPreset(storedPreset);
          if (
            storedPreset.geo &&
            storedPreset.platform &&
            storedPreset.browser
          ) {
            setLoading(true);
            fetchHeaders(storedPreset)
              .then((headers) => {
                // message.success('Таргетинг обновлен!');
              })
              .catch((err) => {
                console.error('Ошибка при получении заголовков:', err);
                message.error(`Ошибка: ${err.message}`);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }
      });
    }
  }, []);

  const handleChange = (name, value) => {
    const newPreset = { ...preset, [name]: value };
    setPreset(newPreset);

    if (newPreset.geo && newPreset.platform && newPreset.browser) {
      setLoading(true);
      fetchHeaders(newPreset)
        .then((headers) => {
          message.success('Таргетинг обновлен!');
        })
        .catch((err) => {
          console.error('Ошибка при получении заголовков:', err);
          message.error(`Ошибка: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Form layout="vertical">
      <div className={styles.formTitle}>Таргетинг</div>
      <div className={styles.container}>
        <div className={styles.select}>
          <Form.Item
            label={<span className={styles.title}>Страна</span>}
            required
            validateStatus={!preset.geo ? 'error' : 'success'}
            help={!preset.geo ? 'Выберите страну' : ''}
          >
            <Select
              placeholder="Выберите страну"
              value={preset.geo}
              onChange={(value) => handleChange('geo', value)}
              options={geoList}
              showSearch
            />
          </Form.Item>
        </div>
        <div className={styles.select}>
          <Form.Item
            label={<span className={styles.title}>Платформа</span>}
            required
            validateStatus={!preset.platform ? 'error' : 'success'}
            help={!preset.platform ? 'Выберите платформу' : ''}
          >
            <Select
              placeholder="Выберите платформу"
              value={preset.platform}
              onChange={(value) => handleChange('platform', value)}
              options={platforms}
              showSearch
            />
          </Form.Item>
        </div>
        <div className={styles.select}>
          <Form.Item
            label={<span className={styles.title}>Браузер</span>}
            required
            validateStatus={!preset.browser ? 'error' : 'success'}
            help={!preset.browser ? 'Выберите браузер' : ''}
          >
            <Select
              placeholder="Выберите браузер"
              value={preset.browser}
              onChange={(value) => handleChange('browser', value)}
              options={browserList}
              showSearch
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default TargetingForm;
