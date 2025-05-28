"use client"

import Link from "next/link"
import {
    ArrowRight,
    TrendingUp,
    Building2,
    Factory,
    Landmark,
    ShoppingBag,
    Leaf,
    Cpu,
    Pill,
    Truck,
    Radio,
    Hammer,
    Droplets,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import MainLayout from "@/components/Layouts/MainLayout"
import SearchInput from "@/components/FormElements/SearchInput/SearchInput"
import { useDispatch, useSelector } from "react-redux"
import { fetchIndustryList } from "../../../../state/slices/configSlice"
import type { AppDispatch } from "../../../../state/store"

interface Company {
    company_id: string | number
    company_name: string
    company_logo: string
    sector: string
}

interface Sector {
    id: number
    created_at: string
    status: string
    sector: string
    number_of_sectors: number
}

export default function Dashboard() {
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState<Company[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { status, error: reduxError, companyList } = useSelector((state: any) => state.companyConfig)

    const { industryList, businessStatesList, stockExchangeList } = useSelector((state: any) => state.companyConfig)
    const dispatch = useDispatch<AppDispatch>()

    // Dummy fetch logic — replace with real API call
    useEffect(() => {
        if (query.trim() === "") {
            setSuggestions([])
            return
        }

        setLoading(true)
        setError("")

        const fetchSuggestions = async () => {
            try {
                // Simulate network call
                await new Promise((resolve) => setTimeout(resolve, 1000))

                const mockData: Company[] = [
                    {
                        company_id: 1,
                        company_name: "Solar Grid Co",
                        company_logo: "images/logo1.png",
                        sector: "Energy",
                    },
                    {
                        company_id: 2,
                        company_name: "Agri Growers",
                        company_logo: "images/logo2.png",
                        sector: "Agriculture",
                    },
                ]

                const filtered = mockData.filter((company) => company.company_name.toLowerCase().includes(query.toLowerCase()))

                setSuggestions(filtered)
                if (!filtered.length) {
                    setError("No matching companies found.")
                }
            } catch (err) {
                setError("Failed to fetch suggestions.")
            } finally {
                setLoading(false)
            }
        }

        fetchSuggestions()
    }, [query])

    const handleCompanySelect = (company: Company) => {
        console.log("Selected company:", company)
        // You can route or display company info here
        setQuery("")
        setSuggestions([])
    }
    const isFetched = useRef(false)

    useEffect(() => {
        if (!isFetched.current) {
            dispatch(fetchIndustryList())
            isFetched.current = true
        }
    }, [dispatch])

    // Function to get appropriate icon for each sector
    const getSectorIcon = (sectorName: string) => {
        const iconMap: Record<string, any> = {
            Banking: <Landmark className="h-10 w-10" />,
            Technology: <Cpu className="h-10 w-10" />,
            Healthcare: <Pill className="h-10 w-10" />,
            Manufacturing: <Factory className="h-10 w-10" />,
            Retail: <ShoppingBag className="h-10 w-10" />,
            Energy: <TrendingUp className="h-10 w-10" />,
            Agriculture: <Leaf className="h-10 w-10" />,
            Transportation: <Truck className="h-10 w-10" />,
            Telecommunications: <Radio className="h-10 w-10" />,
            Construction: <Hammer className="h-10 w-10" />,
            Utilities: <Droplets className="h-10 w-10" />,
        }

        return iconMap[sectorName] || <Building2 className="h-10 w-10" />
    }

    // Sample sectors data if industryList is not available
    const sampleSectors: Sector[] = [
        {
            id: 1,
            created_at: "2024-11-18T16:55:52.120777",
            status: "ACTIVE",
            sector: "Banking",
            number_of_sectors: 120,
        },
        {
            id: 2,
            created_at: "2024-11-18T16:55:52.120777",
            status: "ACTIVE",
            sector: "Technology",
            number_of_sectors: 85,
        },
        {
            id: 3,
            created_at: "2024-11-18T16:55:52.120777",
            status: "ACTIVE",
            sector: "Healthcare",
            number_of_sectors: 64,
        },
        {
            id: 4,
            created_at: "2024-11-18T16:55:52.120777",
            status: "ACTIVE",
            sector: "Manufacturing",
            number_of_sectors: 92,
        },
    ]

    // Use industryList from Redux if available, otherwise use sample data
    const sectors = industryList?.length ? industryList : sampleSectors

    return (
        <MainLayout>
            <main className="bg-gray-100 min-h-screen">
                <div className="w-full mx-auto px-2 md:px-9 py-[10vh] text-center">
                    <h1 className="lg:text-[60px] mb-4 font-semibold text-black/80">
                        Welcome to the <span className="text-secondary">Network</span>
                    </h1>
                    <p className="text-[25px] mb-8 mt-12">An Entrepreneur City shaped by the youth and Community.</p>

                    <SearchInput
                        query={query}
                        setQuery={setQuery}
                        suggestions={suggestions}
                        loading={loading}
                        onCompanySelect={handleCompanySelect}
                        error={error}
                        label="companies"
                    />

                    {/* Sectors Grid */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold mb-8">Explore Sectors</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {sectors.map((sector: any) => (
                                <Link href={`/sectors/${sector.sector}`} key={sector.id} className="group">
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] h-full">
                                        <div className="p-6 flex flex-col items-center">
                                            <div className="bg-gray-50 p-4 rounded-full mb-4 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                                {getSectorIcon(sector.sector)}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">{sector.sector}</h3>
                                            <p className="text-gray-500 mb-4">{sector.number_of_sectors} companies</p>
                                            <div className="mt-auto flex items-center text-secondary font-medium">
                                                Explore
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    )
}
