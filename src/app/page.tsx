import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, BarChart2, Shield, Search, ChevronRight, Star, ArrowUpRight, Menu } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-black">Zim</span>
              <span className="text-green-500">startup</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-black font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                About
              </Link>
              <Link href="/helpdesk" className="text-gray-600 hover:text-black transition-colors">
                HelpDesk
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/login" className="hidden md:block text-gray-600 hover:text-black transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-black text-white rounded-full px-6 py-2 font-medium hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="text-xl font-bold">
                <span className="text-black">Zim</span>
                <span className="text-green-500">startup</span>
              </Link>
              <p className="text-gray-500 mt-4">
                Connecting African startups with global investors. Discover, invest, and grow with us.
              </p>
              <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Browse Startups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Investment Process
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/helpdesk" className="text-gray-600 hover:text-black transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2024 ZimStartUp. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
