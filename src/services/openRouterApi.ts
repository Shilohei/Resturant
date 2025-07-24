import OpenAI from "openai";

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.REACT_APP_OPENROUTER_API_KEY, 
});

export const searchDishes = async (query: string, menu: any) => {
  if (!query) {
    return menu;
  }
  try {
    const response = await openrouter.chat.completions.create({
        model: "anthropic/claude-3-haiku",
        messages: [
          {
            role: "system",
            content:
              "You are a smart search assistant for a restaurant menu. The user will provide a search query, and you will return a list of matching dish names from the menu. Only return the names of the dishes that match the query. Do not return any other text or explanations.",
          },
          {
            role: "user",
            content: `Search for dishes that match the following query: "${query}". Here is the menu: ${JSON.stringify(
              menu.map((item: any) => item.name)
            )}`,
          },
        ],
      });
  
      if (response.choices.length > 0 && response.choices[0].message.content) {
        const content = response.choices[0].message.content;
        try {
          // Attempt to parse the content as JSON
          const searchResults = JSON.parse(content);
          const matchedDishes = menu.filter((item: any) =>
            searchResults.includes(item.name)
          );
          return matchedDishes.length > 0 ? matchedDishes : [];
        } catch (e) {
          // If parsing fails, treat it as a plain text list
          const searchResults = content
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
          const matchedDishes = menu.filter((item: any) =>
            searchResults.includes(item.name)
          );
          return matchedDishes.length > 0 ? matchedDishes : [];
        }
      }
  
      return [];
    } catch (error) {
      console.error("Error searching dishes:", error);
      return [];
    }
  }; 