import { LeaderboardPage } from '@/components/LeaderboardPage'

export default function LeaderboardRoute({ params }: { params: { id: string } }) {
  return <LeaderboardPage entries={[]} onBack={() => {}} />
} 