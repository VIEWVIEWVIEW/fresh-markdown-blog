// deno-lint-ignore-file

import { createElement, Fragment } from "preact";
import { default as remarkGfm } from "remarkGfm";
import { default as remarkMath } from "remarkMath";
import { parse as frontMatter } from "frontMatter";
import { default as rehypeAutolinkHeadings } from "rehypeAutolinkHeadings";
import { default as rehypeCodeTitles } from "rehypeCodeTitles";
import { default as rehypeSlug } from "rehypeSlug";
import { type Plugin, unified } from "unified";
import { default as remarkParser } from "remarkParser";
import { default as remarkRehype } from "remarkRehype";
import { default as rehypeStringify } from "rehypeStringify";
import { default as rehypeExternalLinks } from "rehypeExternalLinks";
import { default as remarkImages } from "remarkImages"
import rehypeReact from "rehypeReact"
import remarkToc from 'remarkToc'
import remarkFrontmatter from "remarkFrontmatter";
import { ReactElement } from "https://esm.sh/v94/rehype-react@7.1.1/lib/index.d.ts";
import { default as rehypePrism } from "rehype-prism";

export type Metadata = {
  title: string
  excerpt: string
  date: Date
  published: boolean,
  shouldBeListedOnIndex: boolean
}

type Rendered = {
  jsx: ReactElement
  metadata: Metadata
}

async function _markdownParser(markdownString: string) {
  return unified()
    .use(remarkParser as Plugin)
    .use(remarkToc)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .use(remarkImages)
    .use(rehypeStringify as Plugin)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: { class: "anchor" },
    })
    .use(rehypeCodeTitles)
    .use(rehypeExternalLinks)

    // for prism we need to include stylesheets.
    // however, including css in fresh it PITA right now.
    // I will revisit this feature later.
    .use(rehypePrism, {
      plugins: [

      ]
    })
    .use(rehypeStringify)
    // @ts-ignore Taken from the docs but echoes a type error anyway
    .use(rehypeReact, { createElement, Fragment })
    .process(markdownString);
}

export async function renderMarkdownToJsx(markdownString: string): Promise<Rendered> {

  const rendered = await _markdownParser(markdownString);
  // @ts-ignore
  const { data: metadata }: {
    metadata: Metadata
  } = frontMatter(markdownString)

  metadata.date = new Date(metadata.date)
  metadata.excerpt = await _markdownParser(metadata.excerpt)

  return {
    jsx: rendered.result,
    metadata
  };
}