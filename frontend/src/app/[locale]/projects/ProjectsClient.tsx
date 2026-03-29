"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import type { ProjectData } from "./utils"

export default function ProjectsClient({
  projects,
  types,
  locale,
}: {
  projects: ProjectData[]
  types: string[]
  locale: string
}) {
  const [selectedType, setSelectedType] = useState("All")

  // Initialize from URL hash on component mount
  useEffect(() => {
    const hash = window.location.hash.substring(1) // Remove the '#'
    if (hash && types.includes(hash)) {
      setSelectedType(hash)
    }
  }, [types])

  // Update URL hash when filter changes
  useEffect(() => {
    if (selectedType === "All") {
      // Remove hash if "All" is selected
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname)
      }
    } else {
      // Update hash with selected type
      const newHash = `#${selectedType}`
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash)
      }
    }
  }, [selectedType])

  const handleTypeClick = (type: string) => {
    setSelectedType(type)
  }

  const filteredProjects =
    selectedType === "All"
      ? projects
      : projects.filter(p => p.type === selectedType)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex gap-4 flex-wrap justify-center">
        {types.map(type => (
          <button
            key={type}
            onClick={() => handleTypeClick(type)}
            className={`px-4 py-2 lg ${
              type === selectedType
                ? "btn-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Link
            key={project.slug}
            href={`/${locale}/projects/${project.slug}`}
            className="group block overflow-hidden lg transition-shadow"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={project.image.path}
                alt={project.title}
                height={500}
                width={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="pt-2 pb-4 pl-0">
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
