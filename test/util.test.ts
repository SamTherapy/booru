import { beforeEach, describe, it } from "std/testing/bdd.ts"

import {
  assertIsError,
  assertObjectMatch,
  assertStrictEquals,
} from "std/assert/mod.ts"

import { BooruClass, BooruError, resolveSite, sites } from "../src/index.ts"
import Site from "../src/structures/Site.ts"

let site: string

beforeEach(() => {
  site = "db"
})

describe("Check resolveSite", () => {
  it("should resolve alias to host", () => {
    assertStrictEquals(resolveSite(site), "danbooru.donmai.us")
  })
})

describe("check BooruError", () => {
  it("should resolve to a BooruError", () => {
    const booruError = new BooruError("test")
    assertIsError(booruError, BooruError)
  })
})

describe("check BooruClass", () => {
  it("should resolve to a BooruClass", () => {
    const SiteData: Site = {
      aliases: ["sb", "safe", "safebooru"],
      api: {
        search: "/index.php?page=dapi&s=post&q=index&json=1&",
        postView: "/index.php?page=post&s=view&json=1&id=",
      },
      domain: "safebooru.org",
      nsfw: false,
      random: false,
      paginate: "pid",
      type: "",
      tagQuery: "",
      tagJoin: "",
      insecure: false,
      defaultTags: [],
    }
    const booruClass = new BooruClass(SiteData)

    assertStrictEquals(booruClass.domain, "safebooru.org")
    assertObjectMatch(
      booruClass.site,
      SiteData as unknown as Record<PropertyKey, unknown>,
    )
  })
})

describe("check sites", () => {
  it("should support 15 sites", () => {
    const map = sites
    assertStrictEquals(Object.keys(map).length, 15)
  })
})
