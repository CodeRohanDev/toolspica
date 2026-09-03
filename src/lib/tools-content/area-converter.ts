import type { ToolContent } from "./types";

export const areaConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Square Meters, Acres, Hectares & More",
  overview: [
    "Area measurement spans an unusually wide range of units depending on scale and context — square millimeters for precise engineering work, square meters for a room or apartment, hectares and acres for land and real estate, and square kilometers for large geographic regions. This tool converts between all nine of these common area units.",
    "Area units follow a squared relationship to their underlying length units, which is why the conversion factors involve squaring the length conversion — for example, since 1 foot equals exactly 0.3048 meters, 1 square foot equals 0.3048² = 0.09290304 square meters, not simply 0.3048 square meters, a mistake that's easy to make when converting area casually.",
    "Acres and hectares deserve special attention since they're not simply scaled versions of a smaller unit the way square meters and square kilometers are — an acre (used primarily in the US and UK for land measurement) equals exactly 4,046.8564224 square meters, while a hectare (used internationally, especially in agriculture) equals exactly 10,000 square meters. This tool includes both with their precise defined values.",
    "This is useful for real estate transactions crossing unit systems, agricultural and land measurement, construction and flooring calculations, or converting a property listing's area between the units different countries and platforms conventionally use.",
  ],
  howItWorks: [
    {
      title: "Enter an area value and select its unit",
      description: "Any of the nine supported area units.",
    },
    {
      title: "Select the target unit",
      description: "Or use the swap button to reverse direction.",
    },
    {
      title: "View the exact converted result",
      description: "Plus the value in every other supported unit at once.",
    },
  ],
  examples: [
    {
      label: "Square meters to square feet",
      input: "1 square meter",
      output: "10.763910 square feet",
    },
    {
      label: "Acres to hectares",
      input: "1 acre",
      output: "0.404686 hectares",
    },
  ],
  faqs: [
    {
      question: "Why do area conversion factors involve squaring the length factor?",
      answer:
        "Area is a two-dimensional measurement, so converting between area units requires squaring the underlying length conversion factor — since 1 foot = 0.3048 meters, 1 square foot = (0.3048)² = 0.09290304 square meters, not 0.3048 square meters, which is a common mistake when converting area casually rather than using the correctly squared factor.",
    },
    {
      question: "What's the difference between an acre and a hectare?",
      answer:
        "An acre (4,046.8564224 m²) is a traditional imperial/US unit primarily used for land measurement in the US and UK, while a hectare (exactly 10,000 m²) is the metric unit used internationally, especially in agriculture and land measurement outside English-speaking countries — a hectare is somewhat larger than an acre (about 2.47 acres per hectare).",
    },
    {
      question: "How is an acre defined if it's not a clean metric number?",
      answer:
        "An acre historically derives from the amount of land a yoke of oxen could plow in a day, standardized over time to its current precise definition of 4,046.8564224 square meters (equivalently, 43,560 square feet) — an oddly specific number that reflects its historical rather than purely mathematical origin.",
    },
    {
      question: "Which countries primarily use square feet for real estate?",
      answer:
        "The United States commonly uses square feet for residential real estate listings, while most other countries use square meters — a common point of confusion when comparing international property listings without converting to a common unit first.",
    },
    {
      question: "Why include both very small (mm²) and very large (km²) units?",
      answer:
        "The full range from square millimeters through square kilometers covers everything from precise engineering and manufacturing tolerances up to large-scale geographic and land measurement, so the same tool works whether you need to convert a tiny component's surface area or a country's land area.",
    },
  ],
};
