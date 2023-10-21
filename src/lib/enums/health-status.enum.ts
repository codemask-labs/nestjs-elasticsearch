export enum HealthStatus {
    /**
     * @description All shards are assigned.
     */
    Green = 'green',
    /**
     * @description All primary shards are assigned, but one or more replica shards are unassigned. If a node in the cluster fails, some data could be unavailable until that node is repaired.
     */
    Yellow = 'yellow',
    /**
     * @description One or more primary shards are unassigned, so some data is unavailable. This can occur briefly during cluster startup as primary shards are assigned.
     */
    Red = 'red'
}
