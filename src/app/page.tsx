import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, BarChart2, Shield, Search, ChevronRight, Star, ArrowUpRight, Menu } from "lucide-react"
import MainLayout from "@/components/Layouts/MainLayout"

export default function HomePage() {
  return (
    <MainLayout>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Invest in Africa's
                  <span className="relative inline-block text-green-500 ml-3">
                    Future
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-400"></div>
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Connect with promising startups, SMEs, and innovative ideas across Africa. Invest, monitor, and grow
                  your portfolio all in one place.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-black text-white rounded-full px-8 py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                    Start Investing <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button className="bg-white text-black border border-gray-200 rounded-full px-8 py-3 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                    Explore Startups
                  </button>
                </div>
                <div className="mt-12 flex items-center space-x-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden"
                      >
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${i}`}
                          alt="User"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Trusted by <span className="font-bold">2,000+</span> investors
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative z-10">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium">Investment Dashboard</h3>
                        <div className="bg-green-100 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          Live Data
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm text-gray-500 mb-1">Total Invested</p>
                          <p className="text-2xl font-bold">$24,500</p>
                          <div className="flex items-center mt-2 text-green-600 text-sm">
                            <TrendingUp className="w-4 h-4 mr-1" /> +12.5%
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm text-gray-500 mb-1">Current Value</p>
                          <p className="text-2xl font-bold">$32,750</p>
                          <div className="flex items-center mt-2 text-green-600 text-sm">
                            <TrendingUp className="w-4 h-4 mr-1" /> +33.7%
                          </div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Portfolio Performance</h4>
                          <div className="flex space-x-2">
                            <button className="text-xs bg-black text-white px-2 py-1 rounded">1M</button>
                            <button className="text-xs text-gray-500 px-2 py-1 rounded">3M</button>
                            <button className="text-xs text-gray-500 px-2 py-1 rounded">1Y</button>
                            <button className="text-xs text-gray-500 px-2 py-1 rounded">All</button>
                          </div>
                        </div>
                        <div className="h-40 bg-gray-100 rounded-lg flex items-end p-4">
                          {[35, 45, 30, 60, 75, 55, 70, 65, 80].map((height, i) => (
                            <div key={i} className="flex-1 mx-1">
                              <div
                                className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-sm"
                                style={{ height: `${height}%` }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-4">Top Performing Startups</h4>
                        <div className="space-y-3">
                          {[
                            { name: "EcoSolar", sector: "Clean Energy", return: "+42%" },
                            { name: "FinTech Connect", sector: "Finance", return: "+38%" },
                            { name: "AgriTech Solutions", sector: "Agriculture", return: "+27%" },
                          ].map((company, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                                  {company.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{company.name}</p>
                                  <p className="text-xs text-gray-500">{company.sector}</p>
                                </div>
                              </div>
                              <div className="text-green-600 font-medium">{company.return}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-24 h-24 bg-green-100 rounded-full z-0"></div>
                <div className="absolute bottom-10 -left-6 w-16 h-16 bg-yellow-100 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-gray-600">Registered Startups</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">$12M+</p>
                <p className="text-gray-600">Total Investments</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">2,000+</p>
                <p className="text-gray-600">Active Investors</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">15+</p>
                <p className="text-gray-600">African Countries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ZimStartUp</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform offers everything you need to discover, invest in, and monitor promising African startups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Discover Opportunities</h3>
                <p className="text-gray-600 mb-4">
                  Browse through our curated list of vetted startups and SMEs across various sectors in Africa.
                </p>
                <Link href="#" className="text-green-600 font-medium flex items-center hover:text-green-700">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <BarChart2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Track Performance</h3>
                <p className="text-gray-600 mb-4">
                  Monitor your investments with real-time analytics and comprehensive performance metrics.
                </p>
                <Link href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Investments</h3>
                <p className="text-gray-600 mb-4">
                  Invest with confidence through our secure platform with transparent documentation and verification.
                </p>
                <Link href="#" className="text-purple-600 font-medium flex items-center hover:text-purple-700">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Categories */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Investment Categories</h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Explore diverse investment opportunities across these high-growth sectors.
                </p>
              </div>
              <Link
                href="#"
                className="mt-4 md:mt-0 bg-white text-black border border-gray-200 rounded-full px-6 py-2 font-medium hover:bg-gray-50 transition-colors flex items-center"
              >
                View All Categories <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Technology", count: 124, color: "from-blue-500 to-indigo-600", icon: "💻" },
                { name: "Agriculture", count: 86, color: "from-green-500 to-emerald-600", icon: "🌱" },
                { name: "Healthcare", count: 75, color: "from-red-500 to-rose-600", icon: "🏥" },
                { name: "Renewable Energy", count: 62, color: "from-yellow-500 to-amber-600", icon: "⚡" },
                { name: "Education", count: 58, color: "from-purple-500 to-violet-600", icon: "📚" },
                { name: "Fintech", count: 93, color: "from-cyan-500 to-sky-600", icon: "💳" },
                { name: "E-commerce", count: 67, color: "from-orange-500 to-amber-600", icon: "🛒" },
                { name: "Manufacturing", count: 41, color: "from-gray-600 to-gray-800", icon: "🏭" },
              ].map((category, i) => (
                <Link href="#" key={i} className="group">
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                    <div className={`h-24 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                      <span className="text-4xl">{category.icon}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">{category.count} startups</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Startups */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Startups</h2>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Discover some of our most promising investment opportunities.
                </p>
              </div>
              <Link
                href="#"
                className="mt-4 md:mt-0 bg-white text-black border border-gray-200 rounded-full px-6 py-2 font-medium hover:bg-gray-50 transition-colors flex items-center"
              >
                View All Startups <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "EcoSolar",
                  description: "Affordable solar solutions for rural communities across Zimbabwe and beyond.",
                  funding: "$250,000",
                  progress: 75,
                  category: "Clean Energy",
                  return: "Projected 22% ROI",
                },
                {
                  name: "FinTech Connect",
                  description: "Mobile banking platform connecting underserved communities to financial services.",
                  funding: "$500,000",
                  progress: 60,
                  category: "Finance",
                  return: "Projected 18% ROI",
                },
                {
                  name: "AgriTech Solutions",
                  description: "Smart farming technology to increase crop yields and reduce resource usage.",
                  funding: "$350,000",
                  progress: 85,
                  category: "Agriculture",
                  return: "Projected 20% ROI",
                },
              ].map((startup, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=${startup.name}`}
                      alt={startup.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white text-black text-xs font-medium px-2.5 py-1 rounded-full">
                      {startup.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{startup.name}</h3>
                    <p className="text-gray-600 mb-4">{startup.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Funding Goal: {startup.funding}</span>
                        <span>{startup.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${startup.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{startup.return}</span>
                      <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center">
                        Invest Now <ArrowUpRight className="ml-1 w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 px-4 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Investors Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied investors who have discovered promising opportunities through our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Angel Investor",
                  quote:
                    "ZimStartUp has transformed how I discover and invest in African startups. The platform is intuitive and the investment opportunities are thoroughly vetted.",
                  rating: 5,
                },
                {
                  name: "Michael Okafor",
                  role: "Venture Capitalist",
                  quote:
                    "As someone focused on African markets, this platform has been invaluable. The analytics and reporting tools help me make informed investment decisions.",
                  rating: 5,
                },
                {
                  name: "Tendai Moyo",
                  role: "Individual Investor",
                  quote:
                    "I've been able to diversify my portfolio with promising African startups through ZimStartUp. The process is transparent and the returns have been excellent.",
                  rating: 4,
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-black text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of investors who are already discovering and investing in Africa's most promising startups.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-green-500 text-white rounded-full px-8 py-3 font-medium hover:bg-green-600 transition-colors">
                Create an Account
              </button>
              <button className="bg-transparent text-white border border-white rounded-full px-8 py-3 font-medium hover:bg-white hover:text-black transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}
