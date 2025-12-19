import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CodeBlock } from './components/code-block'
import {
  CounterDemo,
  PaginationDemo,
  SearchDemo,
  TabsDemo,
  ToggleDemo,
} from './components/demos'

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.VERCEL_URL || 'http://localhost:3000',
  },
}

const nightmareCode = `// This is what you're doing right now, isn't it?
const searchParams = new URLSearchParams(window.location.search)
const page = parseInt(searchParams.get('page') || '1')
const query = searchParams.get('q') || ''
const sortBy = searchParams.get('sort') || 'date'
const isAscending = searchParams.get('asc') === 'true'

// And when you need to update it... oh boy
const updateUrl = (key: string, value: string) => {
  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  // Do I push? Replace? What about history?
  // What about SSR? What about hydration?
  // What about type safety? LOL WHAT TYPE SAFETY
  window.history.pushState(null, '', url)
  // Oh wait, React didn't re-render. FUCK.
}`

const counterCode = `import { useQueryState, parseAsInteger } from 'nuqs'

function Counter() {
  const [count, setCount] = useQueryState(
    'count',
    parseAsInteger.withDefault(0)
  )

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}`

const typeSafeCode = `const [page, setPage] = useQueryState('page', parseAsInteger)
//     ^? number | null

const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
//     ^? number (never null, because you have a fucking default)`

