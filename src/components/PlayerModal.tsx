import { useViewContent } from '../lib/suistream';
import { useToast } from '../hooks/use-toast';
import { useWallet } from '../contexts/WalletContext';

const PlayerModal = ({ id, type, title, onClose }: { id: string | number, type: string, title: string, onClose: () => void }) => {
  const { viewContent } = useViewContent();
  const { toast } = useToast();
  const { connected } = useWallet();

  const handlePlay = async () => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to view content",
        variant: "destructive",
      });
      return;
    }

    try {
      // In a real implementation, you would get the subscription ID from the user's state
      const subscriptionId = "your-subscription-id";
      await viewContent(id.toString(), subscriptionId);
    } catch (error) {
      console.error('Error viewing content:', error);
      toast({
        title: "Playback Error",
        description: "There was an error playing this content. Please check your subscription.",
        variant: "destructive",
      });
    }
  };

  const src = type === "tv"
    ? `https://vidsrc.xyz/embed/tv/${id}`
    : `https://vidsrc.xyz/embed/movie/${id}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-[#131a2b] rounded-lg p-4 max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
        <div className="aspect-w-16 aspect-h-9 w-full">
          <iframe
            src={src}
            title={title}
            allowFullScreen
            className="w-full h-96 rounded-lg border-none"
            onLoad={handlePlay}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;