/**
 * @packageDocumentation
 * @module Constants
 */

import { BooruCredentials } from "./boorus/Booru.ts"
import siteJson from "./sites.json" assert { type: "json" }
import Site from "./structures/Site.ts"
import SiteInfo from "./structures/SiteInfo.ts"
import { querystring } from "./Utils.ts"

export type AnySite =
  | "e621.net"
  | "e926.net"
  | "hypnohub.net"
  | "danbooru.donmai.us"
  | "konachan.com"
  | "konachan.net"
  | "yande.re"
  | "gelbooru.com"
  | "rule34.xxx"
  | "safebooru.org"
  | "tbib.org"
  | "xbooru.com"
  | "rule34.paheal.net"
  | "derpibooru.org"
  | "realbooru.com"

type gelTags = {
  "rating:e": "rating:explicit"
  "rating:q": "rating:questionable"
  "rating:s": "rating:safe"

  [key: string]: string
}

const expandedTags: gelTags = {
  "rating:e": "rating:explicit",
  "rating:q": "rating:questionable",
  "rating:s": "rating:safe",
}

/**
 * A map of site url/{@link SiteInfo}
 */
export const sites = siteJson as Record<AnySite, SiteInfo>

/**
 * Custom error type for when the boorus error or for user-side error, not my code (probably)
 * <p>The name of the error is 'BooruError'
 * @type {Error}
 */
export class BooruError extends Error {
  constructor(message: string | Error) {
    super(message instanceof Error ? message.message : message)

    if (message instanceof Error) {
      this.stack = message.stack
    } else {
      Error.captureStackTrace(this, BooruError)
    }

    this.name = "BooruError"
  }
}

/**
 * The user-agent to use for searches
 * @private
 */
export const USER_AGENT = `booru (https://github.com/AtoraSuunva/booru)`

/**
 * Expands tags based on a simple map, used for gelbooru/safebooru/etc compat :(
 *
 * @private
 * @param {String[]} tags The tags to expand
 */
function expandTags(tags: string[]): string[] {
  return tags.map((v) => expandedTags[v.toLowerCase()] ?? v)
}

/**
 * Create a full uri to search with
 *
 * @private
 * @param {string} domain The domain to search
 * @param {Site} site The site to search
 * @param {string[]} [tags=[]] The tags to search for
 * @param {number} [limit=100] The limit for images to return
 * @param {number} [page=0] The page to get
 * @param {BooryCredentials} [credentials] The credentials to use for the search, appended to the querystring
 */
export function searchURI(
  site: Site,
  tags: string[] = [],
  limit = 100,
  page = 0,
  credentials: BooruCredentials = {},
): string {
  const query = querystring(
    {
      [site.tagQuery]: expandTags(tags),
      limit,
      [site.paginate]: page,
      ...credentials,
    },
    {
      arrayJoin: site.tagJoin,
    },
  )

  return (
    `http${site.insecure ? "" : "s"}://` +
    `${site.domain}${site.api.search}` +
    query
  )
}

/**
 * The default options to use for requests
 * <p>I could document this better but meh
 *
 * @private
 */
export const defaultOptions: RequestInit = {
  headers: {
    Accept: "application/json, application/xml;q=0.9, */*;q=0.8",
    "User-Agent": USER_AGENT,
  },
}
