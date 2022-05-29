import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import io from "socket.io-client";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (build) => ({
    getAngles: build.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const socket = io();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const listener = (event) => {
            const data = event.data;

            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          socket.on("init", listener);
          socket.on("angleState", (event) => {
            console.log(event.data);
          });
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        socket.off("init");
        socket.off("angleState");
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.close();
      },
    }),
  }),
});

export const { useGetAnglesQuery } = api;
