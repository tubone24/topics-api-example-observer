import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'

export default async function Table() {
  const startTime = Date.now()
  const topics = await prisma.topics.findMany()
  const duration = Date.now() - startTime

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Recent Topics</h2>
          <p className="text-sm text-gray-500">
            Fetched {topics.length} topics in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {topics.map((topic) => (
          <div
            key={topic.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{topic.name}</p>
                <p className="text-sm text-gray-500">{topic.configVersion}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(topic.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
