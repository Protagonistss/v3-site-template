export type UiFormTrigger = 'blur' | 'change' | 'input'

export interface UiFormRule {
  required?: boolean
  message?: string
  trigger?: UiFormTrigger | UiFormTrigger[]
}

export type UiFormRules<T extends Record<string, unknown>> = Partial<
  Record<keyof T, UiFormRule[]>
>

export interface UiFormInstance {
  validate: () => Promise<void>
}
