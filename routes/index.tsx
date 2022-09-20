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

    return ctx.render({ articles: articles.slice(0, 10) })
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
  // console.log(metadata)
  const {
    title,
    date,
    url
  } = metadata

  const excerpt = metadata.excerpt.result

  return <>
    <article>
      <h3>{title}</h3>
      <p>
        {excerpt}
      </p>
      <div class="flex flex-row justify-between">
        <time class="text-sm text-gray-400">{date.toLocaleDateString()}</time>
        <a href={url}>Read More</a>
      </div>
    </article>
    <hr />
  </>
}


export default function Home(props: PageProps) {
  const { articles } = props.data
  return (
    <>
      <div class="container mx-auto ">
        <Navbar />

        <div class="mt-10 mx-auto flex flex-col prose">
          <h1>Latest Blog Posts</h1>
          <ul>
            {articles.map(BlogEntry)}
          </ul>
        </div>

        <Footer />
      </div>
    </>
  );
}
