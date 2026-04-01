export interface UiMenuOption {
  key: string
  label: string
  disabled?: boolean
  children?: UiMenuOption[]
}
