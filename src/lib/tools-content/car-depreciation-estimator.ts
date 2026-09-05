import type { ToolContent } from "./types";

export const carDepreciationEstimatorContent: ToolContent = {
  heroSubtitle: "Estimate Your Car's Value Over the Next Several Years",
  overview: [
    "A new car loses value the moment it's driven off the lot, and that depreciation continues — unevenly — over the following years, with the steepest drop typically happening in the first year and a more gradual decline afterward, following a pattern well documented across the auto industry.",
    "This estimator applies typical industry depreciation rates — roughly a 20% drop in year one, followed by about 12% per year afterward — to your vehicle's purchase price, projecting its estimated resale value for each year over your chosen time horizon.",
    "The year-by-year table shows both the estimated value and cumulative depreciation as a dollar amount and percentage, useful for deciding how long to keep a vehicle, budgeting for a future trade-in, or simply understanding how much of your purchase price you're likely to recover if you sell later.",
  ],
  howItWorks: [
    { title: "Enter the purchase price", description: "Input what the vehicle cost (or would cost) new." },
    { title: "Set the projection period", description: "Choose how many years ahead to estimate value for." },
    { title: "Read the depreciation schedule", description: "See estimated value and total depreciation for each year." },
  ],
  examples: [
    {
      label: "$35,000 new car, 5-year projection",
      input: "Price: $35,000, Years: 5",
      output: "Year 5 estimated value: ≈ $15,400 (56% depreciated)",
    },
  ],
  faqs: [
    {
      question: "How accurate is this estimate for my specific car?",
      answer: "This uses typical industry-wide averages — actual depreciation varies significantly by make, model, mileage, condition, and market demand. Some brands and models hold value far better or worse than the average.",
    },
    {
      question: "Why is year one depreciation so much steeper?",
      answer: "New cars lose value quickly once they're no longer 'new' and have an owner history, plus the buyer effectively pays a premium for the new-car experience that a used buyer won't pay for the same vehicle a year later.",
    },
    {
      question: "Does mileage affect this estimate?",
      answer: "No — this model is based purely on elapsed time, following typical average depreciation curves. High or unusually low mileage would shift actual resale value up or down from this estimate.",
    },
    {
      question: "Is this estimate calculated privately?",
      answer: "Yes — the projection is computed entirely in your browser using the purchase price and time horizon you enter, with nothing sent to any server.",
    },
  ],
};
