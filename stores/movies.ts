import { defineStore } from "pinia";
import {
  type SearchResponse,
  type MovieShort,
  type MovieFull,
  searchResponseSchema,
  movieFullScheme,
} from "@/types";
import logger from "@/utils/logger";

export const useMovieStore = defineStore("movies", {
  state: () => {
    return {
      searchMovies: [] as MovieShort[],
      selectedMovie: {} as MovieFull,
    };
  },
  actions: {
    async fetchByTitle(title: string): Promise<void> {
      const runtimeConfig = useRuntimeConfig();

      try {
        const resp = await $fetch<SearchResponse>(
          runtimeConfig.public.baseUrl,
          {
            parseResponse: JSON.parse,
            params: {
              s: title,
              apikey: runtimeConfig.public.apiKey,
            },
          }
        );
        const data = searchResponseSchema.parse(resp);
        if (data.Response === "True") {
          this.searchMovies = data.Search;
        } else {
          this.searchMovies = [];
          return Promise.reject(data);
        }
      } catch (e) {
        this.searchMovies = [];
        logger.error(e);
        return Promise.reject(e);
      }
    },
    async getMovieByIbmId(id: string): Promise<void> {
      const runtimeConfig = useRuntimeConfig();

      try {
        const resp = await $fetch<MovieFull>(runtimeConfig.public.baseUrl, {
          parseResponse: JSON.parse,
          params: {
            i: id,
            plot: "full",
            apikey: runtimeConfig.public.apiKey,
          },
        });

        const data = movieFullScheme.parse(resp);

        if (data.Response === "True") {
          this.selectedMovie = data;
        } else {
          this.selectedMovie = {};
          return Promise.reject(data);
        }
      } catch (e) {
        this.selectedMovie = {};
        logger.error(e);
        return Promise.reject(e);
      }
    },
  },
});
