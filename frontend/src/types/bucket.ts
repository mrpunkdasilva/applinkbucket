export interface Pill {
  id: string
  title: string
  url: string
  description?: string
  tags?: string[]
  createdAt: string
}

export interface Bucket {
  id: string
  name: string
  description?: string
  pills: Pill[]
}