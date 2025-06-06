
"use client"
import { useRouter } from "next/navigation"
import {
    CheckCircle,
    Building2,
    Search,
    TrendingUp,
    Users,
    ArrowRight,
    Sparkles,
    Target,
    DollarSign,
    BarChart2,
    Shield,
    Globe,
} from "lucide-react"
import CustomButton from "@/components/Buttons/CustomButton"
import AuthLayout from "@/components/Layouts/AuthLayout"

const OnboardingSuccessPage = () => {
    const router = useRouter()

    const handleBrowseCompanies = () => {
        router.push("/companies")
    }

    const handleCreateCompany = () => {
        router.push("/companies/create")
    }

    const handleGoToDashboard = () => {
        router.push("/dashboard")
    }

    return (
        <AuthLayout>
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Success Animation & Header */}
                    <div className="text-center mb-12">
                        <div className="relative inline-flex items-center justify-center">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <div className="absolute -top-2 -right-2">
                                <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Welcome to ZimStartUp!</h1>
                        <p className="text-xl text-gray-600 mb-2">Your investor account has been created successfully</p>
                        <p className="text-lg text-gray-500">
                            You're now ready to discover and invest in Africa's most promising startups and SMEs
                        </p>
                    </div>

                    {/* What's Next Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What would you like to do next?</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Browse Startups Card */}
                            <div
                                className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                onClick={handleBrowseCompanies}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Search className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 ml-4">Browse Startups</h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    Discover vetted African startups and SMEs across technology, agriculture, healthcare, and more. Filter
                                    by sector, funding stage, and location.
                                </p>
                                <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                                    Explore Opportunities <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>

                            {/* Create Company Card */}
                            <div
                                className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                onClick={handleCreateCompany}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 ml-4">List Your Startup</h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    Have an innovative business idea or existing startup? Create your company profile and connect with our
                                    network of African-focused investors.
                                </p>
                                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                                    Start Fundraising <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                            <CustomButton
                                onClick={handleBrowseCompanies}
                                variant="solid"
                                className="flex items-center justify-center bg-green-600 hover:bg-green-700"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                Browse Startups
                            </CustomButton>

                            <CustomButton
                                onClick={handleCreateCompany}
                                variant="outline"
                                className="flex items-center justify-center border-green-600 text-green-600 hover:bg-green-50"
                            >
                                <Building2 className="w-5 h-5 mr-2" />
                                List Your Startup
                            </CustomButton>
                        </div>
                    </div>

                    {/* Platform Features */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose ZimStartUp</h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Opportunities</h3>
                                <p className="text-gray-600">
                                    Browse through our curated list of vetted startups and SMEs across various sectors in Africa.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BarChart2 className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Performance</h3>
                                <p className="text-gray-600">
                                    Monitor your investments with real-time analytics and comprehensive performance metrics.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Investments</h3>
                                <p className="text-gray-600">
                                    Invest with confidence through our secure platform with transparent documentation and verification.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Investment Categories Preview */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Investment Categories</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Technology", icon: "💻", color: "from-blue-500 to-indigo-600" },
                                { name: "Agriculture", icon: "🌱", color: "from-green-500 to-emerald-600" },
                                { name: "Healthcare", icon: "🏥", color: "from-red-500 to-rose-600" },
                                { name: "Fintech", icon: "💳", color: "from-cyan-500 to-sky-600" },
                            ].map((category, i) => (
                                <div key={i} className="text-center">
                                    <div
                                        className={`h-16 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-3`}
                                    >
                                        <span className="text-2xl">{category.icon}</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-900">{category.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-lg p-8 text-white mb-8">
                        <h2 className="text-2xl font-bold mb-6 text-center">Join Our Growing Community</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-3xl font-bold mb-2">500+</div>
                                <div className="text-green-100">Registered Startups</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">$12M+</div>
                                <div className="text-green-100">Total Investments</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">2,000+</div>
                                <div className="text-green-100">Active Investors</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold mb-2">15+</div>
                                <div className="text-green-100">African Countries</div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-gray-50 rounded-2xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Investment Journey?</h2>
                        <p className="text-gray-600 mb-6">
                            Access your personalized dashboard to explore investment opportunities and track your portfolio
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <CustomButton
                                onClick={handleGoToDashboard}
                                variant="solid"
                                className="flex items-center justify-center bg-green-600 hover:bg-green-700"
                            >
                                <DollarSign className="w-5 h-5 mr-2" />
                                Go to Dashboard
                            </CustomButton>

                            <CustomButton
                                onClick={handleBrowseCompanies}
                                variant="outline"
                                className="flex items-center justify-center border-green-600 text-green-600 hover:bg-green-50"
                            >
                                <Globe className="w-5 h-5 mr-2" />
                                Explore Africa's Startups
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default OnboardingSuccessPage
