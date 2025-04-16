// //добавление заголовков для изменения таргетинга деливери
//
// /* global chrome */
//
// let headers = {};
//
// const generateRandomRuleId = () => Math.floor(Math.random() * 1e6) + 1;
//
// const removeSessionRules = async () => {
//   try {
//     const sessionRules = await chrome.declarativeNetRequest.getSessionRules();
//     const ruleIds = sessionRules.map((rule) => rule.id);
//     if (ruleIds.length > 0) {
//       await chrome.declarativeNetRequest.updateSessionRules({
//         removeRuleIds: ruleIds,
//       });
//     }
//   } catch (error) {
//     console.error('Ошибка при удалении сессионных правил:', error);
//   }
// };
//
// const updateHeaderRules = async () => {
//   const requestHeaders = Object.entries(headers || {}).map(([name, value]) => ({
//     header: name,
//     operation: 'set',
//     value: String(value),
//   }));
//
//   try {
//     await removeSessionRules();
//
//     const rule = {
//       id: generateRandomRuleId(),
//       priority: 1,
//       condition: {
//         urlFilter: '*',
//         resourceTypes: [
//           'main_frame',
//           'sub_frame',
//           'stylesheet',
//           'script',
//           'image',
//           'font',
//           'object',
//           'xmlhttprequest',
//           'ping',
//           'csp_report',
//           'media',
//           'websocket',
//           'other',
//         ],
//       },
//       action: {
//         type: 'modifyHeaders',
//         requestHeaders,
//       },
//     };
//
//     await chrome.declarativeNetRequest.updateSessionRules({
//       addRules: [rule],
//     });
//     console.log('Динамические правила заголовков обновлены:', rule);
//   } catch (error) {
//     console.error('Ошибка при обновлении динамических правил:', error);
//   }
// };
//
// chrome.storage.local.get('headers', (data) => {
//   if (data.headers) {
//     headers = data.headers;
//     updateHeaderRules();
//   }
// });
//
// chrome.storage.local.onChanged.addListener((changes) => {
//   if (changes.headers) {
//     headers = changes.headers.newValue;
//     updateHeaderRules();
//   }
// });
/* global chrome */

let isDevToolsOpen = false;
let headers = {};

const generateRandomRuleId = () => Math.floor(Math.random() * 1e6) + 1;

const removeSessionRules = async () => {
  try {
    const sessionRules = await chrome.declarativeNetRequest.getSessionRules();
    const ruleIds = sessionRules.map((rule) => rule.id);
    if (ruleIds.length > 0) {
      await chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: ruleIds,
      });
    }
  } catch (error) {
    console.error('Ошибка при удалении сессионных правил:', error);
  }
};

const updateHeaderRules = async () => {
  if (!isDevToolsOpen) {
    return;
  }

  const requestHeaders = Object.entries(headers || {}).map(([name, value]) => ({
    header: name,
    operation: 'set',
    value: String(value),
  }));

  try {
    await removeSessionRules();

    const rule = {
      id: generateRandomRuleId(),
      priority: 1,
      condition: {
        urlFilter: '*',
        resourceTypes: [
          'main_frame',
          'sub_frame',
          'stylesheet',
          'script',
          'image',
          'font',
          'object',
          'xmlhttprequest',
          'ping',
          'csp_report',
          'media',
          'websocket',
          'other',
        ],
      },
      action: {
        type: 'modifyHeaders',
        requestHeaders,
      },
    };

    await chrome.declarativeNetRequest.updateSessionRules({
      addRules: [rule],
    });
  } catch (error) {
    console.error('Ошибка при обновлении динамических правил:', error);
  }
};

chrome.storage.local.get('headers', (data) => {
  if (data.headers) {
    headers = data.headers;
    updateHeaderRules();
  }
});

chrome.storage.local.onChanged.addListener((changes) => {
  if (changes.headers) {
    headers = changes.headers.newValue;
    updateHeaderRules();
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'devtools' && typeof msg.active === 'boolean') {
    isDevToolsOpen = msg.active;
    if (isDevToolsOpen) {
      updateHeaderRules();
    } else {
      console.log('DevTools закрыты — удаляем правила.');
      removeSessionRules();
    }
  }
});
/////////////////////

