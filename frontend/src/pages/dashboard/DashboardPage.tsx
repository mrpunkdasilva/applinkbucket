import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import {storageService, StoredBucket} from '../../services/storage.service'
import {
    PlusIcon,
    ShareIcon,
    CloudArrowUpIcon,
    CloudArrowDownIcon,
    TagIcon,
    ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import BucketCard from '../../components/bucket/BucketCard'
import CreateBucketModal from '../../components/bucket/CreateBucketModal'
import {QuickTipsCard} from '../../components/dashboard/QuickTipsCard'
import {UpgradeProCard} from '../../components/dashboard/UpgradeProCard'
import {DashboardCharts} from '../../components/dashboard/DashboardCharts'
import DashboardStats from "../../components/dashboard/DashboardStats"
import {Logo} from "../../components/Logo.tsx";

export default function DashboardPage() {
    const navigate = useNavigate()
    const {user, isAuthenticated, isPro} = useAuth()
    const [buckets, setBuckets] = useState<StoredBucket[]>([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [publicBuckets, setPublicBuckets] = useState<StoredBucket[]>([])

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        if (!user) return

        try {
            storageService.initializeDefaultBuckets(user.id)
            const userBuckets = storageService.getUserBuckets(user.id)
            setBuckets(userBuckets)
        } catch (error) {
            console.error('Error loading buckets:', error)
        } finally {
            setIsLoading(false)
        }
    }, [user, isAuthenticated, navigate])

    const handleCreateBucket = (data: { name: string; description?: string }) => {
        if (!user) return

        try {
            const newBucket = storageService.createBucket(user.id, data)
            setBuckets(prev => [...prev, newBucket])
            setIsCreateModalOpen(false)
        } catch (error) {
            console.error('Error creating bucket:', error)
        }
    }

    const handleDeleteBucket = (bucketId: string) => {
        try {
            storageService.deleteBucket(bucketId)
            setBuckets(prev => prev.filter(bucket => bucket.id !== bucketId))
        } catch (error) {
            console.error('Error deleting bucket:', error)
        }
    }

    const recentBuckets = [...buckets]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)

    // Novo useEffect para carregar buckets públicos
    useEffect(() => {
        try {
            const allPublicBuckets = storageService.getPublicBuckets()
            setPublicBuckets(allPublicBuckets)
        } catch (error) {
            console.error('Error loading public buckets:', error)
        }
    }, [])

    const quickActions = [
        {
            name: 'New Bucket',
            icon: PlusIcon,
            onClick: () => setIsCreateModalOpen(true),
            primary: true
        },
        {
            name: 'Import',
            icon: CloudArrowDownIcon,
            onClick: () => console.log('Import clicked'),
        },
        {
            name: 'Export All',
            icon: CloudArrowUpIcon,
            onClick: () => console.log('Export clicked'),
        },
        {
            name: 'Manage Tags',
            icon: TagIcon,
            onClick: () => console.log('Tags clicked'),
        },
        {
            name: 'Share Profile',
            icon: ShareIcon,
            onClick: () => console.log('Share clicked'),
        }
    ]

    if (isLoading || !isAuthenticated || !user) {
        return (
            <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-white">
                    {isLoading ? "Loading..." : "Please log in to access the dashboard"}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 pb-16 md:pb-0" role="main">
            {/* Header Section */}
            <header 
                className="p-4 lg:p-6 flex flex-col sm:flex-row items-center gap-4" 
                role="banner"
                aria-label="Dashboard Header"
            >
                {/* Logo */}
                <div className="flex items-center" role="presentation">
                    <Logo className="text-blue-500" size={40} aria-hidden="true" />
                    <span className="text-2xl font-bold text-white ml-2">LinkBucket</span>
                </div>

                {/* Welcome Message - Centered */}
                <div className="flex-1 text-center">
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                        Welcome back, {user.name || 'User'}! 👋
                    </h1>
                    <p className="text-sm lg:text-base text-gray-400 mt-2">
                        Here's what's happening with your link collections
                    </p>
                </div>
            </header>

            {/* Quick Actions Menu - Scrollable on mobile */}
            <nav 
                className="p-4 lg:p-6 mb-4 lg:mb-8" 
                role="navigation" 
                aria-label="Quick actions"
            >
                <div className="flex overflow-x-auto pb-2 gap-2 lg:gap-4 hide-scrollbar">
                    {quickActions.map((action) => (
                        <button
                            key={action.name}
                            onClick={action.onClick}
                            className={`flex-shrink-0 flex items-center px-3 lg:px-4 py-2 rounded-lg transition-colors ${
                                action.primary
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                            }`}
                            aria-label={action.name}
                        >
                            <action.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                            <span className="whitespace-nowrap">{action.name}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content Grid */}
            <div className="p-4 lg:p-6">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
                    {/* Left Column - Stats & Charts */}
                    <div className="xl:col-span-3 space-y-4 lg:space-y-6">
                        <DashboardStats buckets={buckets} />
                        <DashboardCharts buckets={buckets} />

                        {/* Recent Buckets */}
                        <section aria-labelledby="recent-buckets-title">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                <h2 id="recent-buckets-title" className="text-xl font-bold text-white">Recent Buckets</h2>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                    aria-label="Create new bucket"
                                >
                                    <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                    New Bucket
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {recentBuckets.map(bucket => (
                                    <BucketCard
                                        key={bucket.id}
                                        bucket={bucket}
                                        onDelete={() => handleDeleteBucket(bucket.id)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Public Buckets */}
                        <section aria-labelledby="public-buckets-title">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                <h2 id="public-buckets-title" className="text-xl font-bold text-white">Public Buckets</h2>
                                <button
                                    onClick={() => navigate('/explore')}
                                    className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                                    aria-label="Explore more public buckets"
                                >
                                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                                    Explore More
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {publicBuckets.slice(0, 3).map(bucket => (
                                    <BucketCard
                                        key={bucket.id}
                                        bucket={bucket}
                                        isPublic
                                        showOwner
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Tips & Upgrade */}
                    <aside className="xl:col-span-1 space-y-4 lg:space-y-6" role="complementary">
                        <QuickTipsCard />
                        {!isPro && <UpgradeProCard />}
                    </aside>
                </div>
            </div>

            <CreateBucketModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateBucket}
            />
        </div>
    )
}