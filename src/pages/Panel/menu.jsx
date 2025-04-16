import {
  PartitionOutlined,
  QuestionOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import React from 'react';

export const MENU_KEYS = {
  zones: 'Зоны',
  errors: 'Ошибки',
  competitors: 'Конкуренты',
  adCatcher: 'Поймай мой клик',
};

export const menu = [
  {
    label: (
      <div>
        <PartitionOutlined />
        <span>{MENU_KEYS.zones}</span>
      </div>
    ),
    key: MENU_KEYS.zones,
  },
  {
    label: (
      <div>
        <QuestionOutlined />
        <span>{MENU_KEYS.errors}</span>
      </div>
    ),
    key: MENU_KEYS.errors,
  },
  {
    label: (
      <div>
        <TeamOutlined />
        <span>{MENU_KEYS.competitors}</span>
      </div>
    ),
    key: MENU_KEYS.competitors,
  },
  {
    label: (
      <div>
        <TeamOutlined />
        <span>{MENU_KEYS.adCatcher}</span>
      </div>
    ),
    key: MENU_KEYS.adCatcher,
  },
];
