import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { OkirPattern } from "@/components/decorative/OkirPattern";
import { JobCard } from "@/components/cards/JobCard";
import { mockJobs } from "@/data/mockJobs";

const features = [
  {
    icon: Briefcase,
    title: "Quality Opportunities",
    description: "Curated part-time jobs perfect for student schedules and skill development.",
  },
  {
    icon: Users,
    title: "Trusted Employers",
    description: "Connect with verified campus departments and local businesses.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All listings are reviewed to ensure student safety and fair compensation.",
  },
  {
    icon: Sparkles,
    title: "Build Your Future",
    description: "Gain valuable experience and skills while earning during your studies.",
  },
];

const stats = [
  { value: "500+", label: "Active Jobs" },
  { value: "2,000+", label: "Students Hired" },
  { value: "150+", label: "Partner Companies" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative Okir patterns */}
        <div className="absolute top-10 left-10 opacity-20">
          <svg viewBox="0 0 200 200" className="w-64 h-64 text-gold-warm">
            <path
              d="M100 20 Q60 60 20 50 Q10 100 50 140 Q100 180 150 140 Q190 100 180 50 Q140 60 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <svg viewBox="0 0 200 200" className="w-48 h-48 text-gold-warm rotate-180">
            <path
              d="M100 20 Q60 60 20 50 Q10 100 50 140 Q100 180 150 140 Q190 100 180 50 Q140 60 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-warm/10 border border-gold-warm/30 mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-gold-bright" />
              <span className="text-gold-bright text-sm font-medium">MSU's Official Part-Time Job Portal</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gold-bright leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Find Your Perfect
              <br />
              <span className="text-gold-gradient">Part-Time Job</span>
            </h1>

            <p className="text-gold-muted/80 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Connecting Mindanao State University students with quality part-time opportunities. 
              Empowering your future through Maranao excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/jobs">
                <Button variant="hero" size="xl">
                  Browse Jobs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/hire">
                <Button variant="hero-outline" size="xl">
                  Post a Job
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-gold-bright">{stat.value}</div>
                  <div className="text-gold-muted/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="hsl(var(--background))"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Why Choose MSU JobApp?
            </h2>
            <OkirPattern className="mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-gold-warm/50 transition-all duration-300 hover:shadow-card animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-maroon flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-maroon">
                  <feature.icon className="w-6 h-6 text-gold-bright" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Featured Jobs
              </h2>
              <p className="text-muted-foreground mt-2">Latest opportunities waiting for you</p>
            </div>
            <Link to="/jobs">
              <Button variant="outline" className="gap-2">
                View All Jobs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.slice(0, 3).map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-maroon relative overflow-hidden">
        <div className="absolute inset-0 okir-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-bright">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gold-muted/80 mt-4 text-lg">
              Join thousands of MSU students who have found meaningful part-time work through our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/jobs">
                <Button variant="gold" size="xl">
                  Find Jobs Now
                </Button>
              </Link>
              <Link to="/hire">
                <Button variant="hero-outline" size="xl">
                  Hire Students
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
