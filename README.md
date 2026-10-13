# House & Habit

A lifestyle magazine on decor, hosting and cozy style, built as a fast static site for Netlify. Every post is a markdown file in the `posts/` folder.

## Put it online (one time, about 15 minutes)

1. **Create a GitHub repository.** Sign in at github.com, click New repository, name it `house-and-habit`, and create it.
2. **Upload the files.** On the new repo page, click "uploading an existing file", drag in everything from this folder (including the `posts`, `pages` and `static` folders), and commit.
3. **Connect Netlify.** In Netlify, choose Add new site, then Import an existing project, pick GitHub and the `house-and-habit` repo. Netlify reads `netlify.toml`, so the build settings fill themselves in. Click Deploy.
4. **Name the site.** In Site configuration, choose Change site name and enter `houseandhabit`. Your site is then at https://houseandhabit.netlify.app. If that name is taken, pick another and update `url` in `site.config.json` to match.
5. **Turn on the newsletter form.** In Netlify, open Forms and click Enable form detection, then redeploy once. Sign-ups appear under Forms, newsletter.
6. **Tell Amazon.** In Amazon Associates, go to Account settings, Edit your website list, and add the new site URL.

## Publish a new post (every Tuesday and Friday)

The scheduled blog task now sends two files. The one without `blog-` at the start (for example `2026-10-13-velvet-pumpkin-tablescape.md`) is the website file.

1. Open the repo on GitHub, go into the `posts` folder.
2. Click Add file, Upload files, drop in the website file, and commit.
3. Netlify rebuilds automatically. The post is live in about a minute, at the top of the front page.

You can edit any post right on GitHub: open the file, click the pencil icon, change text or links, and commit.

Good to know:
- A raw Medium file dropped in by mistake still works: the builder strips the "Editor notes" block and uses the first heading as the title.
- Amazon links without a tag get `creativedi03c-20` added automatically, and all Amazon links are marked as sponsored for Google.
- Em dashes are swapped for commas when the site builds.
- Add `draft: true` to a post's front matter to keep it off the site. Posts dated in the future wait until their date.

## Post front matter

```yaml
---
title: "Post title"
subtitle: "One-line subtitle"
date: 2026-10-13
category: Hosting          # Decor, Hosting or Style
description: "Under 155 characters, used by Google and social shares"
tags: [fall decor, tablescape]
pin_title: "Optional Pinterest title"
pin_description: "Optional Pinterest description"
cover: "Optional image URL"   # leave out to use the colored cover
cover_alt: "Optional image description"
---
```

## Change site settings

`site.config.json` holds the name, tagline, site URL, author, Amazon tag and the three sections. `pages/` holds About, Affiliate disclosure and Privacy. `static/style.css` holds the design.

## Preview on your own computer (optional)

Install Node.js, then in this folder run `npm install` and `npm start`.

## See how many people read each post

The site is ready for Cloudflare Web Analytics, which is free and uses no cookies.

1. Create a free account at cloudflare.com and open Web Analytics.
2. Add a site, enter your Netlify address (for example houseandhabit.netlify.app), and choose the JavaScript snippet option.
3. Copy the token from the snippet. It is the long code after `"token":`.
4. Open `site.config.json` on GitHub, paste it between the quotes on the `cloudflareAnalyticsToken` line, and commit.

Netlify rebuilds the site and every page starts counting. Your numbers (page views, top posts, where readers came from, countries) appear in the Cloudflare dashboard.
