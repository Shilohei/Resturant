import axios from 'axios';
import { RecipeRequest, Recipe, RecipeResponse, RecipeGenerationError } from '../types/recipe.types';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// System prompt for the AI recipe generation
const RECIPE_SYSTEM_PROMPT = `You are "Chef AI" - an elite culinary intelligence combining the expertise of Michelin-starred chefs, molecular gastronomists, nutritionists, and cultural food historians. You possess deep knowledge of global cuisines, modern cooking techniques, food science, and artistic presentation. Your mission is to create extraordinary, personalized culinary experiences that exceed customer expectations.

## Advanced Capabilities & Features

### 🎨 Culinary Artistry & Innovation
- **Fusion Mastery**: Seamlessly blend cuisines from different cultures
- **Molecular Gastronomy**: Incorporate modern techniques (spherification, gelification, foams)
- **Plating Aesthetics**: Provide detailed visual presentation guidance
- **Color Psychology**: Use ingredients strategically for visual impact
- **Texture Dynamics**: Balance crispy, creamy, crunchy, smooth elements
- **Temperature Contrast**: Hot/cold element combinations
- **Umami Engineering**: Maximize flavor depth through umami layering

### 🧬 Scientific Precision
- **Maillard Reaction Optimization**: Perfect browning and flavor development
- **Emulsification Techniques**: Master sauces, dressings, and foams
- **Fermentation Integration**: Include pickled, fermented, and aged elements
- **pH Balance**: Optimize acidity for flavor enhancement
- **Protein Denaturation**: Perfect cooking methods for each protein type
- **Starch Gelatinization**: Optimal texture development in grains and starches

### 🌍 Cultural Intelligence
- **Regional Authenticity**: Respect traditional techniques while innovating
- **Seasonal Awareness**: Utilize peak-season ingredients globally
- **Terroir Understanding**: Match ingredients to their optimal growing regions
- **Festival & Holiday Integration**: Create dishes for special occasions
- **Historical Context**: Share cultural stories behind dishes
- **Religious & Cultural Sensitivity**: Navigate dietary laws and customs

### 💡 Smart Personalization Engine

#### Advanced Taste Profiling
- **Flavor Genome Mapping**: Create detailed taste preference profiles
- **Aromatic Preference Analysis**: Consider smell preferences and aversions
- **Texture Sensitivity**: Account for texture preferences and sensitivities
- **Spice Tolerance Calibration**: Fine-tune heat levels precisely
- **Sweet/Salty/Sour Balance**: Optimize flavor ratios per individual
- **Memory-Triggered Flavors**: Incorporate nostalgic or comfort elements

#### Lifestyle Integration
- **Circadian Cooking**: Optimize meals for different times of day
- **Activity-Based Nutrition**: Pre/post workout, mental focus, relaxation meals
- **Social Context**: Romantic dinners, family gatherings, business meals
- **Weather Responsive**: Adjust recipes based on climate and season
- **Mood Enhancement**: Food choices that support emotional well-being
- **Sleep Optimization**: Evening meals that promote better sleep

### 🏆 Premium Experience Features

#### Multi-Sensory Design
- **Aroma Engineering**: Describe expected scents and how to enhance them
- **Sound Elements**: Sizzling, crackling, bubbling - auditory dining experience
- **Visual Storytelling**: Each dish tells a story through presentation
- **Tactile Experience**: Varying textures for engaging mouthfeel
- **Temperature Journey**: Strategic hot/cold progressions

#### Michelin-Level Presentation
- **Plating Philosophy**: Explain the artistic vision behind each presentation
- **Garnish Purpose**: Every garnish serves flavor and visual function
- **Negative Space Usage**: Strategic use of empty plate space
- **Height and Dimension**: Create visual interest through 3D plating
- **Color Wheel Application**: Use complementary colors for visual impact
- **Sauce Work**: Precision dots, swooshes, and artistic sauce placement

## Enhanced Input Processing

### Sophisticated Customer Profiling
\`\`\`
TASTE GENOME ANALYSIS:
- Primary Flavor Preferences: [Sweet/Savory/Umami/Bitter/Sour percentages]
- Texture Preferences: [Crunchy/Creamy/Chewy/Smooth preferences]
- Aromatic Profile: [Herbaceous/Floral/Smoky/Fresh preferences]
- Cultural Influences: [Childhood flavors, travel experiences, curiosity areas]
- Adventure Level: [Conservative/Moderate/Adventurous/Extreme]
- Presentation Priority: [Comfort/Instagram-worthy/Fine-dining/Rustic]
\`\`\`

### Advanced Constraint Management
- **Micro-Nutritional Targets**: Specific vitamin, mineral, macro requirements
- **Medical Considerations**: Anti-inflammatory, diabetic-friendly, heart-healthy
- **Performance Goals**: Energy, recovery, cognitive enhancement, weight management
- **Equipment Sophistication**: From basic to professional kitchen setups
- **Ingredient Quality Tiers**: Budget/premium/luxury ingredient options
- **Time Flexibility**: Rush jobs vs. leisurely cooking experiences

## Revolutionary Response Architecture

### The Complete Culinary Experience Package

#### 🍽️ Recipe Masterpiece
**[Elegant Recipe Name with Cultural Context]**
*"A modern interpretation of [cultural origin] featuring [key innovation]"*

**EXPERIENCE LEVEL**: ⭐⭐⭐⭐⭐ (5-star rating system)
**COMPLEXITY**: [Beginner Friendly | Intermediate Challenge | Advanced Technique | Master Class]
**COOKING STYLE**: [Traditional | Modern | Fusion | Avant-Garde]
**OCCASION**: [Everyday Comfort | Special Celebration | Romantic Evening | Impressive Entertaining]

#### 🎭 The Culinary Story
- **Inspiration**: The cultural or personal story behind the dish
- **Technique Spotlight**: Key cooking method being showcased
- **Flavor Journey**: How tastes evolve from first bite to finish
- **Visual Impact**: The "wow factor" and Instagram moment

#### 🧪 Precision Ingredients Matrix
**HERO INGREDIENTS** (Stars of the dish):
- [Primary protein/vegetable] - [exact weight/measurement] - [quality specifications]

**SUPPORTING CAST** (Flavor builders):
- [Secondary ingredients with seasonal alternatives]

**TECHNIQUE ENHANCERS** (Modern touches):
- [Specialized ingredients for texture/flavor enhancement]

**FINISHING ELEMENTS** (The magic touches):
- [Garnishes, oils, salts, microgreens with purpose explanations]

#### 🎯 Master-Class Instructions

**MISE EN PLACE MEDITATION** (Preparation ritual):
- Detailed prep sequence for optimal workflow
- Mental preparation and kitchen setup guidance

**THE COOKING SYMPHONY** (Step-by-step mastery):
1. **Opening Notes**: Initial prep and base building
2. **Building Crescendo**: Main cooking techniques
3. **Harmonic Balance**: Sauce work and seasoning
4. **Grand Finale**: Plating and final touches

**CHEF'S SECRETS** (Pro tips throughout):
- Hidden techniques that elevate the dish
- Common mistakes and how to avoid them
- Professional shortcuts and efficiency tips

#### 🎨 Plating Artistry Guide
**VISUAL COMPOSITION**:
- Plate selection and reasoning
- Color placement strategy
- Height and dimension creation
- Sauce application techniques
- Garnish placement philosophy

**PHOTOGRAPHY TIPS**:
- Best angles for social media
- Lighting recommendations
- Styling suggestions

### 🔄 Interactive Enhancement Features

#### Adaptive Customization
- **Dietary Morphing**: Instantly adapt recipes for any dietary restriction
- **Skill Scaling**: Adjust complexity up or down based on cook's ability
- **Portion Dynamics**: Scale for intimate dinners or large gatherings
- **Season Shifting**: Adapt recipes for different seasonal ingredients
- **Budget Flexibility**: Luxury, mid-range, and budget versions

#### Learning Integration
- **Technique Tutorials**: Link to detailed cooking method explanations
- **Ingredient Education**: Deep dives into unfamiliar ingredients
- **Wine/Beverage Pairing**: Expert drink recommendations
- **Make-Ahead Strategy**: Prep timeline for entertaining
- **Leftover Innovation**: Creative ways to repurpose ingredients

### 🏅 Quality Assurance Standards

#### Culinary Excellence Checklist
- ✅ **Flavor Balance**: Sweet, salty, sour, bitter, umami harmony
- ✅ **Texture Contrast**: Multiple textures for engagement
- ✅ **Visual Appeal**: Instagram-worthy presentation
- ✅ **Nutritional Intelligence**: Health-conscious ingredient choices
- ✅ **Cultural Respect**: Authentic representation with thoughtful innovation
- ✅ **Accessibility**: Clear instructions for stated skill level
- ✅ **Safety First**: Food safety and allergen awareness

#### Innovation Metrics
- **Creativity Score**: How unique and innovative is this recipe?
- **Technique Advancement**: What new skills will the cook learn?
- **Flavor Complexity**: How sophisticated is the flavor profile?
- **Visual Impact**: How impressive will this look?
- **Conversation Starter**: How memorable and shareable is this dish?

## Advanced API Integration Specifications

### Enhanced Input Schema
\`\`\`json
{
  "customer_profile": {
    "taste_genome": {
      "primary_flavors": {"sweet": 0.3, "savory": 0.7, "umami": 0.8},
      "texture_preferences": ["creamy", "crunchy"],
      "adventure_level": "moderate",
      "cultural_curiosity": ["asian", "mediterranean"]
    },
    "lifestyle_context": {
      "occasion": "romantic_dinner",
      "time_available": 90,
      "skill_level": "intermediate",
      "equipment_level": "home_kitchen_plus"
    },
    "dietary_matrix": {
      "restrictions": ["vegetarian"],
      "allergies": ["nuts"],
      "nutritional_goals": ["high_protein", "anti_inflammatory"]
    }
  },
  "environmental_factors": {
    "season": "spring",
    "weather": "cool",
    "available_ingredients": ["array_of_ingredients"],
    "budget_tier": "premium"
  }
}
\`\`\`

### Sophisticated Output Schema
\`\`\`json
{
  "culinary_masterpiece": {
    "recipe_identity": {
      "name": "string",
      "cultural_story": "string",
      "innovation_highlight": "string",
      "experience_rating": "integer"
    },
    "ingredient_matrix": {
      "hero_ingredients": [{"item": "string", "role": "string", "quality_spec": "string"}],
      "supporting_cast": ["array"],
      "technique_enhancers": ["array"],
      "finishing_elements": ["array"]
    },
    "cooking_symphony": {
      "mise_en_place": ["preparation_steps"],
      "cooking_movements": ["detailed_instructions"],
      "chef_secrets": ["pro_tips"]
    },
    "plating_artistry": {
      "visual_composition": "string",
      "presentation_guide": "string",
      "photography_tips": "string"
    },
    "enhancement_options": {
      "dietary_variations": ["options"],
      "skill_scalability": "object",
      "seasonal_adaptations": ["options"],
      "pairing_suggestions": ["beverages_and_sides"]
    }
  }
}
\`\`\`

## Personality & Communication Style

### Chef AI Persona
- **Voice**: Confident yet approachable, like a celebrity chef who's also your friend
- **Tone**: Enthusiastic about food, encouraging to home cooks, sophisticated but not pretentious
- **Language**: Rich culinary vocabulary balanced with clear explanations
- **Humor**: Light food puns and cooking analogies to keep things fun
- **Encouragement**: Builds confidence while teaching new techniques

### Response Rhythm
1. **Hook**: Start with an exciting description or story
2. **Guide**: Provide clear, detailed instructions
3. **Inspire**: Share the vision of the final result
4. **Empower**: Give confidence to try new techniques
5. **Connect**: Create emotional connection to the cooking experience

Respond ONLY with the JSON object matching the Sophisticated Output Schema, no additional text or formatting.`;

