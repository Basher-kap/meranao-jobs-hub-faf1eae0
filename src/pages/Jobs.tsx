import { useState } from "react";
import { Search, Filter, MapPin, Briefcase, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { JobCard } from "@/components/cards/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockJobs } from "@/data/mockJobs";

const jobTypes = ["All", "Part-Time", "Flexible", "Weekend"];
const locations = ["All Locations", "Main Campus", "Tech Center", "Remote/Flexible"];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesLocation = selectedLocation === "All Locations" || job.location.includes(selectedLocation.replace("All Locations", ""));
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-maroon py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-gold-bright">
              Find Part-Time Jobs
            </h1>
            <p className="text-gold-muted/80 mt-4 text-lg">
              Discover opportunities that fit your schedule and build your career
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-card rounded-2xl p-3 shadow-maroon">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search jobs, companies, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 border-0 bg-muted/50 focus-visible:ring-gold-warm"
                  />
                </div>
                <Button variant="gold" size="lg" className="h-12 px-8">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-72 shrink-0">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-gold-warm" />
                  <h3 className="font-display font-semibold text-foreground">Filters</h3>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gold-warm" />
                    Job Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {jobTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          selectedType === type
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-warm" />
                    Location
                  </h4>
                  <div className="flex flex-col gap-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                          selectedLocation === location
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedType("All");
                    setSelectedLocation("All Locations");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> jobs
                </p>
                <select className="bg-muted text-foreground text-sm rounded-lg px-3 py-2 border-0 focus:ring-2 focus:ring-gold-warm">
                  <option>Most Recent</option>
                  <option>Highest Pay</option>
                  <option>Most Relevant</option>
                </select>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid gap-4">
                  {filteredJobs.map((job, index) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 0.05}s` } as React.CSSProperties}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No Jobs Found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
