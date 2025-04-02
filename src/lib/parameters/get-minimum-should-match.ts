export type MinimumShouldMatchParameter = {
    minimum_should_match?: number | string
}

export const getMinimumShouldMatchParameter = (value: number | string): MinimumShouldMatchParameter => ({
    minimum_should_match: value,
})
