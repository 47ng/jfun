'use client'

import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs'

export function CounterDemo() {
  const [count, setCount] = useQueryState(
    'count',
    parseAsInteger.withDefault(0)
  )

  return (
    <div className="demo-card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold">{count}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-xl font-bold transition-colors"
          >
            -
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-xl font-bold transition-colors"
          >
            +
          </button>
          <button
            onClick={() => setCount(null)}
            className="px-3 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-400">
        Click the buttons. Watch the fucking URL. Refresh the page. It&apos;s
        still there.
      </p>
    </div>
  )
}

export function SearchDemo() {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

  return (
    <div className="demo-card">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value || null)}
        placeholder="Type something..."
        className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:border-pink-400 focus:outline-none transition-colors"
      />
      <p className="mt-4 text-sm text-slate-400">
        {query ? (
          <>
            Searching for:{' '}
            <span className="text-pink-400">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          'Type something and share the fucking URL'
        )}
      </p>
    </div>
  )
}

export function ToggleDemo() {
  const [darkMode, setDarkMode] = useQueryState(
    'dark',
    parseAsBoolean.withDefault(false)
  )
  const [showNotifications, setShowNotifications] = useQueryState(
    'notifs',
    parseAsBoolean.withDefault(true)
  )
  const [compactView, setCompactView] = useQueryState(
    'compact',
    parseAsBoolean.withDefault(false)
  )

  return (
    <div className="demo-card space-y-4">
      <label className="flex items-center justify-between cursor-pointer">
        <span>Dark Mode</span>
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`w-14 h-8 rounded-full transition-colors ${
            darkMode ? 'bg-pink-500' : 'bg-slate-600'
          }`}
        >
          <span
            className={`block w-6 h-6 bg-white rounded-full transition-transform mx-1 ${
              darkMode ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </label>
      <label className="flex items-center justify-between cursor-pointer">
        <span>Notifications</span>
        <button
          onClick={() => setShowNotifications((n) => !n)}
          className={`w-14 h-8 rounded-full transition-colors ${
            showNotifications ? 'bg-pink-500' : 'bg-slate-600'
          }`}
        >
          <span
            className={`block w-6 h-6 bg-white rounded-full transition-transform mx-1 ${
              showNotifications ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </label>
      <label className="flex items-center justify-between cursor-pointer">
        <span>Compact View</span>
        <button
          onClick={() => setCompactView((c) => !c)}
          className={`w-14 h-8 rounded-full transition-colors ${
            compactView ? 'bg-pink-500' : 'bg-slate-600'
          }`}
        >
          <span
            className={`block w-6 h-6 bg-white rounded-full transition-transform mx-1 ${
              compactView ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </label>
      <p className="text-sm text-slate-400">
        Toggle these. Copy the URL. Send it. Recipient gets your exact fucking
        preferences.
      </p>
    </div>
  )
}

export function UrlPreview() {
  if (typeof window === 'undefined') {
    return <div className="url-display">Loading...</div>
  }

  return <UrlPreviewClient />
}

function UrlPreviewClient() {
  const [, forceUpdate] = useQueryState('_', { shallow: true })

  // Re-render on any state change
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return <div className="url-display">{url || 'Loading...'}</div>
}

export function TabsDemo() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault('overview')
  )

  const tabs = ['overview', 'features', 'pricing', 'docs']

  return (
    <div className="demo-card">
      <div className="flex gap-1 mb-4 p-1 bg-slate-800 rounded-lg">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              tab === t
                ? 'bg-pink-500 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 bg-slate-800/50 rounded-lg">
        <p className="text-slate-300">
          {tab === 'overview' && 'Welcome to the fucking overview.'}
          {tab === 'features' && 'Look at all these fucking features.'}
          {tab === 'pricing' && "It's fucking free. Open source."}
          {tab === 'docs' && 'Read the fucking docs at nuqs.dev'}
        </p>
      </div>
      <p className="mt-4 text-sm text-slate-400">
        Deep linking to tabs? It just fucking works.
      </p>
    </div>
  )
}

export function PaginationDemo() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  return (
    <div className="demo-card">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
              page === p
                ? 'bg-pink-500 text-white'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(5, p + 1))}
          disabled={page >= 5}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-400 text-center">
        Page {page} of 5. Share this URL. Back button works. Fucking magic.
      </p>
    </div>
  )
}
