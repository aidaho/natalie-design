import {useTranslations} from 'next-intl'
import {ReactNode} from 'react'
import ExternalLink from './ExternalLink'

type Props = {
  children?: ReactNode;
  title: ReactNode;
};

export default function PageLayout({children, title}: Props) {
  const t = useTranslations('PageLayout')

  return (
    <div className="bg-slate-850 relative flex grow flex-col py-36">
      <div className="container relative flex grow flex-col px-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <div className="mt-6 md:text-lg">{children}</div>
        <div className="mt-auto grid grid-cols-1 gap-4 pt-20 md:grid-cols-2 lg:gap-12">
          <ExternalLink
            description={t('links.docs.description')}
            href={t('links.docs.href')}
            title={t('links.docs.title')}
          />
          <ExternalLink
            description={t('links.source.description')}
            href={t('links.source.href')}
            title={t('links.source.title')}
          />
        </div>
      </div>
    </div>
  )
}
