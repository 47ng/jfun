import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
}

export async function CodeBlock({
  code,
  lang = 'tsx',
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: 'github-dark',
  })

  return (
    <div className="code-block">
      {filename && (
        <div className="text-slate-500 mb-2 text-xs">{filename}</div>
      )}
      <div
        className="[&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:text-sm [&_code]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
