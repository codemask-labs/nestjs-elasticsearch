import { LatLonGeoLocation } from '@elastic/elasticsearch/lib/api/types'

export type GeoCentroidAggregationResponse = {
    location: LatLonGeoLocation
    count: number
}
