import type { ToolContent } from "./types";

export const ingredientWeightConverterContent: ToolContent = {
  heroSubtitle: "Convert Cups and Tablespoons to Grams for Common Baking Ingredients",
  overview: [
    "A cup of flour and a cup of sugar don't weigh the same amount — different ingredients pack to different densities, so recipes written by weight (common in professional and European baking) can't be accurately converted to volume, or vice versa, using a single universal conversion factor.",
    "This tool converts a volume measurement of a specific ingredient — flour, sugar, butter, brown sugar, milk, or water — into its equivalent weight in grams and ounces, using commonly cited average weights per cup for each ingredient.",
    "It's most useful when following a recipe written in weight while only having volume measuring cups on hand, or the reverse: converting a volume-based recipe to weight for more precise, scale-based baking, which professional bakers generally consider more accurate than volume measurement.",
  ],
  howItWorks: [
    { title: "Enter an amount and volume unit", description: "Input the quantity and select cup, tablespoon, teaspoon, or another volume unit." },
    { title: "Select the ingredient", description: "Choose from common baking ingredients like flour, sugar, or butter." },
    { title: "Read the weight", description: "See the equivalent weight in grams and ounces instantly." },
  ],
  examples: [
    {
      label: "1 cup of all-purpose flour",
      input: "1 cup, All-purpose flour",
      output: "≈ 120 g (4.23 oz)",
    },
  ],
  faqs: [
    {
      question: "Why does a cup of flour weigh less than a cup of sugar?",
      answer: "Flour is light and airy with more trapped air between particles, while granulated sugar crystals pack more densely — so the same volume contains a different mass for each ingredient.",
    },
    {
      question: "How accurate are these weight conversions?",
      answer: "They use commonly cited average weights per cup, but actual weight can vary by up to 10-15% depending on how an ingredient is packed, scooped, or sifted — for baking precision, weighing directly on a kitchen scale is always more accurate than converting from volume.",
    },
    {
      question: "Why do professional bakers prefer weight over volume?",
      answer: "Weight measurements are unaffected by how tightly an ingredient is packed into a measuring cup, making them far more consistent and reproducible than volume measurements — especially important for delicate recipes like bread and pastry.",
    },
    {
      question: "Is my ingredient data sent anywhere?",
      answer: "No — all conversions are calculated locally in your browser using fixed density values, with nothing sent to any server.",
    },
  ],
};
