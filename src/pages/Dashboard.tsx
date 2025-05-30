import { useState } from "react"
import { useWallet } from "../contexts/WalletContext"
import WalletConnect from "../components/WalletConnect"
import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import ContentRow from "../components/ContentRow"
import FeatureSection from "../components/FeatureSection"
import { Skeleton } from "../components/ui/skeleton"
import { useToast } from "../hooks/use-toast"

const Dashboard = () => {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const { account, connected } = useWallet()
  const { toast } = useToast()

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      <Navbar onConnectWallet={() => setShowWalletModal(true)} isConnected={connected} />
      
      <main className="container mx-auto px-4 py-8">
        {connected && account ? (
          <>
            <HeroSection />
            <ContentRow 
              title="Trending Now"
              items={[]} // Add your trending items here
              loading={false}
            />
            <FeatureSection />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">Connect your wallet to access your personalized dashboard</p>
            <button
              onClick={() => setShowWalletModal(true)}
              className="bg-neon-pink hover:bg-neon-pink/90 text-white font-bold py-2 px-6 rounded-full transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </main>


      <WalletConnect
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSuccess={(address) => {
          toast({
            title: "Wallet Connected",
            description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
          })
          setShowWalletModal(false)
        }}
      />
    </div>
  )
}

export default Dashboard
