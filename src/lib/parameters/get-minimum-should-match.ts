export type MinimumShouldMatchParameter = {
    minimum_should_match?: number | string
}

/**
 * Builds a `minimum_should_match` parameter for use inside a `bool` query.
 * Controls how many of the `should` clauses a document must match to be included in results.
 * Pass the result directly to `getBoolQuery` alongside a `getShouldQuery` clause.
 *
 * @param value - The minimum number (e.g. `1`) or percentage string (e.g. `'75%'`) of `should` clauses that must match.
 * @returns A `MinimumShouldMatchParameter` object to be composed into a `getBoolQuery` call.
 */
export const getMinimumShouldMatchParameter = (value: number | string): MinimumShouldMatchParameter => ({
    minimum_should_match: value,
})
