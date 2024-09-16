import codemaskConfig from 'eslint-config-codemask'

export default [
    ...codemaskConfig,
    {
        rules: {
            '@typescript-eslint/indent': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: ['typeParameter'],
                    format: ['PascalCase']
                }
            ],
            camelcase: [
                'warn',
                {
                    allow: [
                        'bucket_script',
                        'buckets_path',
                        'bucket_selector',
                        'bucket_sort',
                        'date_histogram',
                        'calendar_interval',
                        'stats_bucket',
                        'top_hits',
                        'value_count',
                        'min_doc_count',
                        'sum_other_doc_count',
                        'doc_count',
                        'max_score',
                        'missing_bucket',
                        'missing_order',
                        'search_after',
                        'must_not',
                        'minimum_should_match',
                        'precision_threshold',
                        'match_phrase_prefix',
                        'case_insensitive',
                        'geo_centroid',
                        'key_as_string'
                    ]
                }
            ],
            'import/order': 'off'
        }
    },
    {
        files: ['*/test/scripts/*.ts'],
        rules: {
            'no-console': 'off'
        }
    }
]
