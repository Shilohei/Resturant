import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Shield, Gift, TrendingUp, Wallet, Star, Zap, Globe } from "lucide-react";
import { toast } from "sonner";

interface NFTMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  nftPrice: number;
  rarity: 'common' | 'rare' | 'legendary';
  totalSupply: number;
  remaining: number;
  benefits: string[];
}

interface CryptoPayment {
  symbol: string;
  name: string;
  rate: number;
  icon: string;
  network: string;
}

interface LoyaltyToken {
  symbol: string;
  balance: number;
  value: number;
  earned: number;
  redeemable: number;
}

export const Web3Integration = () => {
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [loyaltyTokens, setLoyaltyTokens] = useState<LoyaltyToken>({
    symbol: "BISTRO",
    balance: 1250,
    value: 62.50,
    earned: 340,
    redeemable: 910
  });

  const nftMenuItems: NFTMenuItem[] = [
    {
      id: "nft-1",
      name: "Golden Wagyu Experience",
      description: "Exclusive A5 Wagyu dinner with chef's table experience and digital collectible",
      price: 150,
      nftPrice: 0.08,
      rarity: 'legendary',
      totalSupply: 50,
      remaining: 12,
      benefits: ["Chef's table seating", "Wine pairing included", "Digital certificate", "Future discounts"]
    },
    {
      id: "nft-2",
      name: "Seasonal Tasting Menu",
      description: "Limited edition seasonal menu with exclusive NFT artwork",
      price: 85,
      nftPrice: 0.05,
      rarity: 'rare',
      totalSupply: 200,
      remaining: 67,
      benefits: ["Seasonal ingredients", "NFT artwork", "Priority reservations", "Recipe access"]
    },
    {
      id: "nft-3",
      name: "Signature Cocktail Collection",
      description: "Craft cocktail experience with mixology masterclass NFT",
      price: 45,
      nftPrice: 0.02,
      rarity: 'common',
      totalSupply: 500,
      remaining: 234,
      benefits: ["Cocktail masterclass", "Recipe collection", "Bar priority", "Monthly specials"]
    }
  ];

  const cryptoPayments: CryptoPayment[] = [
    { symbol: "BTC", name: "Bitcoin", rate: 43250.00, icon: "₿", network: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum", rate: 2680.50, icon: "Ξ", network: "Ethereum" },
    { symbol: "USDC", name: "USD Coin", rate: 1.00, icon: "$", network: "Ethereum" },
    { symbol: "MATIC", name: "Polygon", rate: 0.85, icon: "◊", network: "Polygon" }
  ];

  // Simulate wallet connection
  const connectWallet = async () => {
    try {
      // Simulate MetaMask connection
      const accounts = ["0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4"];
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
      
      toast.success("Wallet Connected", {
        description: "Successfully connected to MetaMask wallet",
      });
    } catch (error) {
      toast.error("Connection Failed", {
        description: "Please install MetaMask to continue",
      });
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
    toast.info("Wallet Disconnected", {
      description: "Your wallet has been disconnected",
    });
  };

  const purchaseNFT = (item: NFTMenuItem) => {
    if (!walletConnected) {
      toast.error("Wallet Required", {
        description: "Please connect your wallet to purchase NFTs",
      });
      return;
    }

    toast.info("NFT Purchase Initiated", {
      description: `Purchasing ${item.name} for ${item.nftPrice} ETH`,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      case 'common': return 'from-blue-400 to-cyan-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400/50';
      case 'rare': return 'border-purple-400/50';
      case 'common': return 'border-blue-400/50';
      default: return 'border-gray-400/50';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-charcoal to-charcoal-light relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Coins className="w-8 h-8 text-gold mr-3" />
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-warm-white">
                Web3 <span className="text-luxury">Dining</span>
              </h2>
            </div>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Experience the future of dining with NFT collectibles, cryptocurrency payments, and blockchain-powered loyalty rewards.
            </p>
          </div>

          {/* Wallet Connection */}
          <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm mb-12">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Wallet className="w-8 h-8 text-gold" />
                  <div>
                    <h3 className="text-xl font-cormorant font-semibold text-gold">
                      Web3 Wallet
                    </h3>
                    {walletConnected ? (
                      <p className="text-warm-gray text-sm">
                        Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      </p>
                    ) : (
                      <p className="text-warm-gray text-sm">
                        Connect your wallet to access Web3 features
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {walletConnected && (
                    <div className="text-right">
                      <div className="text-gold font-semibold">
                        {loyaltyTokens.balance} {loyaltyTokens.symbol}
                      </div>
                      <div className="text-warm-gray text-sm">
                        ≈ ${loyaltyTokens.value}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant={walletConnected ? "ghost-gold" : "luxury"}
                    onClick={walletConnected ? disconnectWallet : connectWallet}
                  >
                    {walletConnected ? "Disconnect" : "Connect Wallet"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* NFT Menu Items */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-cormorant font-bold text-gold mb-4">
                  NFT Dining Experiences
                </h3>
                <p className="text-warm-gray">
                  Exclusive dining experiences with digital collectibles and unique benefits
                </p>
              </div>

              {nftMenuItems.map((item) => (
                <Card 
                  key={item.id}
                  className={`bg-charcoal-light/50 backdrop-blur-sm border-2 ${getRarityBorder(item.rarity)} hover:scale-105 transition-all duration-500 relative overflow-hidden`}
                >
                  {/* Rarity Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(item.rarity)} opacity-5`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`bg-gradient-to-r ${getRarityColor(item.rarity)} text-white border-0 capitalize`}>
                        {item.rarity}
                      </Badge>
                      <div className="text-right">
                        <div className="text-warm-gray text-sm">
                          {item.remaining}/{item.totalSupply} remaining
                        </div>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-cormorant text-gold">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <p className="text-warm-gray text-sm mb-6 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-gold font-semibold mb-3">NFT Benefits:</h4>
                      <ul className="space-y-2">
                        {item.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-warm-gray text-sm">
                            <Star className="w-3 h-3 text-gold mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-warm-gray text-sm">Traditional Price</div>
                        <div className="text-xl font-cormorant font-bold text-warm-white">
                          ${item.price}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-warm-gray text-sm">NFT Price</div>
                        <div className="text-xl font-cormorant font-bold text-gold">
                          {item.nftPrice} ETH
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        variant="ghost-gold" 
                        className="flex-1"
                        onClick={() => purchaseNFT(item)}
                      >
                        Buy Traditional
                      </Button>
                      <Button 
                        variant="luxury" 
                        className="flex-1 relative overflow-hidden"
                        onClick={() => purchaseNFT(item)}
                      >
                        <span className="relative z-10">Mint NFT</span>
                        <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(item.rarity)} opacity-20`}></div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Web3 Features */}
            <div className="space-y-8">
              {/* Loyalty Tokens */}
              <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-green-300 flex items-center">
                    <Gift className="w-6 h-6 mr-2" />
                    BISTRO Loyalty Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {walletConnected ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-charcoal/30 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-300">
                            {loyaltyTokens.balance}
                          </div>
                          <div className="text-warm-gray text-sm">Total Balance</div>
                        </div>
                        <div className="bg-charcoal/30 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-300">
                            ${loyaltyTokens.value}
                          </div>
                          <div className="text-warm-gray text-sm">USD Value</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-charcoal/30 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-green-300">
                            +{loyaltyTokens.earned}
                          </div>
                          <div className="text-warm-gray text-sm">This Month</div>
                        </div>
                        <div className="bg-charcoal/30 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-green-300">
                            {loyaltyTokens.redeemable}
                          </div>
                          <div className="text-warm-gray text-sm">Redeemable</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button variant="ghost-gold" className="flex-1">
                          Trade Tokens
                        </Button>
                        <Button variant="luxury" className="flex-1">
                          Redeem Rewards
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Wallet className="w-12 h-12 text-green-300 mx-auto mb-4 opacity-50" />
                      <p className="text-warm-gray">
                        Connect your wallet to view loyalty tokens
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Crypto Payments */}
              <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-blue-300 flex items-center">
                    <Coins className="w-6 h-6 mr-2" />
                    Cryptocurrency Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cryptoPayments.map((crypto) => (
                      <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-charcoal/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {crypto.icon}
                          </div>
                          <div>
                            <div className="text-warm-white font-semibold">
                              {crypto.name}
                            </div>
                            <div className="text-warm-gray text-sm">
                              {crypto.network}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-300 font-semibold">
                            ${crypto.rate.toLocaleString()}
                          </div>
                          <div className="text-warm-gray text-sm">
                            {crypto.symbol}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                    <div className="flex items-center mb-2">
                      <Shield className="w-4 h-4 text-blue-300 mr-2" />
                      <span className="text-blue-300 font-semibold">Secure Payments</span>
                    </div>
                    <p className="text-warm-gray text-sm">
                      All cryptocurrency transactions are secured by blockchain technology 
                      with instant confirmation and low fees.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain Features */}
              <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-purple-300 flex items-center">
                    <Globe className="w-6 h-6 mr-2" />
                    Blockchain Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-charcoal/30 rounded-lg">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="text-warm-white font-semibold">Smart Contracts</div>
                        <div className="text-warm-gray text-sm">Automated loyalty rewards and reservations</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-charcoal/30 rounded-lg">
                      <Shield className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="text-warm-white font-semibold">Transparent Reviews</div>
                        <div className="text-warm-gray text-sm">Immutable, verified customer feedback</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-charcoal/30 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-warm-white font-semibold">Supply Chain Tracking</div>
                        <div className="text-warm-gray text-sm">Trace ingredients from farm to table</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Web3 Benefits */}
          <div className="mt-16 bg-gradient-to-r from-charcoal-light/40 to-charcoal/40 rounded-xl p-8 border border-gold/20 backdrop-blur-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-cormorant font-bold text-gold mb-4">
                Why Choose Web3 Dining?
              </h3>
              <p className="text-warm-gray max-w-2xl mx-auto">
                Experience the future of restaurant loyalty, payments, and exclusive experiences
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-charcoal" />
                </div>
                <h4 className="text-xl font-cormorant font-semibold text-gold mb-2">
                  True Ownership
                </h4>
                <p className="text-warm-gray text-sm">
                  Own your loyalty points and NFT experiences. Trade, gift, or redeem across platforms.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-cormorant font-semibold text-purple-300 mb-2">
                  Enhanced Security
                </h4>
                <p className="text-warm-gray text-sm">
                  Blockchain-secured transactions and tamper-proof loyalty records for complete transparency.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-cormorant font-semibold text-blue-300 mb-2">
                  Exclusive Access
                </h4>
                <p className="text-warm-gray text-sm">
                  NFT holders get priority reservations, special events, and unique dining experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};