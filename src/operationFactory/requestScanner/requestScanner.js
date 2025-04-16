import { ACTIVE_DOMAINS } from '../constants';
import { findCompetitors } from './findCompetitors';
import { findDomains } from './findDomains';

export const requestScanner = ({
  resetOperations,
  setDomains,
  runFactory,
  zones,
  setCompetitors,
}) => {
  setDomains({});
  resetOperations();
  chrome.devtools.inspectedWindow.reload();

  const processedUrls = new Set();

  const requestListener = (request) => {
    const mimeType = request.response.content.mimeType;
    if (
      !mimeType ||
      (!mimeType.includes('html') && !mimeType.includes('javascript'))
    ) {
      return;
    }
    findCompetitors({ request, setCompetitors });
    const url = request.request.url;
    if (url && !processedUrls.has(url)) {
      processedUrls.add(url);
      findDomains({ url, setDomains, runFactory, zones });
    }
  };

  chrome.devtools.network.onRequestFinished.addListener(requestListener);

  return {
    stop: () =>
      chrome.devtools.network.onRequestFinished.removeListener(requestListener),
  };
};

export default requestScanner;
