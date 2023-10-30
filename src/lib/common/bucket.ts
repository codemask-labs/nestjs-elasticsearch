export type Bucket<TKey = string> = {
    key: TKey
    key_as_string?: string
    doc_count: number
}
