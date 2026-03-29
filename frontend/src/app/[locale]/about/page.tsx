import { useTranslations } from "next-intl"
import Image from "next/image"
import RichText from '@/components/RichText'
import { use } from "react"

type Props = {
  params: Promise<{ locale: string }>
}

export default function AboutPage(props: Props) {
  const t = useTranslations("AboutPage")
  const params = use(props.params)
  // Enable static rendering
  const locale = params.locale

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Placeholder image - replace with actual image path */}
        <div className="md:w-1/2">
          <div className="relative h-[950px] lg">
            <Image
              alt="About"
              fill
              className="object-cover lg"
              src="/images/About.jpg" // Temporary placeholder
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
          <div className="text-lg leading-relaxed whitespace-pre-line">
            <RichText locale={locale}>
              {tags => t.rich("description", tags)}
            </RichText>
          </div>
        </div>
      </div>
    </div>
  )
}
