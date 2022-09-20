import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Navbar } from "../components/Navbar.tsx";

import { Metadata, renderMarkdownToJsx } from "../lib/markdown.ts";


export const handler: Handlers = {
  async GET(req, ctx) {

    // get the slug, e.g. "this-is-a-post"
    const slug = decodeURI(ctx.params.slug);

    // this file url will be a full path to the actual "this-is-a-post.md" file
    let fileUrl = null

    // url to where our .md files are stored
    const tmpUrl = new URL(`../posts/`, import.meta.url);


    // we read all entries in the "posts" directory
    for await (const dirEntry of Deno.readDir(tmpUrl)) {

      // If the file is a directory, we read it's "index.mdx"
      // else we just get [slug].md
      if (dirEntry.name === `${slug}`) {
        fileUrl = new URL(`../posts/${dirEntry.name}/index.md`, import.meta.url);
      } else if (dirEntry.name === `${slug}.md`) {
        fileUrl = new URL(`../posts/${dirEntry.name}`, import.meta.url);
      }
    }

    // If the file doesn't exist, we return a 404
    if (fileUrl === null || !fileUrl.pathname.endsWith(".md")) {
      return ctx.renderNotFound();
    }

    // Files exist => read + parse markdown
    const markdownString = await Deno.readTextFile(fileUrl);
    const content = await renderMarkdownToJsx(markdownString);
    const date = new Date(content.metadata.date)

    // send to the client
    return ctx.render({ ...content, date })
  }
}

export default function Greet(props: PageProps) {
  const jsx = props.data.jsx

  const { date } = props.data


  return <>
    <div class="container mx-auto ">
      <Navbar />

      <div class="mt-10 mx-auto flex flex-col prose">
        <time class="my-4">
        {date.toLocaleDateString()}
        </time>

        {jsx}
        <hr />
      </div>


      <Footer />
    </div>
  </>
}
