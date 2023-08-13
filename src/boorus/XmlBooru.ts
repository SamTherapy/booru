/**
 * @packageDocumentation
 * @module Boorus
 */

import Site from "../structures/Site.ts"
import Booru, { BooruCredentials } from "./Booru.ts"

/**
 * A class designed for Xml-returning boorus
 *
 * @extends Booru
 * @inheritDoc
 */
export default class XmlBooru extends Booru {
  /**
   * Create a new booru using XML from a site
   * @param {Site} site The site to use
   * @param {Object?} credentials Credentials for the API (Currently not used)
   */
  constructor(site: Site, credentials?: BooruCredentials) {
    super(site, credentials)
  }
}
