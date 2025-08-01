/*
 * This file is part of the xPack project (http://xpack.github.io).
 * Copyright (c) 2025 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/licenses/MIT.
 */

// ----------------------------------------------------------------------------

import fs from 'node:fs/promises'
import path from 'node:path'

import { CliOptions } from '../docusaurus/cli-options.js'

// ----------------------------------------------------------------------------

/**
 * @public
 */
export interface DataModelJson {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any

  kind: string // Package
  canonicalReference: string // @scope/name!
  name: string // @scope/name
  preserveMemberOrder: boolean
  members?: DataModelMember[]
}

/**
 * @public
 */
export interface DataModelMember {
  kind: string // EntryPoint, Class
  canonicalReference: string
  docComment: string
  excerptTokens?: DataModelExcerpt[]
  fileUrlPath?: string
  releaseTag?: string // public
  isAbstract?: boolean
  name?: string // Possibly empty
  preserveMemberOrder: boolean
  isProtected?: boolean
  isReadonly?: boolean
  isOptional?: boolean
  isStatic?: boolean
  overloadIndex?: number
  propertyTypeTokenRange?: DataModelTypeTokenRange
  parameters?: DataModelParameter[]
  members?: DataModelMember[]
  extendsTokenRange?: DataModelTypeTokenRange
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  implementsTokenRanges: any[]
}

/**
 * @public
 */
export interface DataModelExcerpt {
  kind: string
  text: string
  canonicalReference?: string
}

/**
 * @public
 */
export interface DataModelParameter {
  parameterName: string
  parameterTypeTokenRange: DataModelTypeTokenRange
  isOptional: boolean
}

/**
 * @public
 */
export interface DataModelTypeTokenRange {
  startIndex: number
  endIndex: number
}

// ----------------------------------------------------------------------------

/**
 * @public
 */
export class DataModel {
  options: CliOptions

  jsons: DataModelJson[]

  constructor(options: CliOptions) {
    this.options = options

    this.jsons = []
  }

  async parse(): Promise<void> {
    // Parse the API JSON files
    const afiFiles = await fs.readdir(this.options.apiJsonInputFolderPath)
    for (const apiFile of afiFiles) {
      if (apiFile.endsWith('.api.json')) {
        console.log(apiFile)

        const apiJsonFilePath = path.join(
          this.options.apiJsonInputFolderPath,
          apiFile
        )
        console.log(`Reading ${apiJsonFilePath}...`)

        try {
          const jsonContent = await fs.readFile(apiJsonFilePath, 'utf8')

          this.jsons.push(JSON.parse(jsonContent) as DataModelJson)
        } catch (err) {
          if (err instanceof Error) {
            console.warn(
              `Could not parse API JSON file ${apiJsonFilePath}: ` + err.message
            )
          } else {
            console.warn(
              `Could not parse API JSON file ${apiJsonFilePath}: ` +
                'Unknown error'
            )
          }
        }
      }
    }
  }
}

// ----------------------------------------------------------------------------
