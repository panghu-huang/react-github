import { Theme } from 'src/config'

export interface IThemeColors {
  primaryColor: string
  secondaryColor: string,
  titleColor: string,
  textColor: string,
  placeholderColor: string,
  disabledColor: string,
  backgroundColor: string,
}

export interface ITheme {
  theme: Theme,
  colors: IThemeColors
  changeTheme: () => void,
}