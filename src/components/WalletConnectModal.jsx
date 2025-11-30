import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { X, Copy, Check, Scan } from 'lucide-react';

const WalletConnectModal = ({ isOpen, onClose }) => {
  const { connectWallet } = useWallet();
  const [uri, setUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConnect = async () => {
    if (!uri.trim()) {
      setError('Please enter a WalletConnect URI');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await connectWallet(uri);
      setUri('');
      onClose();
    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to connect. Please check the URI and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUri(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              WalletConnect URI
            </label>
            <div className="relative">
              <input
                type="text"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                placeholder="wc:..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#bee800] focus:outline-none transition-colors pr-12"
              />
              <button
                onClick={handlePaste}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Paste from clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Scan a QR code from a dApp or paste the WalletConnect URI
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-900">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 btn-outline"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleConnect}
              className="flex-1 btn-lime"
              disabled={isLoading || !uri.trim()}
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
          </div>

          {/* Info */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Scan className="w-5 h-5 text-[#bee800] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900 mb-1">How to connect</p>
                <p className="text-xs leading-relaxed">
                  Go to any dApp that supports WalletConnect, click "Connect Wallet", 
                  select WalletConnect, and copy the URI or scan the QR code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectModal;
