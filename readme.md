# Nestjs Elasticsearch Module

## Motive

Due to Production Experience when working with Elasticsearch leaded to maintenance issues when extensively used searches, filters and aggregations (especially aggregations).

1. Current Elasticsearch Nestjs Modules does not provide auto-complete for queries
2. Since Elasticsearch indexes are schema-less we got no proper feedback about what we should expect on the index
3. Elasticsearch response forgets about types of aggregations
