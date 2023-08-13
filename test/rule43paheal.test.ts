import { beforeEach, describe, it } from "std/testing/bdd.ts"

import {
  assertExists,
  assertObjectMatch,
  assertStrictEquals,
} from "std/assert/mod.ts"

import Booru, { BooruClass, search, sites } from "../src/index.ts"
import Post from "../src/structures/Post.ts"
import SearchResults from "../src/structures/SearchResults.ts"

let tag1: string
let site: string

beforeEach(() => {
  site = "pa"
  tag1 = "glaceon"
})

describe("Using instantiation method", () => {
  let danbooru: BooruClass
  beforeEach(() => {
    danbooru = Booru(site)
  })

  it("should return an image", async () => {
    const searchResult: SearchResults = await danbooru.search([tag1])
    const image: Post = searchResult[0]
    assertStrictEquals(searchResult.booru.domain, "rule34.paheal.net")
    assertObjectMatch(
      searchResult.booru.site,
      sites[searchResult.booru.domain] as unknown as Record<
        PropertyKey,
        unknown
      >,
    )
    assertExists(image.fileUrl)
  })
})

describe("Using fancy pants method", () => {
  it("should return an image", async () => {
    const searchResult = await search(site, [tag1])
    const image: Post = searchResult[0]
    assertStrictEquals(searchResult.booru.domain, "rule34.paheal.net")
    assertObjectMatch(
      searchResult.booru.site,
      sites[searchResult.booru.domain] as unknown as Record<
        PropertyKey,
        unknown
      >,
    )
    assertExists(image.fileUrl)
  })
})