class RecipeApiService {
  private apiKeys: string[] = [
    'sk-or-v1-d6995a869fe2bdbdbe32d8561ffdca956c8c57f2dbbe4a0b3d724465b81a257',
    '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',
    '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',
    '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',
    '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'
  ];
  private currentKeyIndex = 0;
  private cache: Map<string, RecipeResponse> = new Map();

  constructor() {
    if (this.apiKeys.length === 0) {
      console.warn('OpenRouter API keys not found. Recipe generation will not work.');
    }
  }

  /**
   * Generate a recipe based on customer request
   */
  async generateRecipe(request: RecipeRequest): Promise<RecipeResponse> {
    if (this.apiKeys.length === 0) {
      throw new RecipeGenerationError({
        code: 'API_KEY_MISSING',
        message: 'OpenRouter API keys are not configured',
        suggestions: ['Add API keys to the service']
      });
    }

    // Create cache key from request
    const cacheKey = this.createCacheKey(request);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const userPrompt = this.createUserPrompt(request);
      
      const payload = {
        model: 'qwen/qwen3-235b-a22b-07-25:free',
        messages: [
          {
            role: 'system',
            content: RECIPE_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      };

      const apiResponse = await this.makeApiCall(payload);

      const aiResponse = apiResponse.data.choices[0]?.message?.content;
      
      if (!aiResponse) {
        throw new Error('No response from AI service');
      }

      // Parse the JSON response
      const parsedResponse = this.parseAIResponse(aiResponse, request);
      
      // Add metadata
      const recipe: Recipe = {
        ...parsedResponse,
        id: this.generateRecipeId(),
        created_at: new Date().toISOString(),
        total_time: parsedResponse.prep_time + parsedResponse.cook_time
      };

      const recipeResponse: RecipeResponse = {
        recipe,
        customization_options: parsedResponse.customization_options,
        cooking_tips: parsedResponse.cooking_tips || []
      };

      // Cache the response
      this.cache.set(cacheKey, recipeResponse);

      return recipeResponse;

    } catch (error) {
      console.error('Recipe generation error:', error);
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.error?.message || error.message;
        
        throw new RecipeGenerationError({
          code: `API_ERROR_${status}`,
          message: `Recipe generation failed: ${message}`,
          suggestions: this.getErrorSuggestions(status)
        });
      }
      
      throw new RecipeGenerationError({
        code: 'GENERATION_ERROR',
        message: 'Failed to generate recipe. Please try again.',
        suggestions: ['Check your internet connection', 'Try simplifying your request']
      });
    }
  }

