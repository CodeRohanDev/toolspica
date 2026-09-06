import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-dpi-converter",
  lang: "hinglish",
  title: "Screen Par Sahi Dikhne Ke Bawajood Print Shop Ne Aapki Image Kyun Reject Ki",
  description:
    "DPI ka screen par image kitni sharp dikhti hai isse koi lena-dena nahi — yeh asal mein kya control karta hai aur print ke liye ise kaise theek karein.",
  sections: [
    {
      heading: "Woh rejection jo pehli baar mein samajh nahi aata",
      body: [
        "Aap ek photo print shop ko bhejte hain, woh aapke monitor par bilkul sharp dikhti hai, aur jawab mein message aata hai ki yeh unki DPI requirement puri nahi karti — mostly quality print ke liye 300 DPI chahiye hota hai. Pehli baar aisa hone par yeh confusing lagta hai, kyunki image mein kuch bhi galat nahi dikhta. Image sahi hai; yeh pixel content nahi balki ek metadata field hai jo requirement puri nahi kar rahi.",
        "DPI (dots per inch) ek print-specific setting hai jo printer ko batati hai ki image ko kaagaz par kitna bada physically print karna hai — iska screen par image kaisi dikhti hai, usse koi lena-dena nahi, isiliye bhejne se pehle aapko kuch galat nahi laga.",
      ],
    },
    {
      heading: "DPI asal mein kya control karta hai, aur kya nahi",
      body: [
        "Print size ki calculation pixel dimensions ko DPI se divide karke hoti hai. 3000×2000 pixel ki image 300 DPI par 10×6.67 inch mein print hoti hai. Wahi pixels 72 DPI par chaar guna se zyada bade — lagbhag 41.7×27.8 inch — print honge, aur har inch mein utna hi kam sharp, kyunki wahi fixed pixels ek bahut bade physical area mein phail rahe hain.",
        "Sabse zaroori baat, DPI value badalne se image ka ek bhi pixel nahi badalta — yeh sirf metadata hai, print size batane wala ek label, jo image ki asli resolution (uske pixel dimensions) se pura alag hai. DPI ko 300 set karne se low-resolution image utni sharp nahi ho jaati jitna kisi chote box par \"bada\" likh dene se woh physically bada nahi ho jaata.",
      ],
    },
    {
      heading: "Toh print shop specifically 300 hi kyun maangti hai",
      body: [
        "300 DPI print industry ka standard level hai jis par normal dekhne ki distance se insaani aankh ko result pura sharp dikhta hai — isse kam par, print kiya gaya detail visibly dhundhla ya pixelated dikhne lagta hai, especially fine text ya complex graphics mein. Yeh physical output quality ke liye ek real, matter karne wali requirement hai, isiliye print shops ise enforce karti hain chahe yeh screen par dikhe na dikhe.",
        "Iska practical matlab: agar aapke asli pixel dimensions 300 DPI par aapke intended physical size ke liye bahut chote hain, toh DPI metadata ko 300 set karna label ki requirement toh puri karega, par asal mein kam resolution ko theek nahi karega — maths (pixels ÷ DPI = print size) metadata jo bhi kahe, waise hi apply hota rahega.",
      ],
    },
    {
      heading: "Asli fix, step by step",
      body: [
        "Agar aapki image ke asli pixel dimensions 300 DPI par aapke intended print size ke liye pehle se kaafi bade hain, toh yeh sirf ek-step metadata patch hai — koi resampling nahi, koi quality loss nahi, image mein koi visible change nahi. Agar pixel dimensions asal mein kaafi bade nahi hain, toh koi bhi DPI setting ise theek nahi karegi; iske liye higher-resolution source image chahiye hogi, ya usi source file ke liye chota print size accept karna hoga.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya image ko 300 DPI par set karne se woh print mein zyada sharp aati hai?",
      answer:
        "Sirf tabhi agar aapke pixel dimensions pehle se hi aapke intended print size ke liye kaafi the — DPI print size ka metadata hai, sharpness ya resolution setting nahi. Agar asli pixel count kam hai, toh sirf DPI badalne se yeh theek nahi hoga.",
    },
    {
      question: "Sirf screen par dekhi jaane wali cheez ke liye kaunsi DPI use karein?",
      answer:
        "72 ya 96 DPI screen display ke liye common defaults hain, halanki wahan DPI ka zyada matlab nahi kyunki screen image ke embedded DPI value se beparwah apni fixed pixel density par hi render karti hai.",
    },
    {
      question: "Kya DPI badalne se meri image ka asli file size ya dimensions badlega?",
      answer:
        "Nahi — DPI sirf ek metadata field hai. Pixel dimensions, aur isliye asli image content aur quality, pehle aur baad mein bilkul ek jaise rehte hain.",
    },
  ],
};
