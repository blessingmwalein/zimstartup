import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  BarChart2,
  Shield,
  Search,
  ChevronRight,
  Star,
  ArrowUpRight,
  Menu,
} from "lucide-react";
import MainLayout from "@/components/Layouts/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white px-4 py-16 md:px-8 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col items-center md:flex-row">
              <div className="mb-12 md:mb-0 md:w-1/2">
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                  Invest in Africa's
                  <span className="relative ml-3 inline-block text-green-500">
                    Future
                    <div className="absolute -bottom-2 left-0 h-1 w-full bg-green-400"></div>
                  </span>
                </h1>
                <p className="mb-8 text-xl leading-relaxed text-gray-600">
                  Connect with promising startups, SMEs, and innovative ideas
                  across Africa. Invest, monitor, and grow your portfolio all in
                  one place.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link href={"/auth/signup"} className="flex items-center justify-center rounded-full bg-black px-8 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                    Start Investing <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-50">
                    Explore Startups
                  </button>
                </div>
                <div className="mt-12 flex items-center space-x-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200"
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
                      Trusted by <span className="font-bold">2,000+</span>{" "}
                      investors
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative md:w-1/2">
                <div className="relative z-0">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                    <div className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          Investment Dashboard
                        </h3>
                        <div className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-600">
                          Live Data
                        </div>
                      </div>
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="mb-1 text-sm text-gray-500">
                            Total Invested
                          </p>
                          <p className="text-2xl font-bold">$24,500</p>
                          <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="mr-1 h-4 w-4" /> +12.5%
                          </div>
                        </div>
                        <div className="rounded-xl bg-gray-50 p-4">
                          <p className="mb-1 text-sm text-gray-500">
                            Current Value
                          </p>
                          <p className="text-2xl font-bold">$32,750</p>
                          <div className="mt-2 flex items-center text-sm text-green-600">
                            <TrendingUp className="mr-1 h-4 w-4" /> +33.7%
                          </div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Portfolio Performance</h4>
                          <div className="flex space-x-2">
                            <button className="rounded bg-black px-2 py-1 text-xs text-white">
                              1M
                            </button>
                            <button className="rounded px-2 py-1 text-xs text-gray-500">
                              3M
                            </button>
                            <button className="rounded px-2 py-1 text-xs text-gray-500">
                              1Y
                            </button>
                            <button className="rounded px-2 py-1 text-xs text-gray-500">
                              All
                            </button>
                          </div>
                        </div>
                        <div className="flex h-40 items-end rounded-lg bg-gray-100 p-4">
                          {[35, 45, 30, 60, 75, 55, 70, 65, 80].map(
                            (height, i) => (
                              <div key={i} className="mx-1 flex-1">
                                <div
                                  className="rounded-t-sm bg-gradient-to-t from-green-500 to-green-400"
                                  style={{ height: `${height}%` }}
                                ></div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-4 font-medium">
                          Top Performing Startups
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              name: "EcoSolar",
                              sector: "Clean Energy",
                              return: "+42%",
                            },
                            {
                              name: "FinTech Connect",
                              sector: "Finance",
                              return: "+38%",
                            },
                            {
                              name: "AgriTech Solutions",
                              sector: "Agriculture",
                              return: "+27%",
                            },
                          ].map((company, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                            >
                              <div className="flex items-center">
                                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                                  {company.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{company.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {company.sector}
                                  </p>
                                </div>
                              </div>
                              <div className="font-medium text-green-600">
                                {company.return}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-6 top-1/2 z-0 h-24 w-24 -translate-y-1/2 transform rounded-full bg-green-100"></div>
                <div className="absolute -left-6 bottom-10 z-0 h-16 w-16 rounded-full bg-yellow-100"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 md:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold">500+</p>
                <p className="text-gray-600">Registered Startups</p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold">$12M+</p>
                <p className="text-gray-600">Total Investments</p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold">2,000+</p>
                <p className="text-gray-600">Active Investors</p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-4xl font-bold">15+</p>
                <p className="text-gray-600">African Countries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Why Choose ZimStartUp
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Our platform offers everything you need to discover, invest in,
                and monitor promising African startups.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Search className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold">
                  Discover Opportunities
                </h3>
                <p className="mb-4 text-gray-600">
                  Browse through our curated list of vetted startups and SMEs
                  across various sectors in Africa.
                </p>
                <Link
                  href="#"
                  className="flex items-center font-medium text-green-600 hover:text-green-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BarChart2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Track Performance</h3>
                <p className="mb-4 text-gray-600">
                  Monitor your investments with real-time analytics and
                  comprehensive performance metrics.
                </p>
                <Link
                  href="#"
                  className="flex items-center font-medium text-blue-600 hover:text-blue-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Secure Investments</h3>
                <p className="mb-4 text-gray-600">
                  Invest with confidence through our secure platform with
                  transparent documentation and verification.
                </p>
                <Link
                  href="#"
                  className="flex items-center font-medium text-purple-600 hover:text-purple-700"
                >
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Categories */}
        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Top Investment Categories
                </h2>
                <p className="max-w-2xl text-xl text-gray-600">
                  Explore diverse investment opportunities across these
                  high-growth sectors.
                </p>
              </div>
              <Link
                href="#"
                className="mt-4 flex items-center rounded-full border border-gray-200 bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-50 md:mt-0"
              >
                View All Sectors <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Technology",
                  count: 124,
                  color: "from-blue-500 to-indigo-600",
                  icon: "💻",
                },
                {
                  name: "Agriculture",
                  count: 86,
                  color: "from-green-500 to-emerald-600",
                  icon: "🌱",
                },
                {
                  name: "Healthcare",
                  count: 75,
                  color: "from-red-500 to-rose-600",
                  icon: "🏥",
                },
                {
                  name: "Renewable Energy",
                  count: 62,
                  color: "from-yellow-500 to-amber-600",
                  icon: "⚡",
                },
                {
                  name: "Education",
                  count: 58,
                  color: "from-purple-500 to-violet-600",
                  icon: "📚",
                },
                {
                  name: "Fintech",
                  count: 93,
                  color: "from-cyan-500 to-sky-600",
                  icon: "💳",
                },
                {
                  name: "E-commerce",
                  count: 67,
                  color: "from-orange-500 to-amber-600",
                  icon: "🛒",
                },
                {
                  name: "Manufacturing",
                  count: 41,
                  color: "from-gray-600 to-gray-800",
                  icon: "🏭",
                },
              ].map((category, i) => (
                <Link href="#" key={i} className="group">
                  <div className="h-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div
                      className={`h-24 bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <span className="text-4xl">{category.icon}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-green-600">
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
        <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Featured Startups
                </h2>
                <p className="max-w-2xl text-xl text-gray-600">
                  Discover some of our most promising investment opportunities.
                </p>
              </div>
              <Link
                href="#"
                className="mt-4 flex items-center rounded-full border border-gray-200 bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-50 md:mt-0"
              >
                View All Startups <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  name: "EcoSolar",
                  description:
                    "Affordable solar solutions for rural communities across Zimbabwe and beyond.",
                  funding: "$250,000",
                  progress: 75,
                  category: "Clean Energy",
                  return: "Projected 22% ROI",
                },
                {
                  name: "FinTech Connect",
                  description:
                    "Mobile banking platform connecting underserved communities to financial services.",
                  funding: "$500,000",
                  progress: 60,
                  category: "Finance",
                  return: "Projected 18% ROI",
                },
                {
                  name: "AgriTech Solutions",
                  description:
                    "Smart farming technology to increase crop yields and reduce resource usage.",
                  funding: "$350,000",
                  progress: 85,
                  category: "Agriculture",
                  return: "Projected 20% ROI",
                },
              ].map((startup, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=${startup.name}`}
                      alt={startup.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-black">
                      {startup.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{startup.name}</h3>
                    <p className="mb-4 text-gray-600">{startup.description}</p>
                    <div className="mb-4">
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Funding Goal: {startup.funding}</span>
                        <span>{startup.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${startup.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {startup.return}
                      </span>
                      <button className="flex items-center rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                        Invest Now <ArrowUpRight className="ml-1 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-16 md:py-24 px-4 md:px-8">
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
        </section> */}

        {/* CTA Section */}
        <section className="bg-black px-4 py-16 text-white md:px-8 md:py-24">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
              Join thousands of investors who are already discovering and
              investing in Africa's most promising startups.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href={'/auth/signup'} className="rounded-full bg-green-500 px-8 py-3 font-medium text-white transition-colors hover:bg-green-600">
                Create an Account
              </Link>
              <button className="rounded-full border border-white bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
