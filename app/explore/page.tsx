"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ContentCard } from "@/components/content-card"
import { RequestCard } from "@/components/request-card"
import { useApp } from "@/lib/context"

export default function ExplorePage() {
  const { requests } = useApp()

  const [categoryFilter, setCategoryFilter] = useState("All categories")
  const [urgencyFilter, setUrgencyFilter] = useState("All urgency levels")
  const [skillsFilter, setSkillsFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const filteredRequests = requests.filter((request) => {
    if (categoryFilter !== "All categories" && request.category !== categoryFilter) {
      return false
    }
    if (urgencyFilter !== "All urgency levels") {
      const urgencyMap: Record<string, string> = {
        "High": "high",
        "Medium": "medium",
        "Low": "low",
      }
      if (request.urgency !== urgencyMap[urgencyFilter]) {
        return false
      }
    }
    if (skillsFilter) {
      const skills = skillsFilter.toLowerCase().split(",").map((s) => s.trim())
      const requestTags = request.tags.map((t) => t.toLowerCase())
      if (!skills.some((skill) => requestTags.some((tag) => tag.includes(skill)))) {
        return false
      }
    }
    if (locationFilter) {
      const locations = locationFilter.toLowerCase().split(",").map((l) => l.trim())
      if (!locations.some((loc) => request.authorLocation.toLowerCase().includes(loc))) {
        return false
      }
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        <HeroSection
          label="EXPLORE / FEED"
          title="Browse help requests with filterable community context."
          description="Filter by category, urgency, skills, and location to surface the best matches."
        />

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <ContentCard label="FILTERS" title="Refine the feed">
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option>All categories</option>
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Career</option>
                    <option>Data Science</option>
                    <option>Mobile Development</option>
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Urgency
                  </label>
                  <select
                    value={urgencyFilter}
                    onChange={(e) => setUrgencyFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option>All urgency levels</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={skillsFilter}
                    onChange={(e) => setSkillsFilter(e.target.value)}
                    placeholder="React, Figma, Git/GitHub"
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="Karachi, Lahore, Remote"
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </ContentCard>
          </div>

          {/* Request Feed */}
          <div className="md:col-span-3 space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <RequestCard key={request.id} request={request} showDescription />
              ))
            ) : (
              <ContentCard>
                <p className="text-muted-foreground text-center py-8">
                  No requests match your filters. Try adjusting your search criteria.
                </p>
              </ContentCard>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
