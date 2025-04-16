import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Input, Spin, Tooltip } from 'antd';

const AdCatcher = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [redirectChain, setRedirectChain] = useState([]);

  // Получаем идентификатор инспектируемой вкладки
  const tabId = chrome.devtools.inspectedWindow.tabId;

  chrome.scripting.executeScript({
    target: { tabId: tabId, allFrames: true },
    func: function () {
      document.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
          console.log('Клик перехвачен через chrome.scripting.executeScript');
        },
        true
      );
    },
  });

  console.log('=============', tabId);
  return (
    <div>
      <Button
      // onClick={toggleTracking}
      >
        {trackingEnabled ? 'Выключить' : 'Включить'}
      </Button>

      {redirectChain.map((url) => url)}
    </div>
  );
};
export default AdCatcher;