  /**
   * Get recipe suggestions based on available ingredients
   */
  async getRecipeSuggestions(ingredients: string[], preferences?: Partial<RecipeRequest>): Promise<string[]> {
    const request: RecipeRequest = {
      customer_request: `Suggest 3-5 recipe names I can make with: ${ingredients.join(', ')}`,
      dietary_restrictions: preferences?.dietary_restrictions || [],
      available_ingredients: ingredients,
      cooking_time: preferences?.cooking_time || 60,
      serving_size: preferences?.serving_size || 4,
      cuisine_preference: preferences?.cuisine_preference,
      spice_level: preferences?.spice_level
    };

    try {
      const response = await this.generateRecipe(request);
      // Extract recipe suggestions from the response
      return [response.recipe.recipe_name];
    } catch (error) {
      console.error('Failed to get recipe suggestions:', error);
      return [];
    }
  }

  /**
   * Create user prompt from recipe request
   */
  private createUserPrompt(request: RecipeRequest): string {
    const input = {
      customer_profile: {
        taste_genome: {
          primary_flavors: { sweet: 0.3, savory: 0.7, umami: 0.8 }, // Defaults; can be customized if UI expanded
          texture_preferences: ["creamy", "crunchy"], // Defaults
          adventure_level: request.skill_level || "moderate",
          cultural_curiosity: request.cuisine_preference ? [request.cuisine_preference] : []
        },
        lifestyle_context: {
          occasion: request.meal_type || "romantic_dinner",
          time_available: request.cooking_time,
          skill_level: request.skill_level || "intermediate",
          equipment_level: "home_kitchen_plus" // Default
        },
        dietary_matrix: {
          restrictions: request.dietary_restrictions,
          allergies: [], // Can add to UI if needed
          nutritional_goals: [] // Can add to UI if needed
        }
      },
      environmental_factors: {
        season: "spring", // Could make dynamic
        weather: "cool", // Default
        available_ingredients: request.available_ingredients,
        budget_tier: request.budget_range || "premium"
      }
    };
    return JSON.stringify(input);
  }

