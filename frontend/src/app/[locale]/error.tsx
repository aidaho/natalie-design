"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import PageLayout from "@/components/PageLayout"
import RichText from "@/components/RichText"

type Props = {
  error: Error
  reset(this: void): void
}

export default function Error({ error, reset }: Props) {
  const t = useTranslations("Error")

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <PageLayout title={t("title")}>
      <div>
        <RichText>
          {tags => t.rich("description", {
            ...tags,
            retry: (chunks) => (
              <button
                className="text-white underline underline-offset-2"
                onClick={() => reset()}
                type="button"
              >
                {chunks}
              </button>
            ),
          })}
        </RichText>
      </div>
    </PageLayout>
  )
}
