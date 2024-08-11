export type I18n = {
    t: (id?: string, placeholders?: any) => string | undefined
}

export const _i18n: I18n = {
    t: (id, placeholders) => id
}