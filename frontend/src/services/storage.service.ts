export interface StoredBucket {
  id: string
  name: string
  description?: string
  createdAt: string
  userId: string
  pills: any[] // TODO: Define proper type for pills
}

class StorageService {
  private readonly BUCKETS_KEY = 'buckets'

  private getBuckets(): StoredBucket[] {
    const bucketsJson = localStorage.getItem(this.BUCKETS_KEY)
    return bucketsJson ? JSON.parse(bucketsJson) : []
  }

  private saveBuckets(buckets: StoredBucket[]): void {
    localStorage.setItem(this.BUCKETS_KEY, JSON.stringify(buckets))
  }

  getUserBuckets(userId: string): StoredBucket[] {
    const buckets = this.getBuckets()
    return buckets.filter(bucket => bucket.userId === userId)
  }

  createBucket(userId: string, data: { name: string; description?: string }): StoredBucket {
    const buckets = this.getBuckets()
    
    const newBucket: StoredBucket = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
      userId: userId,
      pills: []
    }

    buckets.push(newBucket)
    this.saveBuckets(buckets)
    
    return newBucket
  }

  deleteBucket(bucketId: string): void {
    const buckets = this.getBuckets()
    const updatedBuckets = buckets.filter(bucket => bucket.id !== bucketId)
    this.saveBuckets(updatedBuckets)
  }

  // Método para inicializar dados de exemplo
  initializeDefaultBuckets(userId: string): void {
    const existingBuckets = this.getUserBuckets(userId)
    
    if (existingBuckets.length === 0) {
      const defaultBuckets = [
        {
          name: "My First Bucket",
          description: "A collection of my favorite links"
        },
        {
          name: "Work Resources",
          description: "Important work-related links"
        }
      ]

      defaultBuckets.forEach(bucket => this.createBucket(userId, bucket))
    }
  }
}

export const storageService = new StorageService()