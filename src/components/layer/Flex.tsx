import styled, { css } from 'styled-components';
import { SizeProps, PaddingProps, MarginProps, FlexProps } from '../../interfaces/styled/styled.interface';
import { MarginFunc, PaddingFunc, SizeFunc } from '../../utils/styled';

const Flex = styled.div<FlexProps & SizeProps & MarginProps & PaddingProps>(({$jc, $js, $dc, $ac, $afe, $fWrap, ...props}) => css`
    display:flex;
    
  ${$jc && css`justify-content: center;`}
  ${$js && css`justify-content: space-between;`}
  ${$dc && css`flex-direction: column;`}
  ${$ac && css`align-items: center;`}
  ${$afe && css`align-items: flex-end;`}
  ${$fWrap && css`flex-wrap: wrap;`}

  ${SizeFunc(props)}
  ${MarginFunc(props)}
  ${PaddingFunc(props)}
`);

export default Flex;