import { useState } from "react";
import { Plus, Briefcase, Building, MapPin, DollarSign, Clock, FileText, CheckCircle, Tag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OkirPattern } from "@/components/decorative/OkirPattern";
import { useToast } from "@/hooks/use-toast";
import { JOB_CATEGORIES } from "@/data/mockJobs";

export default function Hire() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Part-Time",
    category: "",
    otherCategory: "",
    salary: "",
    description: "",
    requirements: "",
    contactEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Job Posted Successfully!",
      description: "Your job listing is now live and visible to students.",
    });

    setFormData({
      title: "",
      company: "",
      location: "",
      type: "Part-Time",
      category: "",
      otherCategory: "",
      salary: "",
      description: "",
      requirements: "",
      contactEmail: "",
    });
    setIsSubmitting(false);
  };

  const benefits = [
    "Access to 5,000+ MSU students",
    "Verified student applicants",
    "Easy application management",
    "Free listing for campus departments",
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-maroon py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-warm/10 border border-gold-warm/30 mb-6">
              <Building className="w-4 h-4 text-gold-bright" />
              <span className="text-gold-bright text-sm font-medium">Hirer Portal</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-gold-bright">
              Post a Part-Time Job
            </h1>
            <p className="text-gold-muted/80 mt-4 text-lg">
              Find talented MSU students for your part-time positions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Benefits Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Why Post With Us?
                  </h3>
                  <OkirPattern variant="divider" className="mb-4" />
                  <ul className="space-y-4">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-forest-emerald shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Need help?</span>
                      <br />
                      Contact our support team at{" "}
                      <a href="mailto:support@msu.edu.ph" className="text-primary hover:underline">
                        support@msu.edu.ph
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 md:p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                    Job Details
                  </h2>

                  <div className="grid gap-6">
                    {/* Job Title */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Briefcase className="w-4 h-4 text-gold-warm" />
                        Job Title
                      </label>
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Student Research Assistant"
                        className="h-12"
                      />
                    </div>

                    {/* Job Category */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Tag className="w-4 h-4 text-gold-warm" />
                        Job Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a category</option>
                        {JOB_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {formData.category === "Others" && (
                        <Input
                          name="otherCategory"
                          value={formData.otherCategory}
                          onChange={handleChange}
                          placeholder="Please specify..."
                          className="mt-2 h-12"
                        />
                      )}
                    </div>

                    {/* Company & Location */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <Building className="w-4 h-4 text-gold-warm" />
                          Company/Department
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g., College of Engineering"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <MapPin className="w-4 h-4 text-gold-warm" />
                          Location
                        </label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g., Main Campus"
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Type & Salary */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <Clock className="w-4 h-4 text-gold-warm" />
                          Job Type
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-ring"
                        >
                          <option value="Part-Time">Part-Time</option>
                          <option value="Flexible">Flexible Hours</option>
                          <option value="Weekend">Weekend Only</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                          <DollarSign className="w-4 h-4 text-gold-warm" />
                          Salary/Rate
                        </label>
                        <Input
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                          placeholder="e.g., ₱100-150/hr"
                          className="h-12"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <FileText className="w-4 h-4 text-gold-warm" />
                        Job Description
                      </label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the job responsibilities, duties, and what a typical day looks like..."
                        rows={4}
                      />
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Requirements & Qualifications
                      </label>
                      <Textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="List any skills, experience, or qualifications required..."
                        rows={3}
                      />
                    </div>

                    {/* Contact Email */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Contact Email
                      </label>
                      <Input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="your.email@msu.edu.ph"
                        className="h-12"
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="gold"
                        size="xl"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Posting..."
                        ) : (
                          <>
                            <Plus className="w-5 h-5 mr-2" />
                            Post Job Listing
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
