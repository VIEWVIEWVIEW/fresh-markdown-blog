# A small markdown blog powered by fresh
[![Made with Fresh](https://fresh.deno.dev/fresh-badge.svg)](https://fresh.deno.dev)

## Demo
https://fresh-markdown-blog.deno.dev/

## Usage

Start the project:

```
deno task start
```


## Create Posts

- Copy your posts as markdown files into `/posts` in the root directory of your project.
- Markdown files have to end with `.md`
- You can create subdirectories like `/posts/memes/index.md`. If you choose to create subdirectories it will be important that the article is called `index.md`.

## Metadata
- When you create a new markdown file, you need to enter the article's metadata in the yaml header at the top. Here is an example:

```yaml
---
# Title which will be shown on index pages like / and /all
title: "This title will be shown on the index pages"

# Timestamps like "2022-09-19T18:29:57+02:00" work too
date: '2022-07-02'

# You don't need quotation marks if you don't like them
excerpt: Small about me page


# Don't show on index pages.
# This is useful if you have a site like "about me" or an imprint and want to link to it in the navbar / footer
shouldBeListedOnIndex: false
---
```

## Latest

The 10 latest posts are shown on this page. You can change this number in `routes/index.tsx`. Just edit `articles.slice(0, 10)` to your liking in the handler function.

## Archive

Basically, the same as the latest-page, but shows all articles and *only* headlines *without* excerpt.

## Navbar
You can find the Navbar in the components folder. If you want to add or edit links in the navbar, just edit the MenuEntries:
```javascript
export const MenuEntries = [
  {
    name: "Archive",
    href: "/archive",
  },
  {
    name: "Latest",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  }
]
```

## Footer

Basically the same as Navbar.