const parsersCode = `import {
  parseAsString,
  parseAsInteger,
  parseAsFloat,
  parseAsBoolean,
  parseAsIsoDateTime,
  parseAsArrayOf,
  parseAsJson,
  parseAsStringEnum,
} from 'nuqs'

// All type-safe. All fucking work.`

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 px-4 text-center border-b border-zinc-800">
        <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">
          STOP FUCKING AROUND WITH URL STATE
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Just fucking use nuqs.
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
          You&apos;ve been manually parsing query strings, fighting with router
          state, and writing the same fucking boilerplate for years. That ends
          today.
        </p>
        <a
          href="https://nuqs.dev"
          className="btn-primary inline-block no-underline"
        >
          Get started
        </a>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        {/* The Problem */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-6">
            Your URL state is a fucking disaster.
          </h3>
          <p className="text-lg text-zinc-400 mb-8">
            You&apos;ve been building web apps for how long now? And you&apos;re
            still manually parsing{' '}
            <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
              window.location.search
            </code>
            , fighting with{' '}
            <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
              URLSearchParams
            </code>
            , or losing state on every fucking page refresh?
          </p>

          <div className="mb-8">
            <CodeBlock code={nightmareCode} filename="your-nightmare.tsx" />
          </div>

          <p className="text-lg text-zinc-400">
            You&apos;ve got 15 different ways to parse query strings across your
            codebase. Half of them don&apos;t handle edge cases. The other half
            are copy-pasted from Stack Overflow circa 2016.
          </p>
          <p className="text-lg text-zinc-400 mt-4">
            <strong className="text-white">This is the hell you chose.</strong>{' '}
            And for what?{' '}
            <em>&ldquo;I don&apos;t need a library for this&rdquo;</em>? Give me
            a fucking break.
          </p>
        </section>

        <hr />

        {/* What is nuqs */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-6">
            What the fuck is nuqs?
          </h3>
          <p className="text-lg text-zinc-400 mb-8">
            nuqs is a type-safe search params state manager for React. Instead
            of fucking around with manual URL parsing, you use it like{' '}
            <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
              useState
            </code>
            , except the state lives in the URL.
          </p>

          <p className="text-lg text-zinc-400 mb-4">
            Want a counter that survives page refresh? Here&apos;s all you
            fucking need:
          </p>

          <div className="mb-8">
            <CodeBlock code={counterCode} filename="counter.tsx" />
          </div>

          <p className="text-lg text-zinc-400">
            No manual parsing. No type coercion bullshit. No fucking around with
            <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded ml-1 text-sm">
              router.push
            </code>
            . It just works.
          </p>
        </section>

        <hr />

        {/* Why it's great */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-8">
            Why it&apos;s fucking great
          </h3>

          <div className="space-y-12">
            <div>
              <h4 className="text-2xl font-bold mb-3">
                Type-safety, do you speak it?
              </h4>
              <p className="text-zinc-400 mb-4 text-lg">
                Every parser knows its type.{' '}
                <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                  parseAsInteger
                </code>{' '}
                gives you a{' '}
                <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                  number
                </code>
                .{' '}
                <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                  parseAsBoolean
                </code>{' '}
                gives you a{' '}
                <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                  boolean
                </code>
                . TypeScript infers everything. No more
                <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded ml-1 text-sm">
                  as any
                </code>{' '}
                lying to TypeScript bullshit.
              </p>
              <CodeBlock code={typeSafeCode} lang="typescript" />
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                Shareable fucking state
              </h4>
              <p className="text-zinc-400 mb-4 text-lg">
                Copy the URL. Send it to someone. They get the exact same
                fucking state. Filters, pagination, search queries, tabs,
                everything. No more{' '}
                <em>
                  &ldquo;can you send me a screenshot of what you&apos;re
                  seeing?&rdquo;
                </em>
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                Back button actually works
              </h4>
              <p className="text-zinc-400 mb-4 text-lg">
                Because state is in the URL, browser history just fucking works.
                Users can navigate back and forth. Bookmarks work. Deep links
                work. It&apos;s how the web has been working since the 1990's.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                SSR &amp; Static Export
              </h4>
              <p className="text-zinc-400 mb-4 text-lg">
                Works with Next.js App Router, Pages Router, Remix, React
                Router, you name it. Server-side rendering? ✓ Static export? ✓
                This very page is static and it uses nuqs. Look at the fucking
                URL.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                Built-in parsers for everything
              </h4>
              <p className="text-zinc-400 mb-4 text-lg">
                Strings, integers, floats, booleans, dates, arrays, JSON, enums,
                literals... Need something custom? Make your own fucking parser
                in 5 lines.
              </p>
              <CodeBlock code={parsersCode} lang="typescript" />
            </div>
          </div>
        </section>

        <hr />

        {/* Live Demos */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-8">
            See it in fucking action
          </h3>
          <p className="text-lg text-zinc-400 mb-8">
            Play with these demos. Watch the URL change. Refresh the page. Copy
            the URL and open it in a new tab. It all just fucking works.
          </p>

          <div className="space-y-8">
            <Suspense
              fallback={<div className="demo-card animate-pulse h-32" />}
            >
              <div>
                <h4 className="text-lg font-semibold mb-3">Counter Demo</h4>
                <CounterDemo />
              </div>
            </Suspense>

            <Suspense
              fallback={<div className="demo-card animate-pulse h-32" />}
            >
              <div>
                <h4 className="text-lg font-semibold mb-3">Search Input</h4>
                <SearchDemo />
              </div>
            </Suspense>

            <Suspense
              fallback={<div className="demo-card animate-pulse h-32" />}
            >
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  Toggle Preferences
                </h4>
                <ToggleDemo />
              </div>
            </Suspense>

            <Suspense
              fallback={<div className="demo-card animate-pulse h-32" />}
            >
              <div>
                <h4 className="text-lg font-semibold mb-3">Tab Navigation</h4>
                <TabsDemo />
              </div>
            </Suspense>

            <Suspense
              fallback={<div className="demo-card animate-pulse h-32" />}
            >
              <div>
                <h4 className="text-lg font-semibold mb-3">Pagination</h4>
                <PaginationDemo />
              </div>
            </Suspense>
          </div>
        </section>

        <hr />

        {/* Objections */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-8">
            &ldquo;But wait...&rdquo;
          </h3>

          <div className="space-y-10">
            <div>
              <h4 className="text-2xl font-bold mb-3">
                &ldquo;I can just use URLSearchParams!&rdquo;
              </h4>
              <p className="text-zinc-400 text-lg">
                Sure, you can also write your own HTTP client instead of using
                fetch. You <em>can</em> do a lot of things. Doesn&apos;t mean
                you fucking should. URLSearchParams doesn&apos;t give you type
                safety, doesn&apos;t integrate with React state, doesn&apos;t
                handle SSR, and doesn&apos;t respect your fucking time.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                &ldquo;It&apos;s another dependency!&rdquo;
              </h4>
              <p className="text-zinc-400 text-lg">
                It&apos;s 6KB gzipped. You&apos;re already shipping 400KB of
                fucking JavaScript. This isn&apos;t the dependency to worry
                about: it&apos;s the one that&apos;ll save you from maintaining
                400 lines of URL parsing bullshit.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                &ldquo;Not everything should be in the URL!&rdquo;
              </h4>
              <p className="text-zinc-400 text-lg">
                Indeed. And nuqs doesn&apos;t force you to put everything there.
                Use it for what makes fucking sense: filters, pagination, search
                queries, active tabs, modal states. The stuff users expect to be
                shareable and bookmarkable. Keep your ephemeral UI state in
                regular{' '}
                <code className="text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                  useState
                </code>
                .
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                &ldquo;What about sensitive data?&rdquo;
              </h4>
              <p className="text-zinc-400 text-lg">
                Don&apos;t put fucking passwords in the URL. This is basic web
                security. nuqs is for shareable state, not secrets.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                &ldquo;What about security? XSS?&rdquo;
              </h4>
              <p className="text-zinc-400 text-lg">
                Don&apos;t eval the fucking URL. Parsers can keep your app safe,
                but don't fuck around in there. If you're doing a{' '}
                <code className="text-zinc-3000 bg-zinc-900 px-1.5 py-0.5 rounded text-sm text-nowrap">
                  ?redirect=&lt;url&gt;
                </code>
                , make sure your parser handles it (eg: with{' '}
                <code className="text-zinc-3000 bg-zinc-900 px-1.5 py-0.5 rounded text-sm text-nowrap">
                  startsWith('/')
                </code>
                ) to avoid open redirects.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-3">
                I use TanStack Router/Start, do I need nuqs?
              </h4>
              <p className="text-zinc-400 text-lg">
                <em>Need?</em> No. TanStack Router has built-in support for
                type-safe URL state management. It's fucking awesome. If you're
                already using it, use its APIs, you're going to have a fucking
                great DX.
                <br />
                But nuqs is compatible with it so you can use components from
                3rd party sources that rely on nuqs in your TanStack app.
              </p>
            </div>
          </div>
        </section>

        <hr />

        {/* When to use */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-8">
            When should you use nuqs?
          </h3>

          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Building filters or search?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Need pagination?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Tab navigation?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Modal or drawer state?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                User preferences that should be shareable?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Any public state that should survive page refresh?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Want to stop fucking around?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
          </ul>
        </section>

        <hr />

        {/* CTA */}
        <section className="pt-12 pb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Just fucking use{' '}
            <a
              href="https://nuqs.dev"
              className="underline decoration-2 underline-offset-4"
            >
              nuqs
            </a>
            .
          </h2>
          <h3 className="text-2xl font-bold text-zinc-400 mb-8">
            Stop overthinking. Start building.
          </h3>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
            nuqs isn&apos;t perfect. Nothing is. But it solves real problems
            that URL state management has had for years. So stop reading
            articles, stop watching comparison videos, stop asking Twitter.
          </p>
          <p className="text-3xl font-bold mb-8">
            Just fucking use{' '}
            <span className="underline decoration-2 underline-offset-4">
              nuqs
            </span>
            .
          </p>
          <a
            href="https://nuqs.dev/docs/installation"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-lg no-underline"
          >
            pnpm add nuqs
          </a>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-zinc-500 border-t border-zinc-800">
          <p className="mb-4">
            Inspired by{' '}
            <a
              href="https://justfuckingusetailwind.com"
              rel="noopener noreferrer"
            >
              justfuckingusetailwind.com
            </a>
            ,{' '}
            <a
              href="https://justfuckinguseeffect.dev/"
              rel="noopener noreferrer"
            >
              justfuckinguseeffect.dev
            </a>
            ,{' '}
            <a
              href="https://motherfuckingwebsite.com"
              rel="noopener noreferrer"
            >
              motherfuckingwebsite.com
            </a>
            , and all the other fucking websites.
          </p>
          <p>
            Slop by Claude Opus 4.5, prompted by{' '}
            <a href="https://bsky.app/profile/francoisbest.com">
              François Best
            </a>
            , powered by{' '}
            <a href="https://nextjs.org" rel="noopener noreferrer">
              Next.js
            </a>
            ,{' '}
            <a href="https://tailwindcss.com" rel="noopener noreferrer">
              Tailwind
            </a>
            , and obviously{' '}
            <a href="https://nuqs.dev" rel="noopener noreferrer">
              nuqs
            </a>
            .
          </p>
          <p className="mt-4">
            <a href="https://github.com/47ng/nuqs" rel="noopener noreferrer">
              GitHub
            </a>
            {' · '}
            <a href="https://nuqs.dev" rel="noopener noreferrer">
              Documentation
            </a>
            {' · '}
            <a href="https://x.com/nuqs47ng" rel="noopener noreferrer">
              @nuqs47ng
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
