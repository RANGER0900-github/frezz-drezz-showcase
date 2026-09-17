import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Log error details for debugging
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

import { JSON_LD_STRUCTURED_DATA } from "@/lib/seo-data";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Frezz Drezz — 100% Real Freeze-Dried Fruit | Best Healthy Snack in Surat" },
      {
        name: "description",
        content:
          "Frezz Drezz in Surat, Gujarat: 100% pure freeze-dried fruit with zero added sugar, zero preservatives, and pure crunch. The ultimate healthy, guilt-free alternative to ice cream and sweet snacks. Delivered fresh across Surat.",
      },
      {
        name: "keywords",
        content:
          "Frezz Drezz, best healthy icecream in Surat, healthy ice cream alternative Surat, freeze dried fruit Surat, freeze dried fruits Gujarat, natural fruit snacks Surat, Jain snacks Surat, vegan healthy snacks Vesu, Adajan, Varachha, Althan, Pal, Piplod, Katargam, freeze dried strawberries Surat, zero sugar snacks Gujarat, pure fruit snacks India",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "Frezz Drezz" },
      { name: "geo.region", content: "IN-GJ" },
      { name: "geo.placename", content: "Surat, Gujarat, India" },
      { name: "geo.position", content: "21.1702;72.8311" },
      { name: "ICBM", content: "21.1702, 72.8311" },
      { name: "theme-color", content: "#FAF7F2" },
      { name: "msapplication-TileColor", content: "#C99A2E" },
      { property: "og:title", content: "Frezz Drezz — Pure Fruit Crunch | Healthy Ice Cream Alternative in Surat" },
      {
        property: "og:description",
        content:
          "Pure by nature, crisp by craft. 100% real fruit, zero added sugar, zero preservatives. Artisanal freeze-dried fruit dispatched across 34+ Surat localities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://frezzdrezz.com" },
      { property: "og:site_name", content: "Frezz Drezz" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: "https://frezzdrezz.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://frezzdrezz.com/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Frezz Drezz 100% Real Freeze-Dried Fruit in Surat" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@frezzdrezz" },
      { name: "twitter:title", content: "Frezz Drezz — 100% Real Freeze-Dried Fruit in Surat" },
      {
        name: "twitter:description",
        content:
          "Pure fruit crunch, zero added sugar. The premier healthy alternative to ice cream in Surat, Gujarat.",
      },
      { name: "twitter:image", content: "https://frezzdrezz.com/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://frezzdrezz.com" },
      { rel: "alternate", hrefLang: "en-IN", href: "https://frezzdrezz.com" },
      { rel: "alternate", hrefLang: "gu-IN", href: "https://frezzdrezz.com" },
      { rel: "alternate", hrefLang: "hi-IN", href: "https://frezzdrezz.com" },
      { rel: "alternate", hrefLang: "x-default", href: "https://frezzdrezz.com" },
      { rel: "dns-prefetch", href: "https://wa.me" },
      { rel: "dns-prefetch", href: "https://api.whatsapp.com" },
      { rel: "dns-prefetch", href: "https://www.instagram.com" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "alternate", type: "application/rss+xml", title: "Frezz Drezz Product Catalog", href: "https://frezzdrezz.com/google-merchant-feed.xml" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "apple-touch-icon-precomposed", href: "/apple-touch-icon-precomposed.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..900,0..100,0..1;1,9..144,400..900,0..100,0..1&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "preload", href: "/assets/logo-384.png", as: "image", type: "image/png" },
      { rel: "preload", href: "/assets/logo-128.png", as: "image", type: "image/png" },
      { rel: "preload", href: "/assets/frezz-drezz-logo.png", as: "image", type: "image/png" },
      { rel: "preload", href: "/assets/pineapple.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/assets/banana.webp", as: "image", type: "image/webp" },
      { rel: "preload", href: "/assets/strawberry.webp", as: "image", type: "image/webp" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_STRUCTURED_DATA) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  );
}
