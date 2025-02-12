import './globals.css'
import { GameProvider } from '../contexts/GameContext'

export const metadata = {
  title: 'Game App',
  description: 'Next.js Game Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  )
} 