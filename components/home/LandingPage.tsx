import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Person2, TrendingUp } from "@mui/icons-material";
import { Star } from "@mui/icons-material";

const LandingPage = () => {
  const router = useRouter();

  const handleLogin = (userType: "creator" | "brand") => {
    router.push(`/login?type=${userType}`);
  };

  const features = [
    {
      icon: "🎯",
      title: "Smart Matching",
      description:
        "AI-powered algorithm matches brands with the perfect creators based on audience, engagement, and content style.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description:
        "Track campaign performance, engagement rates, and ROI with comprehensive analytics and reporting tools.",
    },
    {
      icon: "💰",
      title: "Secure Payments",
      description:
        "Built-in payment system ensures creators get paid on time and brands have payment protection.",
    },
    {
      icon: "🚀",
      title: "Campaign Management",
      description:
        "Streamlined workflow from campaign creation to content approval and performance tracking.",
    },
    {
      icon: "🤝",
      title: "Collaboration Tools",
      description:
        "Built-in messaging, file sharing, and project management tools for seamless collaboration.",
    },
    {
      icon: "📈",
      title: "Growth Insights",
      description:
        "Data-driven insights to help creators grow their audience and brands optimize their marketing strategy.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Creators" },
    { number: "2K+", label: "Trusted Brands" },
    { number: "$10M+", label: "Campaign Value" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <div className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Person2 className="w-6 h-6 text-primary" />
            </div>
            <span className="text-2xl font-bold text-primary">Influency</span>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-8 leading-tight">
              Connect{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Influencers
              </span>{" "}
              &{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Brands
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
              The ultimate marketplace where authentic creators meet visionary
              brands. Build meaningful partnerships that drive real results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-in-left">
            <button
              onClick={() => handleLogin("creator")}
              className="group relative px-8 py-4 bg-secondary text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Login as Creator</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleLogin("brand")}
              className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[200px]"
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Login as Brand</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-in-right">
            <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-text-secondary">Active Creators</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-secondary mb-2">2K+</div>
              <div className="text-text-secondary">Trusted Brands</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold text-accent mb-2">$10M+</div>
              <div className="text-text-secondary">Campaign Value</div>
            </div>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-24 animate-fade-in">
          <div className="max-w-5xl mx-auto">
            <div className="glass-effect rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-text-primary mb-6">
                    Why Choose Influency?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          Verified Profiles
                        </h4>
                        <p className="text-text-secondary">
                          All creators and brands go through our verification
                          process
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-secondary rounded-full flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          Smart Matching
                        </h4>
                        <p className="text-text-secondary">
                          AI-powered algorithm matches perfect brand-creator
                          pairs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 gradient-accent rounded-full flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          Secure Payments
                        </h4>
                        <p className="text-text-secondary">
                          Protected transactions with milestone-based releases
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-muted to-secondary-muted rounded-2xl flex items-center justify-center">
                    <div className="text-6xl">🎯</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Powerful tools and features designed to make creator marketing
              effortless and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                thousands
              </span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Join the growing community of creators and brands achieving
              remarkable results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span
                    className={`${
                      index === 0
                        ? "text-primary"
                        : index === 1
                        ? "text-secondary"
                        : index === 2
                        ? "text-accent"
                        : "text-green-500"
                    }`}
                  >
                    {stat.number}
                  </span>
                </div>
                <div className="text-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-text-secondary">
                  Live campaigns running
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-text-secondary">
                  New matches every minute
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-text-secondary">
                  24/7 support available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
