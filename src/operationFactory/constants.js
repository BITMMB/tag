export const ACTIVE_DOMAINS = {
  'crcgrilses.com': {
    isActive: true,
    flags: {
      adb: true,
      g: false,
      av: true,
      gr: true,
      sl: false,
    },
  },
  're.overbuyfleetly.shop': {
    isActive: false,
    flags: {
      adb: true,
      g: false,
      av: true,
      gr: true,
      sl: false,
    },
  },
  'hu.aspsloped.com': {
    isActive: false,
    flags: {
      adb: true,
      g: false,
      av: true,
      gr: true,
      sl: false,
    },
  },
  'ip.fumeuseaudibly.com': {
    isActive: true,
    flags: {
      adb: false,
      g: false,
      av: false,
      gr: true,
      sl: false,
    },
  },
  'bg.tampurunrig.com': {
    isActive: true,
    flags: {
      adb: false,
      g: false,
      av: false,
      gr: true,
      sl: false,
    },
  },
};

export const TAGS_URL_MAP = {
  pushup: 'ps',
  sitebutton: 'sb',
  direct: 'ri',
  extButton: 'ebt',
  interstitial: 'int',
  popsScanner: 'pst',
  onpage: 'op',
  pops: 'pt',
  qr: 'qrt',
  teaser: 'ts',
  // videoAds: '??',
  // shufflebox: '??',
};

export const SECRET_ZONE_FIELDS = {
  qr_zone_id: TAGS_URL_MAP.qr,
  pushup_zone_id: TAGS_URL_MAP.pushup,
  // video_ads_zone_ids: TAGS_URL_MAP.videoAds,
  // shufflebox_zone_ids: TAGS_URL_MAP.shufflebox,
  interstitial_zone_id: TAGS_URL_MAP.interstitial,
  pops_scanner_zone_id: TAGS_URL_MAP.popsScanner,
  site_button_zone_ids: TAGS_URL_MAP.sitebutton,
  pops_zone_id: TAGS_URL_MAP.pops,
};
export const FIELD_TYPE_MAPPING = {
  qr_settings: 'qr',
  pushup_settings: 'pushup',
  // video_ads_settings: 'videoAds',
  // shufflebox_settings: 'shufflebox',
  interstitial_settings: 'interstitial',
  pops_scanner_settings: 'popsScanner',
  site_button_settings: 'site_button',
  bp_clicker_settings: 'pops',
  teaser_settings: 'teaser',
};
export const competitorsNetwork = {
  propeller: 'Propeller',
  admaven: 'Admaven',
  adcash: 'Adcash',
  adsterra: 'Adsterra',
  steepto: 'SteepTo',
  mgid: 'MarketGid',
  exoclick: 'Exoclick',
  revenueHits: 'RevenueHits',
};
