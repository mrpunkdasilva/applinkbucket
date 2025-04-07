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
        <div className="p-6 bg-gray-900 min-h-screen">
            {/* Header Section */}
            <header className="mb-8 flex items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <Logo className="text-blue-500" size={40}/>
                    <span className="text-2xl font-bold text-white ml-2">LinkBucket</span>
                </div>

                {/* Welcome Message - Centered */}
                <div className="flex-1 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome back, {user.name || 'User'}! 👋
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Here's what's happening with your link collections
                    </p>
                </div>

                {/* Empty div to balance the layout */}
                <div className="w-[160px]"></div>
            </header>

            {/* Quick Actions Menu */}
            <div className="mb-8">
                <div className="flex space-x-4">
                    {quickActions.map((action) => (
                        <button
                            key={action.name}
                            onClick={action.onClick}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                                action.primary
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                            }`}
                        >
                            <action.icon className="h-5 w-5 mr-2"/>
                            <span>{action.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left Column - Stats & Charts */}
                <div className="xl:col-span-3 space-y-6">
                    <DashboardStats buckets={buckets}/>
                    <DashboardCharts buckets={buckets}/>

                    {/* Recent Buckets */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Recent Buckets</h2>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <PlusIcon className="h-5 w-5 mr-2"/>
                                New Bucket
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Public Buckets</h2>
                            <button
                                onClick={() => navigate('/explore')}
                                className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                            >
                                <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2"/>
                                Explore More
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div className="xl:col-span-1 space-y-6">
                    <QuickTipsCard/>
                    {!isPro && <UpgradeProCard/>}
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