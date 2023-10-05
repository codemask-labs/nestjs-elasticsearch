export type ElasticsearchCatalog = {
    /**
     *
     * @returns void
     */
    search: () => void

    /**
     *
     * @returns void
     */
    createQueryBuilder: () => void

    /**
     *
     * @returns void
     */
    checkDocumentIntegrity: () => void
}
