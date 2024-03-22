import styled, { css } from "styled-components";
import { MarginProps, SizeProps } from "../../interfaces/styled/styled.interface";
import { MarginFunc, SizeFunc } from "../../utils/styled";

export const Wrap = styled.div`
    position:relative;
    display:flex;
    width:100%;
    
    padding: 0 60px;
    
    * {font-family: 'Pretendard Medium';}
`;

export const ContentBox = styled.div<SizeProps & MarginProps>((props) => css`
  ${SizeFunc(props)}
  ${MarginFunc(props)}
`);

export const Container = styled.div`
    width: 1136px;box-sizing: border-box;margin: 0 auto;
    ${ContentBox} {
        > img {width: calc(100% - 50px); height:100%; min-width:300px; border-radius: 8px;}
        .header { max-width: 500px;
            .title {width:100%;margin-right: 80px;
                > span {margin-bottom: 4px;}
                > strong {font-size: 24px;}
            }
            > button {width:40px;height: 60px;}
        }
        
    }
    
  
  
`;

