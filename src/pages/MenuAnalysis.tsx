import { AsianFusionMenu } from "@/components/AsianFusionMenu";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, TrendingUp, Users, DollarSign, Star } from "lucide-react";

const MenuAnalysis = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Header />
      
      {/* Analysis Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-charcoal-light to-charcoal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white mb-4">
              Menu Consultant <span className="text-luxury">Analysis</span>
            </h1>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">
              Comprehensive review and optimization of Asian fusion restaurant menu structure, 
              pricing strategy, and customer experience enhancement.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Analysis Report */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-cormorant font-bold text-gold mb-12 text-center">
              Executive Summary & Recommendations
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Menu Organization Analysis */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-gold flex items-center">
                    <TrendingUp className="mr-2" size={24} />
                    Menu Organization & Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Improved Categorization</h4>
                        <p className="text-warm-gray text-sm">Reorganized from country-based to course-based structure for better customer navigation</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Logical Progression</h4>
                        <p className="text-warm-gray text-sm">Small Plates → Soups → Mains → Plant-Based → Desserts creates natural dining flow</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="text-yellow-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Recommendation</h4>
                        <p className="text-warm-gray text-sm">Add beverage section with Asian-inspired cocktails and traditional teas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Strategy */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-gold flex items-center">
                    <DollarSign className="mr-2" size={24} />
                    Pricing Strategy Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Strategic Price Points</h4>
                        <p className="text-warm-gray text-sm">Appetizers $9-15, Mains $17-32 with premium options clearly positioned</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">High-Margin Highlights</h4>
                        <p className="text-warm-gray text-sm">Chef's specials and signature dishes positioned as premium offerings</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="text-blue-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Bundle Opportunities</h4>
                        <p className="text-warm-gray text-sm">Suggest combo meals and tasting menus for increased average order value</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cultural Authenticity */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-gold flex items-center">
                    <Star className="mr-2" size={24} />
                    Cultural Authenticity & Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Authentic Representations</h4>
                        <p className="text-warm-gray text-sm">Each dish maintains cultural integrity while being accessible to diverse palates</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Balanced Coverage</h4>
                        <p className="text-warm-gray text-sm">Equal representation across Japan, China, Korea, Thailand, and Vietnam</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="text-blue-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Expansion Opportunity</h4>
                        <p className="text-warm-gray text-sm">Consider adding Indian and Malaysian dishes for broader Asian representation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Experience */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-cormorant text-gold flex items-center">
                    <Users className="mr-2" size={24} />
                    Customer Experience Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Clear Dietary Indicators</h4>
                        <p className="text-warm-gray text-sm">Visual badges for vegetarian, gluten-free, and spice levels improve accessibility</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Enhanced Descriptions</h4>
                        <p className="text-warm-gray text-sm">Detailed ingredient lists and cooking methods help unfamiliar customers</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-400 mt-1" size={16} />
                      <div>
                        <h4 className="text-warm-white font-semibold">Preparation Times</h4>
                        <p className="text-warm-gray text-sm">Clear timing expectations improve customer satisfaction and table turnover</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Implementation Priorities */}
            <Card className="bg-gradient-to-r from-gold/10 to-burgundy/10 border-gold/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-cormorant text-gold text-center">
                  Implementation Priority Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Badge className="bg-red-500/20 text-red-300 border-red-400/30 mb-3">
                      High Priority
                    </Badge>
                    <ul className="space-y-2 text-warm-gray text-sm">
                      <li>• Visual spice level indicators</li>
                      <li>• Chef's special highlights</li>
                      <li>• Allergen information display</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 mb-3">
                      Medium Priority
                    </Badge>
                    <ul className="space-y-2 text-warm-gray text-sm">
                      <li>• Preparation time estimates</li>
                      <li>• Country origin labels</li>
                      <li>• Popular item badges</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30 mb-3">
                      Future Enhancements
                    </Badge>
                    <ul className="space-y-2 text-warm-gray text-sm">
                      <li>• Seasonal menu rotations</li>
                      <li>• Tasting menu options</li>
                      <li>• Wine pairing suggestions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Improved Menu Implementation */}
      <AsianFusionMenu />
    </div>
  );
};

export default MenuAnalysis;