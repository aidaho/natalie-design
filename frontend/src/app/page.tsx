import { redirect } from "next/navigation"
import { routing } from "@/i18n/routing"
                                                                                                                                              // This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  // Redirect to default locale's projects page
  redirect(`/${routing.defaultLocale}/projects`)
}
