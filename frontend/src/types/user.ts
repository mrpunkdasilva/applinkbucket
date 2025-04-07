export enum UserRole {
  FREE = 'FREE',
  PRO = 'PRO',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  token?: string
  profilePicture?: string
  createdAt: string
  subscription?: {
    type: 'FREE' | 'PRO'
    validUntil?: string
  }
}
