const PRIMARY = '#0097a7'
const SECONDARY = '#0cc4bb'
const TITLE = '#62708b'
const MAIN_CONTENT = '#666'
const BORDER = '#cfcfcf'

const general = {
  color: {
    PRIMARY,
    SECONDARY,
    TITLE,
    MAIN_CONTENT,
    BORDER,
  },
  size: {
    SMALL: '10px',
    NORMAL: '12px',
    LITTLE_LARGER: '14px',
    LARGER: '16px',
    EXTRA_LARGE: '24px',
    LARGEST: '28px',
  },
  opacity: {
    OPAQUE: 1,
    LITTLE: 0.8,
    HALF: 0.5,
    FAINT: 0.2,
    INVISIBLE: 0,
  },
  zIndex: {
    BOTTOM: 100,
    SUB_MID: 200,
    MID: 300,
    TOP: 400,
  },
  height: {
    min: '640px',
    minWithHeader: '721px',
  },
}

export default {
  general,
  sider: {
    color: {
      LOGO_BACKGROUND: '#0cc4bb',
      MENU_BACKGROUND_NORMAL: '#26334b',
      MENU_BACKGROUND_HIGHLIGHT: '#1a2430',
      MENU_TEXT_NORMAL: '#ffffff',
    },
    opacity: {
      MENU_TEXT_NORMAL: general.opacity.HALF,
      MENU_TEXT_HIGHLIGHT: general.opacity.OPAQUE,
    },
  },
  profile: {
    color: {
      LABEL: '#9b9b9b',
      VALUE: '#1a2430',
      BORDER: '#e9ebef',
    },
  },
}
