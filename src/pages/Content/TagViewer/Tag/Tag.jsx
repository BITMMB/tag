import React, { useState } from 'react';
import { Table, Button } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  SettingFilled,
  EyeInvisibleOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import styles from './Tag.module.scss';

import cx from 'classnames';

const Tag = ({ zone }) => {
  const [expanded, setExpanded] = useState(false);

  const buildTableData = (obj, parentKey = '') => {
    return Object.entries(obj).map(([field, value]) => {
      const key = parentKey ? `${parentKey}.${field}` : field;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const children = buildTableData(value, key);
        return {
          key,
          field,
          value: '{...}',
          children,
        };
      }

      return {
        key,
        field,
        value: String(value),
      };
    });
  };
  const tableData = buildTableData(zone);

  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      ellipsis: { showTitle: true },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tag}>
        <div className={styles.item}>
          <span> {zone.zoneId}</span>
        </div>
        <div className={styles.item}>
          <span> {zone.type}</span>
        </div>
        <div className={styles.item}>
          <div
            className={cx(
              styles.item,
              zone.isActive ? styles.isActive : styles.isNotActive
            )}
          >
            {zone.isActive ? 'Work' : 'Stopped'}
          </div>
        </div>

        <div className={styles.item}>
          {zone.parentZone ? (
            <div className={styles.secret}>
              <EyeInvisibleOutlined className={styles.icon} />
              {zone.parentZone}
            </div>
          ) : (
            <IdcardOutlined className={styles.icon} />
          )}
        </div>

        <Button
          type="link"
          onClick={() =>
            window.open(`https://gawt.gglx.me/zones/${zone.zoneId}/settings`)
          }
        >
          <SettingFilled className={styles.icon} />
        </Button>

        <Button type="link" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <UpOutlined className={styles.icon} />
          ) : (
            <DownOutlined className={styles.icon} />
          )}
        </Button>
      </div>
      {expanded && (
        <div className={styles.table}>
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="field"
          />
        </div>
      )}
    </div>
  );
};

export default Tag;
