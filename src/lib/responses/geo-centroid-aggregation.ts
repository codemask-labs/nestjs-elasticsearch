import { estypes } from '@elastic/elasticsearch'

export type GeoCentroidAggregationResponse = {
    location: estypes.LatLon
    count: number
}
