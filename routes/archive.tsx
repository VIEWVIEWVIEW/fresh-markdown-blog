import { Handlers, PageProps } from "$fresh/server.ts";
import { ReactElement } from "rehype-react";
import { Navbar } from "../components/Navbar.tsx";
import { Footer } from "../components/Footer.tsx";
import { renderMarkdownToJsx } from "../lib/markdown.ts";


export const handler: Handlers = {
  async GET(req, ctx) {
    // url to where our .md files are stored
    const tmpUrl = new URL(`../posts/`, import.meta.url);


    const articles = []
    // we read all entries in the "posts" directory
    for await (const dirEntry of Deno.readDir(tmpUrl)) {
      let fileUrl = null
      let fileName = null

      // If the file is a directory, we read it's "index.mdx"
      // else we just get [slug].md
      if (dirEntry.isDirectory) {
        fileUrl = new URL(`../posts/${dirEntry.name}/index.md`, import.meta.url);
        fileName = dirEntry.name
      } else {
        fileUrl = new URL(`../posts/${dirEntry.name}`, import.meta.url);

        // remove the ".md" extension
        fileName = dirEntry.name.replace(".md", "")
      }

      // read + parse markdown
      const { metadata } = await renderMarkdownToJsx(await Deno.readTextFile(fileUrl));

      // if we want the article to appear on the index => push it to our articles array
      if (metadata.shouldBeListedOnIndex)
        articles.push({ ...metadata, url: fileName })
    }

    // sort by date
    articles.sort((a, b) => b.date.getTime() - a.date.getTime())

    return ctx.render({ articles })
  }
}



function BlogEntry(metadata: {
  title: string;
  excerpt: {
    result: ReactElement
  };
  date: Date;
  url: string;
}) {
  const {
    title,
    date,
    url
  } = metadata

  return <>
    <div class="col-span-1 justify-self-end ">
      <time class="text-sm text-gray-400 ">{date.toLocaleDateString()}</time>
    </div>
    <a class="col-span-3" href={url}>{title}</a>
  </>
}


export default function All(props: PageProps) {
  const { articles } = props.data
  return (
    <>
      <div class="container mx-auto">
        <Navbar />

        <div class="mt-10 mx-auto prose">
          <h1>Archive</h1>

          <div class="grid grid-cols-4 gap-x-5">

            {articles.map(BlogEntry)}
          </div>

        </div>

        <Footer />
      </div>
    </>
  );
}
