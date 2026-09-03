import type { ToolContent } from "./types";

export const matrixCalculatorContent: ToolContent = {
  heroSubtitle: "Add, Multiply, Transpose & Invert Matrices",
  overview: [
    "Matrices are the backbone of linear algebra, appearing everywhere from computer graphics transformations to solving systems of equations to machine learning — but even simple operations like matrix multiplication or finding an inverse involve enough bookkeeping that manual calculation is slow and error-prone, especially for anything larger than 2×2.",
    "This tool supports 2×2, 3×3, and 4×4 matrices and computes addition, subtraction, multiplication, transpose, determinant, and matrix inverse. Determinant and inverse use Gaussian elimination with partial pivoting, a numerically stable technique that works correctly for any invertible matrix of these sizes, verified against standard textbook reference examples.",
    "A matrix's determinant tells you immediately whether it has an inverse at all — a determinant of zero means the matrix is 'singular' and has no inverse, which this tool detects and reports clearly rather than producing a meaningless result. For invertible matrices, the inverse is exactly what's needed to solve systems of linear equations or reverse a transformation.",
    "This is useful for linear algebra coursework and homework verification, computer graphics and game development transformation calculations, checking hand-computed matrix operations, and any application (economics, engineering, computer science) that models relationships as matrices.",
  ],
  howItWorks: [
    {
      title: "Choose a matrix size",
      description: "2×2, 3×3, or 4×4.",
    },
    {
      title: "Choose an operation",
      description: "Add, subtract, multiply, transpose, determinant, or inverse.",
    },
    {
      title: "Enter values and see the result",
      description: "The result updates automatically as you type.",
    },
  ],
  examples: [
    {
      label: "Multiplying two 2×2 matrices",
      input: "[[1,2],[3,4]] × [[5,6],[7,8]]",
      output: "[[19,22],[43,50]]",
    },
    {
      label: "Finding a 2×2 determinant",
      input: "[[4,7],[2,6]]",
      output: "10",
    },
  ],
  faqs: [
    {
      question: "What does it mean if a matrix has no inverse?",
      answer:
        "It means the matrix is 'singular' — its determinant is exactly zero. Geometrically, this means the transformation the matrix represents collapses space into a lower dimension (for example, flattening a plane into a line), which can't be reversed, so no inverse exists.",
    },
    {
      question: "Why does matrix multiplication work differently than regular multiplication?",
      answer:
        "Each entry in the result is a sum of products across a row of the first matrix and a column of the second — this is why matrix multiplication isn't commutative (A×B usually doesn't equal B×A) unlike ordinary number multiplication, and why the dimensions have to line up correctly for multiplication to even be defined.",
    },
    {
      question: "What is the transpose of a matrix used for?",
      answer:
        "Transposing flips a matrix over its diagonal, turning rows into columns — it comes up constantly in linear algebra, from computing dot products to preparing matrices for certain operations that require a specific orientation.",
    },
    {
      question: "How accurate is the determinant and inverse calculation?",
      answer:
        "This uses Gaussian elimination with partial pivoting, a standard numerically stable algorithm, verified against known reference examples including a classic 3×3 textbook matrix. Results may show tiny floating-point rounding (like 0.6000000000001 instead of exactly 0.6), which is normal for any numerical computation.",
    },
    {
      question: "Why can't I use a 5×5 or larger matrix?",
      answer:
        "This tool caps out at 4×4 to keep the manual entry grid practical to use — larger matrices are usually handled with dedicated linear algebra software or programming libraries rather than typed in by hand one cell at a time.",
    },
  ],
};
