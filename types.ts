import { z } from "zod";

export const movieTypeSchema = z.union([
  z.literal("movie"),
  z.literal("episode"),
  z.literal("series"),
]);

export const rentingTypeSchema = z.object({
  Source: z.string(),
  Value: z.string(),
});
export type MovieType = z.infer<typeof movieTypeSchema>;

export const movieShortScheme = z.object({
  Title: z.string(),
  Poster: z.union([z.string().url(), z.literal("N/A")]),
  Type: movieTypeSchema,
  Year: z.string().regex(/[0-9]{4,4}/, "Invalid year format"),
  imdbID: z.string(),
});

// api is unreliable so we describe most of the fields as optional

export const movieFullScheme = z
  .object({
    Plot: z.string(),
    Actors: z.string().optional(),
    Awards: z.string().optional(),
    BoxOffice: z.string().optional(),
    Country: z.string().optional(),
    DVD: z.string().optional(),
    Director: z.string().optional(),
    Genre: z.string().optional(),
    Language: z.string().optional(),
    Metascore: z.string().optional(),
    Production: z.string().optional(),
    Rated: z.string().optional(),
    Ratings: z.array(rentingTypeSchema),
    Released: z.string().optional(),
    Response: z.literal("True"),
    Runtime: z.string().optional(),
    Website: z.string().optional(),
    Writer: z.string().optional(),
    imdbRating: z.string().optional(),
    imdbVotes: z.string().optional(),
  })
  .merge(movieShortScheme);

export type MovieShort = z.infer<typeof movieShortScheme>;

export type MovieFull = z.infer<typeof movieFullScheme>;

const successSearchSchema = z.object({
  Response: z.literal("True"),
  Search: z.array(movieShortScheme),
  totalResults: z.string(),
});

const failSearchSchema = z.object({
  Response: z.literal("False"),
  Error: z.string(),
});

export const searchResponseSchema = z.discriminatedUnion("Response", [
  successSearchSchema,
  failSearchSchema,
]);

export type SearchResponse = z.infer<typeof searchResponseSchema>;
