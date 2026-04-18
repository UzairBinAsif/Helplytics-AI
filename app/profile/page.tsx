"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ContentCard } from "@/components/content-card"
import { Tag } from "@/components/tag"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/context"

export default function ProfilePage() {
  const router = useRouter()
  const { currentUser, setCurrentUser } = useApp()

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [skills, setSkills] = useState("")
  const [interests, setInterests] = useState("")

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    } else {
      setName(currentUser.name)
      setLocation(currentUser.location)
      setSkills(currentUser.skills.join(", "))
      setInterests(currentUser.interests.join(", "))
    }
  }, [currentUser, router])

  if (!currentUser) {
    return null
  }

  const handleSave = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name,
        location,
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        interests: interests.split(",").map((i) => i.trim()).filter(Boolean),
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dashboard" />

      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 mb-8">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            PROFILE
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
            {currentUser.name}
          </h1>
          <p className="text-gray-400 text-sm">
            {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} • {currentUser.location}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Skills and Reputation */}
          <ContentCard label="PUBLIC PROFILE" title="Skills and reputation">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Trust score</span>
                <span className="font-semibold">{currentUser.trustScore}%</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground">Contributions</span>
                <span className="font-semibold">{currentUser.contributions}</span>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium text-foreground mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill) => (
                    <Tag key={skill} variant="default">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium text-foreground mb-3">Badges</p>
                <div className="flex flex-wrap gap-2">
                  {currentUser.badges.map((badge) => (
                    <Tag key={badge} variant="primary">
                      {badge}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </ContentCard>

          {/* Edit Profile */}
          <ContentCard label="EDIT PROFILE" title="Update your identity">
            <div className="space-y-6">
              {/* Name and Location Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Figma, UI/UX, HTML/CSS, Career Guidance"
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interests
                </label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Hackathons, UI/UX, Community Building"
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-base font-medium"
              >
                Save profile
              </Button>
            </div>
          </ContentCard>
        </div>
      </main>
    </div>
  )
}
