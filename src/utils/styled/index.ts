import { MarginProps, PaddingProps, SizeProps } from '../../interfaces/styled/styled.interface';
import { css } from 'styled-components';

export const SizeFunc = (style: SizeProps) => {
  const {$width, $height, $maxWidth, $maxHeight, $minWidth, $minHeight} = style;

  return `
        ${$width && css`width: ${$width};`|| ''}
        ${$height && css`height: ${$height};`|| ''}
        
        ${$maxWidth && css`max-width: ${$maxWidth};`|| ''}
        ${$maxHeight && css`max-height: ${$maxHeight};`|| ''}
        
        ${$minWidth && css`min-width: ${$minWidth};`|| ''}
        ${$minHeight && css`min-Height: ${$minHeight};`|| ''}
    `.replaceAll(',', '');
}

export const MarginFunc = (style: MarginProps) => {
  const {$marginTop, $marginBottom, $marginLeft, $marginRight, $margin} = style;

  return `
        ${$marginTop && css`margin-top: ${$marginTop};`|| ''}
        ${$marginBottom && css`margin-bottom: ${$marginBottom};`|| ''}
        ${$marginLeft && css`margin-left: ${$marginLeft};`|| ''}
        ${$marginRight && css`margin-right: ${$marginRight};`|| ''}
        
        ${$margin && css`margin: ${$margin};`|| ''}
    `.replaceAll(',', '');
}

export const PaddingFunc = (style:PaddingProps) => {
  const {$paddingTop, $paddingBottom, $paddingLeft, $paddingRight, $padding} = style;

  return `
        ${$paddingTop && css`padding-top: ${$paddingTop};`|| ''}
        ${$paddingBottom && css`padding-bottom: ${$paddingBottom}; `|| ''}
        ${$paddingLeft && css`padding-left: ${$paddingLeft};`|| ''}
        ${$paddingRight && css`padding-right: ${$paddingRight};`|| ''}
        
        ${$padding && css`padding: ${$padding};` || ''}
    `.replaceAll(',', '');
}

