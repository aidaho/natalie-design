import { ReactNode } from 'react'

// These tags are available
type Tag = 'title' | 'h2' | 'h3' | 'p' | 'b' | 'i' | 'link2projects'

type Props = {
  children(this: void, tags: Record<Tag, (chunks: ReactNode, attributes?: { href?: string }) => ReactNode>): ReactNode
  locale?: string
}

export default function RichText({ children, locale }: Props) {
  return (
    <div className="prose">
      {children({
        title: (chunks: ReactNode) => <h2>{chunks}</h2>,
        h2: (chunks: ReactNode) => <h2>{chunks}</h2>,
        h3: (chunks: ReactNode) => <h3>{chunks}</h3>,
        p: (chunks: ReactNode) => <p>{chunks}</p>,
        b: (chunks: ReactNode) => <b>{chunks}</b>,
        i: (chunks: ReactNode) => <i>{chunks}</i>,
        link2projects: (chunks: ReactNode) => (
          <a href={`/${locale || 'en'}/projects`}>
            {chunks}
          </a>
        ),
      })}
    </div>
  )
}
