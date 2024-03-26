export type I18n = {
    t: (id?: string) => string | undefined
}

export const _i18n: I18n = {
    t: (id) => id
}