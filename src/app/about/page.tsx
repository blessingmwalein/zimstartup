import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, ArrowRight, PenLine, MousePointer, BarChart3 } from 'lucide-react'
import MainLayout from "@/components/Layouts/MainLayout"

export default function AboutPage() {
    return (
        <MainLayout>
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-20 px-4 md:px-8">
                    <div className="container mx-auto max-w-5xl text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                            About <span className="relative inline-block">
                                Us
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-green-400"></div>
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            ZimStartUp is a platform that showcases mainly startups, SMEs&apos; youth ideas and connects them with
                            various people in different communities.
                        </p>
                    </div>
                </section>

                {/* About Description */}
                <section className="py-12 px-4 md:px-8 bg-gray-50">
                    <div className="container mx-auto max-w-4xl">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            ZimStartUp allows you to register and list your entity on the website. It enables
                            companies to list their stock exchange capital and attract investors, lenders, customers, and
                            partners from various communities. It also allows communities to access information,
                            documents, and ratings of the companies and participate in their growth and success. It&apos;s an easy-to-use platform
                            that can be used by users with minimum computer skills. Its free and can be accessed with/ without the
                            internet.
                        </p>
                    </div>
                </section>

                {/* Feature Cards */}
                <section className="py-20 px-4 md:px-8">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
                                    <PenLine className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Register a Company</h3>
                                <p className="text-gray-600 mb-6">List your startup or SME on our platform and get discovered.</p>
                                <Link href="#" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>

                            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                                    <MousePointer className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Select a Company</h3>
                                <p className="text-gray-600 mb-6">Browse through our database of registered companies.</p>
                                <Link href="#" className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700">
                                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>

                            <div className="group p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                                    <BarChart3 className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Check Company Status</h3>
                                <p className="text-gray-600 mb-6">View detailed information and performance metrics.</p>
                                <Link href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get More Information */}
                <section className="py-20 px-4 md:px-8 bg-gray-50">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 mb-12 md:mb-0">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">Get more information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-green-600 font-bold">1</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium mb-2">How to register a company</h3>
                                            <p className="text-gray-600">Learn the simple steps to register your company on our platform.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-purple-600 font-bold">2</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium mb-2">How to check a company status</h3>
                                            <p className="text-gray-600">Access detailed information about registered companies.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-blue-600 font-bold">3</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium mb-2">How to register as an investor</h3>
                                            <p className="text-gray-600">Join as an investor and discover promising opportunities.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-yellow-600 font-bold">4</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium mb-2">How to select a company to invest in</h3>
                                            <p className="text-gray-600">Find the right companies that match your investment criteria.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/5">
                                <div className="relative">
                                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full z-0"></div>
                                    <div className="relative z-10 bg-white rounded-2xl shadow-lg overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-lg font-medium">Account Balance</h3>
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                    <span className="text-green-600">$</span>
                                                </div>
                                            </div>
                                            <div className="mb-8">
                                                <p className="text-3xl font-bold">$2,000.00</p>
                                                <p className="text-sm text-gray-500">Available balance</p>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <div>
                                                    <p className="text-gray-500">Last Update</p>
                                                    <p className="font-medium">12/12/2023</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Account Holder</p>
                                                    <p className="font-medium">John Doe</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-20 bg-gradient-to-r from-green-400 to-blue-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="py-20 px-4 md:px-8">
                    <div className="container mx-auto max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Have a Question?</h2>
                        <form className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                                    <textarea
                                        id="message"
                                        placeholder="Type your question here"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                    ></textarea>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        Submit Question
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}
