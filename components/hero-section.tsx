interface HeroSectionProps {
  label: string
  title: string
  description?: string
}

export function HeroSection({ label, title, description }: HeroSectionProps) {
  return (
    <div className="bg-secondary rounded-3xl p-8 md:p-12">
      <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
        {label}
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-balance">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
