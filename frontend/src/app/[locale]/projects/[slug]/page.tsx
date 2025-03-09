import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getProjects, getProjectImages } from '../utils'
import { compileMDX } from 'next-mdx-remote/rsc'

type Props = {
  params: {
    slug: string
    locale: string
  }
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const projects = getProjects(locale)
  return projects.map(project => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = params
  const projects = getProjects(locale)
  const project = projects.find(p => p.slug === slug)

  if (!project) notFound()

  const images = getProjectImages(slug)
  const heroImage = images[0]
  const galleryImages = images.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16">
        {heroImage && (
          <Image
            src={heroImage}
            alt={project.title}
            width={1920}
            height={1080}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        <h1 className="text-4xl font-bold mt-8 mb-4">{project.title}</h1>
        <p className="text-xl text-gray-300 mb-8">{project.summary}</p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Location</h3>
              <p className="text-white">{project.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Area</h3>
              <p className="text-white">{project.area}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400">Year</h3>
              <p className="text-white">{new Date(project.date).getFullYear()}</p>
            </div>
          </div>

          {/* MDX Content */}
          <article className="prose prose-invert">
            {project.content}
          </article>
        </div>

        {/* Achievements */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <ul className="space-y-3">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleryImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${project.title} gallery image ${index + 1}`}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>
    </div>
  )
}
