import type { BlogPost } from "@/lib/blog/types";

export const pdfToJpgPost: BlogPost = {
  toolSlug: "pdf-to-jpg",
  lang: "hinglish",
  title: "PDF Page Ko JPG Image Mein Kaise Convert Kare (Free, Browser Mein Hi)",
  description:
    "PDF pages ko JPG image mein kab aur kaise convert kare, result mein text kyun nahi bachta, aur PNG ya JPG kaunsa behtar hai.",
  sections: [
    {
      heading: "PDF ko image banane ki zaroorat kab padti hai",
      body: [
        "PDF achha document format hai, lekin bahut si jagah ise directly accept hi nahi karti — Instagram post, WhatsApp status, kisi PowerPoint slide mein paste karna, ya kisi website ka image upload box jo sirf JPG ya PNG maangta hai. In sab situations mein aapko document nahi, balki document ki ek tasveer chahiye.",
        "PDF page ko JPG mein convert karna isi kami ko poora karta hai — page ka pura visual content (text, diagram, image) ek hi tasveer file mein sim jaata hai, jise koi bhi image-only platform bina dikkat accept kar leta hai.",
      ],
    },
    {
      heading: "Zoom karne par bhi result saaf kyun dikhta hai",
      body: [
        "PDF se image banane mein ek common complaint yeh hoti hai ki result blur, screenshot jaisa nikalta hai. Aisa tab hota hai jab page normal screen resolution par hi banaya jaaye — dekhne ke liye theek hai, lekin zoom karne ya print karne par kharab lagta hai. Zyada scale (normal screen density se lagbhag double) par banane se yeh problem nahi hoti, aur JPG original page size se bada dikhane par bhi saaf rehti hai.",
        "Yeh especially chhote text ya baarik diagram lines wali files ke liye matter karta hai — kam resolution mein woh blur ho jaate hain, jabki sahi scale mein saaf padhe ja sakte hain.",
      ],
    },
    {
      heading: "Ek baat jo pehle se bata dena zaroori hai",
      body: [
        "Ek baar page JPG ban jaaye, toh woh sirf ek tasveer hai — usme koi text nahi bachta jise select, search ya copy kiya ja sake, aur content badalne ka koi tarika nahi bachta siwaye image ko pixel-by-pixel edit karne ke. Yeh kisi bhi document ko image mein badalne par hamesha hota hai, lekin ise convert karne se pehle jaan lena zaroori hai.",
        "Agar aapko lagta hai ki baad mein document mein kuch search karna pad sakta hai, toh asli PDF bhi sambhal kar rakhein — JPG ko uski jagah na maanein, balki usse bani ek tasveer maanein.",
      ],
    },
    {
      heading: "JPG ya PNG — asal mein kya chahiye",
      body: [
        "JPG lossy compression use karta hai jo file size ko kaafi kam kar deta hai — yeh photo wale content ya online post karne wale page ke liye sahi hai jahan size matter karta hai. PNG lossless hai aur un pages ke liye behtar hai jo zyadatar flat colors, sharp lines, ya text-heavy screenshots hote hain, jahan JPG compression sharp edges ke aas-paas daag jaisa dikha sakta hai.",
        "Agar decide na kar payein, toh normal documents aur photos ke liye JPG safe default hai; PNG tab choose karein jab JPG mein text ya diagram ke edges blur dikhein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Agar meri PDF mein ek se zyada pages hon toh kya hoga?",
      answer:
        "Har page convert hota hai aur saari images ek hi ZIP file mein order se naam ke saath (page-1.jpg, page-2.jpg, waghera) mil jaati hain, taaki order hamesha saaf rahe.",
    },
    {
      question: "Kya baad mein JPG se text wapas nikala ja sakta hai?",
      answer:
        "Directly nahi — JPG mein koi andaruni text data nahi hota. Agar baad mein text chahiye, toh OCR tool image se text padh sakta hai, halaanki yeh utna reliable nahi hoga jitna kabhi image na bana text.",
    },
    {
      question: "Kya ek-page wali PDF bhi ZIP ke roop mein download hogi?",
      answer:
        "Nahi — ek-page wali PDF seedha ek JPG file mein badal jaati hai aur seedha download hoti hai. ZIP sirf tab banta hai jab multi-page document mein ek se zyada images ek saath deni ho.",
    },
  ],
};
