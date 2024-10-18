import { theme } from 'antd';

const useThemeTokens = () => {
  const {
    token: { colorBgLayout, colorTextTertiary },
  } = theme.useToken();

  return { colorBgLayout, colorTextTertiary };
};

export default useThemeTokens;