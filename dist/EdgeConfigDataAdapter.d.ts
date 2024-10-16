import { AdapterResponse, IDataAdapter } from "statsig-node";
import type { EdgeConfigClient } from "@vercel/edge-config";
export declare class EdgeConfigDataAdapter implements IDataAdapter {
    /**
     * The key under which Statisg specs are stored in Edge Config
     */
    private edgeConfigItemKey;
    /**
     * A fully configured Edge Config client
     */
    private edgeConfigClient;
    private supportConfigSpecPolling;
    constructor(options: {
        /**
         * The key under which Statsig specs are stored in Edge Config
         */
        edgeConfigItemKey: string;
        /**
         * A fully configured Edge Config client.
         *
         * @example <caption>Creating an Edge Config client</caption>
         *
         * ```js
         * import { createClient } from "@vercel/edge-config";
         *
         * createClient(process.env.EDGE_CONFIG)
         * ```
         */
        edgeConfigClient: EdgeConfigClient;
    });
    get(key: string): Promise<AdapterResponse>;
    set(key: string, value: string, time?: number | undefined): Promise<void>;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    supportsPollingUpdatesFor(key: string): boolean;
}