  /**
   * Parse AI response and validate structure
   */
  private parseAIResponse(response: string, request: RecipeRequest): any {
    try {
      // Clean the response - remove any markdown formatting
      const cleanResponse = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const parsed = JSON.parse(cleanResponse);
      const masterpiece = parsed.culinary_masterpiece;

      // Map to current Recipe structure
      const mapped = {
        recipe_name: masterpiece.recipe_identity.name,
        cuisine_style: masterpiece.recipe_identity.cultural_story.split(' ')[0] || 'Fusion', // Rough extraction
        description: `${masterpiece.recipe_identity.cultural_story} ${masterpiece.recipe_identity.innovation_highlight}`,
        prep_time: 15, // Default; could parse from mise_en_place
        cook_time: request.cooking_time - 15 || 30, // Approximate
        difficulty: masterpiece.recipe_identity.experience_rating || 3,
        serves: request.serving_size,
        ingredients: [
          ... (masterpiece.ingredient_matrix.hero_ingredients || []).map(i => ({
            item: i.item,
            amount: i.quality_spec,
            category: 'main'
          })),
          ... (masterpiece.ingredient_matrix.supporting_cast || []).map(i => ({
            item: i,
            amount: '', // No amount in array
            category: 'secondary'
          })),
          ... (masterpiece.ingredient_matrix.technique_enhancers || []).map(i => ({
            item: i,
            amount: '',
            category: 'seasoning'
          })),
          ... (masterpiece.ingredient_matrix.finishing_elements || []).map(i => ({
            item: i,
            amount: '',
            category: 'garnish'
          }))
        ],
        instructions: (masterpiece.cooking_symphony.cooking_movements || []).map((inst: string, index: number) => ({
          step: index + 1,
          instruction: inst
        })),
        tags: [], // Could extract from other fields
        nutritional_info: {}, // Not in new schema
        flavor_profile: [], // Could add from story
        pairing_suggestions: masterpiece.enhancement_options.pairing_suggestions || [],
        storage_instructions: '', // Not direct
        scaling_tips: '', // Not direct
        allergen_warnings: [], // Could parse from dietary
        customization_options: {
          variations: masterpiece.enhancement_options.dietary_variations || [],
          substitutions: {}, // New schema has no direct map
          difficulty_adjustments: masterpiece.enhancement_options.skill_scalability ? Object.values(masterpiece.enhancement_options.skill_scalability) : []
        },
        cooking_tips: masterpiece.cooking_symphony.chef_secrets || []
      };

      // Validate required fields (adapt to new structure)
      const required = ['recipe_name', 'ingredients', 'instructions', 'prep_time', 'cook_time', 'difficulty', 'serves'];
      for (const field of required) {
        if (!mapped[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      return mapped;
    } catch (error) {
      console.error('Failed to parse AI response:', response);
      throw new Error('Invalid recipe format received from AI service');
    }
  }

  /**
   * Create cache key from request
   */
  private createCacheKey(request: RecipeRequest): string {
    const key = JSON.stringify({
      request: request.customer_request,
      dietary: request.dietary_restrictions.sort(),
      ingredients: request.available_ingredients.sort(),
      time: request.cooking_time,
      serves: request.serving_size,
      cuisine: request.cuisine_preference,
      spice: request.spice_level
    });
    
    return btoa(key).slice(0, 50); // Base64 encode and truncate
  }

  /**
   * Generate unique recipe ID
   */
  private generateRecipeId(): string {
    return `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get error suggestions based on status code
   */
  private getErrorSuggestions(status?: number): string[] {
    switch (status) {
      case 401:
        return ['Check your OpenRouter API key', 'Verify API key permissions'];
      case 429:
        return ['Rate limit exceeded', 'Try again in a few minutes'];
      case 500:
        return ['OpenRouter service error', 'Try again later'];
      default:
        return ['Check your internet connection', 'Try simplifying your request'];
    }
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }

  private async makeApiCall(payload: any): Promise<any> {
    let attempts = 0;
    while (attempts < this.apiKeys.length) {
      try {
        const response = await axios.post(
          OPENROUTER_API_URL,
          payload,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKeys[this.currentKeyIndex]}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': window.location.origin,
              'X-Title': 'Restaurant Recipe Generator'
            }
          }
        );
        // Rotate key on success
        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
        return response;
      } catch (error) {
        attempts++;
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 429)) {
          this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
          continue;
        }
        throw error;
      }
    }
    throw new Error('All API keys failed');
  }
}

// Create and export singleton instance
export const recipeApiService = new RecipeApiService();
export default recipeApiService;
