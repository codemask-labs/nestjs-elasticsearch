export type MinimumShouldMatchParameter = {
    minimum_should_match?: number | string
}

export const getMinimumShouldMatchParameter = (value: number | string): MinimumShouldMatchParameter => ({
    // eslint-disable-next-line camelcase
    minimum_should_match: value
})
