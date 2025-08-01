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

/**
 * @public
 */
export interface EntryPoint {
  kind: string

  inputFilePath: string
  permalink: string

  frontMatterSlug: string
  frontMatterTitle: string

  sidebarLabel: string
  sidebarId: string

  outputFilePath: string

  // Map of array of components, by kind (Class, Interface, ...)
  componentsMap: Map<string, Component[]>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

/**
 * @public
 */
export interface Component {
  kind: string

  inputFilePath: string
  permalink: string

  frontMatterSlug: string
  frontMatterTitle: string

  sidebarLabel: string
  sidebarId: string

  outputFilePath: string

  // Map of array of members, by kind (Constructor, Property, ...)
  membersMap: Map<string, Member[]>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

/**
 * @public
 */
export interface Member {
  kind: string

  inputFilePath: string
  permalink: string

  frontMatterSlug: string
  frontMatterTitle: string

  sidebarLabel: string
  sidebarId: string

  outputFilePath: string
  // isHidden?: boolean

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

/**
 * @public
 */
export interface TopIndex {
  kind: string

  inputFilePath: string
  permalink: string

  frontMatterSlug: string
  frontMatterTitle: string

  sidebarLabel: string
  sidebarId: string

  outputFilePath: string
}

/**
 * @public
 */
export type EntryPointsSet = Set<EntryPoint>

export interface ViewModel {
  topIndex: TopIndex
  entryPointsSet: EntryPointsSet
  permalinksMapByPath: Map<string, string>
}

export interface FrontMatter {
  slug: string
  title: string
}

// ----------------------------------------------------------------------------
