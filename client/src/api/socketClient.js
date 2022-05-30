import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAngles } from "../redux/robotSlice";
import io from "socket.io-client";

let socket;
function getSocket() {
  if (!socket) {
    socket = io();
  }
  return socket;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Angles"],
  endpoints: (build) => ({
    setAngles: build.mutation({
      queryFn: (angles) => {
        const socket = getSocket();
        return new Promise((resolve) => {
          socket.emit("angleState", angles, (message) => {
            resolve({ data: message });
          });
        });
      },
    }),
    getAngles: build.query({
      queryFn: () => ({ data: [] }),

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        // create a websocket connection when the cache subscription starts
        const socket = io();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          const listener = (event) => {
            const data = event.data;
            // dispatch(setAngles(data));
            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          socket.on("angleState", listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;

        socket.off("angleState");
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        socket.close();
      },
    }),
  }),
});

export const { useGetAnglesQuery, useSetAnglesMutation } = api;
