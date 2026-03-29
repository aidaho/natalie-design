import { useTranslations } from "next-intl"
import { use } from "react"
import Image from "next/image"
import RichText from '@/components/RichText'

type Props = {
  params: Promise<{ locale: string }>
}

export default function WhatWeDoPage(props: Props) {
  const params = use(props.params)
  // Enable static rendering
  const locale = params.locale

  const t = useTranslations("WhatWeDoPage")

  const TileRow = ({
    reverse,
    imageSrc,
    contentKey,
  }: {
    reverse: boolean
    imageSrc: string
    contentKey: "tile1" | "tile2" | "tile3"
  }) => (
    <div
      className={`grid ${reverse ? "md:grid-cols-[1fr_1fr]" : "md:grid-cols-[1fr_1fr]"} grid-cols-1 gap-8 w-full mb-16`}
    >
      {/* Image column */}
      <div
        className={`${reverse ? "md:order-2" : "md:order-1"} order-2 h-[480px] md:h-full relative`}
      >
        <div className="absolute inset-0 md:relative md:inset-auto md:h-full">
          <Image
            src={imageSrc}
            alt={t(`${contentKey}.alt`)}
            fill
            className="object-contain md:object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
      {/* Text column */}
      <div
        className={`${reverse ? "md:order-1" : "md:order-2"} order-1 px-4 md:px-8 py-4 md:py-8 flex items-center`}
      >
        <div className="prose max-w-2xl md:text-base text-sm w-full">
          <h2 className="text-header mb-4">
            {t(`${contentKey}.title`)}
          </h2>
          <br />
          <div className="whitespace-pre-line break-words">
            <RichText locale={locale}>
              {tags => t.rich(`${contentKey}.content`, tags)}
            </RichText>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <TileRow
        reverse={false}
        imageSrc="/what-we-do/commercial.jpg"
        contentKey="tile1"
      />
      <TileRow
        reverse={true}
        imageSrc="/what-we-do/private.jpg"
        contentKey="tile2"
      />
      <TileRow
        reverse={false}
        imageSrc="/what-we-do/supervision.jpg"
        contentKey="tile3"
      />
    </div>
  )
}
