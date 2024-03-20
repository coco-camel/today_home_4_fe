import { createGlobalStyle } from 'styled-components';
import PretendardRegularFont from '../assets/fonts/Pretendard-Regular.woff';
import PretendardMediumFont from '../assets/fonts/Pretendard-Medium.woff';
import PretendardSemiBoldFont from '../assets/fonts/Pretendard-SemiBold.woff';
import PretendardBoldFont from '../assets/fonts/Pretendard-Bold.woff';
import PretendardExtraBoldFont from '../assets/fonts/Pretendard-ExtraBold.woff';

const GlobalFonts = createGlobalStyle`
@font-face {
    font-family: 'Pretendard Regular';
    src: local('Pretendard Regular'),
      url(${PretendardRegularFont}) format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard Medium';
    src: local('Pretendard Medium'),
      url(${PretendardMediumFont}) format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard SemiBold';
    src: local('Pretendard SemiBold'),
      url(${PretendardSemiBoldFont}) format('opentype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard Bold';
    src: local('Pretendard Bold'),
      url(${PretendardBoldFont}) format('opentype');
    font-weight: 700;
    font-style: bold;
    font-display: swap;
  }
  @font-face {
    font-family: 'Pretendard ExtraBold';
    src: local('Pretendard ExtraBold'),
      url(${PretendardExtraBoldFont}) format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export default GlobalFonts;
