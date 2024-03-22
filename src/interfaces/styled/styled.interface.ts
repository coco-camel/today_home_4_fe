export interface SizeProps {
  $width?: string;
  $height?: string;
  $maxWidth?: string;
  $maxHeight?: string;
  $minWidth?: string;
  $minHeight?: string;
}

export interface MarginProps {
  $marginTop?: string
  $marginBottom?: string
  $marginLeft?: string
  $marginRight?: string

  $margin?: string
}

export interface PaddingProps {
  $paddingTop?: string
  $paddingBottom?: string
  $paddingLeft?: string
  $paddingRight?: string

  $padding?: string
}

export interface FlexProps {
  $dc?: boolean //flex-direction column
  $jc?: boolean //justify-contents center
  $js?: boolean //justify-contents space-between
  $ac?: boolean //align-items center
  $afe?: boolean //align-items flex-end
  $fWrap?: boolean //flex-wrap: wrap
}