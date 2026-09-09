# Zoneon Website

A self-contained static homepage for Zoneon Technologies, ready to deploy through Cloudflare Pages.

## Deploy with Cloudflare Pages

1. Push this repository to GitHub.
2. In Cloudflare, create a Pages project from that repository.
3. Leave the build command empty and use `/` as the output directory.
4. Attach the existing domain in the Pages custom-domain settings.

## Site direction

- The homepage presents a complete protected appliance that can power multiple sector-specific solutions without heavy technical language.
- Its primary model is local LAN deployment, including fully air-gapped operation with no public internet connection required.
- VPS / Cloud is presented as an optional extension for solutions that need wider reach.
- The solution cards can later become dedicated pages or live demos.

The contact section invites beta partnerships at `sales@zoneon.net`.

## Search and sharing metadata

The HTML head includes a search description, Open Graph sharing metadata, and a summary card using the circular logo. The canonical website URL is `https://zoneon.net/`. Keep the search and sharing descriptions consistent when editing them. Publish `index.html` and the referenced logo asset together for public link previews to use the updates.
