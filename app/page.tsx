import { Suspense } from 'react'
import { CodeBlock } from './components/code-block'
import {
  CounterDemo,
  PaginationDemo,
  SearchDemo,
  TabsDemo,
  ToggleDemo,
} from './components/demos'

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
  window.history.pushState({}, '', url)
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
      <section className="py-20 px-4 text-center border-b border-slate-800">
        <p className="text-slate-500 uppercase tracking-widest text-sm mb-4">
          STOP FUCKING AROUND WITH URL STATE
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Just Fucking Use <span className="gradient-text">nuqs</span>.
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
          You&apos;ve been manually parsing query strings, fighting with router
          state, and writing the same fucking boilerplate for years. That ends
          today.
        </p>
        <a
          href="https://nuqs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          Get started →
        </a>
      </section>

      <div className="max-w-4xl mx-auto px-4">
        {/* The Problem */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-6">
            Your URL state is a fucking disaster.
          </h3>
          <p className="text-lg text-slate-400 mb-8">
            You&apos;ve been building web apps for how long now? And you&apos;re
            still manually parsing{' '}
            <code className="text-pink-400">window.location.search</code>,
            fighting with <code className="text-pink-400">URLSearchParams</code>
            , and losing state on every fucking page refresh?
          </p>

          <div className="mb-8">
            <CodeBlock code={nightmareCode} filename="your-nightmare.tsx" />
          </div>

          <p className="text-lg text-slate-400">
            You&apos;ve got 15 different ways to parse query strings across your
            codebase. Half of them don&apos;t handle edge cases. The other half
            are copy-pasted from Stack Overflow circa 2016.
          </p>
          <p className="text-lg text-slate-400 mt-4">
            <strong className="text-white">This is the hell you chose.</strong>{' '}
            And for what? &ldquo;I don&apos;t need a library for this&rdquo;?
            Give me a fucking break.
          </p>
        </section>

        <hr />

        {/* What is nuqs */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-6">
            What the fuck is nuqs?
          </h3>
          <p className="text-lg text-slate-400 mb-8">
            nuqs is a type-safe search params state manager for React. Instead
            of fucking around with manual URL parsing, you use it like{' '}
            <code className="text-pink-400">useState</code>—except the state
            lives in the URL.
          </p>

          <p className="text-lg text-slate-400 mb-4">
            Want a counter that survives page refresh? Here&apos;s all you
            fucking need:
          </p>

          <div className="mb-8">
            <CodeBlock code={counterCode} filename="counter.tsx" />
          </div>

          <p className="text-lg text-slate-400">
            No manual parsing. No type coercion bullshit. No fucking around with
            <code className="text-pink-400 ml-1">router.push</code>. It just
            works.
          </p>
        </section>

        <hr />

        {/* Why it's great */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-8">
            Why it&apos;s fucking great
          </h3>

          <div className="space-y-12">
            <div>
              <h4 className="text-xl font-bold mb-3">
                Type-safe, you fucking donkey
              </h4>
              <p className="text-slate-400 mb-4">
                Every parser knows its type.{' '}
                <code className="text-pink-400">parseAsInteger</code> gives you
                a <code className="text-pink-400">number</code>.{' '}
                <code className="text-pink-400">parseAsBoolean</code> gives you
                a <code className="text-pink-400">boolean</code>. TypeScript
                infers everything. No more
                <code className="text-pink-400 ml-1">as any</code> bullshit.
              </p>
              <CodeBlock code={typeSafeCode} lang="typescript" />
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                Shareable fucking state
              </h4>
              <p className="text-slate-400 mb-4">
                Copy the URL. Send it to someone. They get the exact same state.
                Filters, pagination, search queries, tabs—everything. No more
                &ldquo;can you send me a screenshot of what you&apos;re
                seeing?&rdquo;
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                Back button actually works
              </h4>
              <p className="text-slate-400 mb-4">
                Because state is in the URL, browser history just fucking works.
                Users can navigate back and forth. Bookmarks work. Deep links
                work. It&apos;s how the web was supposed to fucking work.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                SSR &amp; Static Export
              </h4>
              <p className="text-slate-400 mb-4">
                Works with Next.js App Router, Pages Router, Remix, React
                Router—you name it. Server-side rendering? ✓ Static export? ✓
                This very page is statically exported with nuqs. Look at the
                fucking URL.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                Built-in parsers for everything
              </h4>
              <p className="text-slate-400 mb-4">
                Strings, integers, floats, booleans, dates, arrays, JSON, enums,
                literals... Need something custom? Make your own parser in 5
                lines.
              </p>
              <CodeBlock code={parsersCode} lang="typescript" />
            </div>
          </div>
        </section>

        <hr />

        {/* Live Demos */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-8">
            See it in fucking action
          </h3>
          <p className="text-lg text-slate-400 mb-8">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-8">
            &ldquo;But wait...&rdquo;
          </h3>

          <div className="space-y-10">
            <div>
              <h4 className="text-xl font-bold mb-3">
                &ldquo;I can just use URLSearchParams!&rdquo;
              </h4>
              <p className="text-slate-400">
                Sure, and you can also write your own HTTP client instead of
                using fetch. You <em>can</em> do a lot of things. Doesn&apos;t
                mean you fucking should. URLSearchParams doesn&apos;t give you
                type safety, doesn&apos;t integrate with React state,
                doesn&apos;t handle SSR, and doesn&apos;t respect your time.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                &ldquo;It&apos;s another dependency!&rdquo;
              </h4>
              <p className="text-slate-400">
                It&apos;s 4KB gzipped. You&apos;re already shipping 400KB of
                JavaScript. This isn&apos;t the dependency to worry
                about—it&apos;s the one that&apos;ll save you from writing 400
                lines of URL parsing bullshit.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                &ldquo;Not everything should be in the URL!&rdquo;
              </h4>
              <p className="text-slate-400">
                Correct! And nuqs doesn&apos;t force you to put everything
                there. Use it for what makes sense: filters, pagination, search
                queries, active tabs, modal states. The stuff users expect to be
                shareable and bookmarkable. Keep your ephemeral UI state in
                regular <code className="text-pink-400">useState</code>.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">
                &ldquo;What about sensitive data?&rdquo;
              </h4>
              <p className="text-slate-400">
                Don&apos;t put passwords in the URL. Jesus fucking Christ. This
                is basic web security. nuqs is for shareable state, not secrets.
              </p>
            </div>
          </div>
        </section>

        <hr />

        {/* When to use */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-8">
            When should you use nuqs?
          </h3>

          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                Building filters or search?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                Need pagination?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                Tab navigation?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                Modal or drawer state?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                User preferences that should be shareable?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                Any state that should survive page refresh?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400">•</span>
              <span className="text-slate-300">
                Want to stop fucking around?{' '}
                <strong className="text-white">Use nuqs.</strong>
              </span>
            </li>
          </ul>
        </section>

        <hr />

        {/* CTA */}
        <section className="py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Just Fucking Use <span className="gradient-text">nuqs</span>.
          </h2>
          <h3 className="text-2xl font-bold text-pink-400 mb-8">
            Stop overthinking. Start building.
          </h3>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            nuqs isn&apos;t perfect. Nothing is. But it solves real problems
            that URL state management has had for years. So stop reading
            articles, stop watching comparison videos, stop asking Twitter.
          </p>
          <p className="text-3xl font-bold mb-8">
            Just fucking use <span className="gradient-text">nuqs</span>.
          </p>
          <a
            href="https://nuqs.dev/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block text-lg"
          >
            npm i nuqs →
          </a>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center text-slate-500 border-t border-slate-800">
          <p className="mb-4">
            Inspired by{' '}
            <a
              href="https://justfuckingusetailwind.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              justfuckingusetailwind.com
            </a>
            ,{' '}
            <a
              href="https://motherfuckingwebsite.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              motherfuckingwebsite.com
            </a>
            , and all the other fucking websites.
          </p>
          <p>
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>
            ,{' '}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind
            </a>
            , and obviously{' '}
            <a
              href="https://nuqs.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400"
            >
              nuqs
            </a>
            .
          </p>
          <p className="mt-4">
            <a
              href="https://github.com/47ng/nuqs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {' · '}
            <a
              href="https://nuqs.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            {' · '}
            <a
              href="https://twitter.com/fortysevenfx"
              target="_blank"
              rel="noopener noreferrer"
            >
              @fortysevenfx
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}
