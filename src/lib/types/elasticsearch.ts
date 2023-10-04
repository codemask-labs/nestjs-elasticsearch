export type ElasticsearchCatalog = {
    search: () => void
    msearch: () => void

    /**
     *
     * @returns void
     */
    createQueryBuilder: () => void
}
