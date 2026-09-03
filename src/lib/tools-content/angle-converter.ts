import type { ToolContent } from "./types";

export const angleConverterContent: ToolContent = {
  heroSubtitle: "Convert Between Degrees, Radians, Gradians & More",
  overview: [
    "Angles are measured in degrees for everyday and geometric use, but radians are the standard unit throughout higher mathematics, physics, and programming (most programming languages' trigonometric functions expect radians, not degrees) — making degree-to-radian conversion one of the most frequently needed angle conversions.",
    "This tool converts between six angle units: degrees (the everyday standard, 360 per full circle), radians (the mathematical standard, 2π per full circle), gradians (a less common metric-style unit, 400 per full circle, occasionally used in surveying), arcminutes and arcseconds (fine subdivisions of a degree, used in astronomy and precise navigation), and turns (a full revolution, useful for rotation-based contexts).",
    "The degree-to-radian relationship is defined by π: 180 degrees equals exactly π radians, which is why radian values often involve π in exact mathematical contexts, though this tool shows the decimal numerical equivalent for practical use rather than a symbolic π-based answer.",
    "This is useful for programming work where trigonometric functions require radians but the natural input is in degrees, navigation and surveying work using gradians, astronomy calculations using arcminutes and arcseconds for very precise angular measurements, or general geometry and engineering angle conversion.",
  ],
  howItWorks: [
    {
      title: "Enter an angle value and select its unit",
      description: "Any of the six supported angle units.",
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
      label: "Degrees to radians",
      input: "180 degrees",
      output: "3.141593 radians (π)",
    },
    {
      label: "Full turn to degrees",
      input: "1 turn",
      output: "360 degrees",
    },
  ],
  faqs: [
    {
      question: "Why do programming languages use radians instead of degrees for trig functions?",
      answer:
        "Radians are the natural mathematical unit for angles because they directly relate an angle to arc length on a unit circle, which simplifies calculus and many mathematical formulas involving trigonometric functions — this is why virtually every programming language's built-in sin, cos, and tan functions expect radian input, not degrees.",
    },
    {
      question: "What are gradians used for?",
      answer:
        "Gradians (400 per full circle, making a right angle exactly 100 gradians) were designed as a metric-friendly alternative to degrees, and still see occasional use in surveying and some European engineering contexts, though they're far less common than degrees or radians in everyday use.",
    },
    {
      question: "What's the difference between arcminutes and arcseconds?",
      answer:
        "An arcminute is 1/60th of a degree, and an arcsecond is 1/60th of an arcminute (so 1/3600th of a degree) — these fine subdivisions are used in astronomy and precise navigation contexts where whole or fractional degrees aren't precise enough, similar to how minutes and seconds subdivide an hour.",
    },
    {
      question: "Why is 180 degrees exactly π radians?",
      answer:
        "This comes from the definition of a radian as the angle subtended by an arc equal in length to the circle's radius — since a full circle's circumference is 2πr, a full circle is 2π radians, and half a circle (180 degrees) is correspondingly exactly π radians, an exact mathematical relationship, not an approximation.",
    },
    {
      question: "What is a 'turn' used for?",
      answer:
        "A turn represents one full revolution (360 degrees or 2π radians) and is useful in contexts involving rotation counts — like describing how many full rotations a wheel or motor makes — where expressing the value in degrees would require an unwieldy large number for multiple rotations.",
    },
  ],
};
