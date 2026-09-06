import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-ocr",
  lang: "hinglish",
  title: "Scanned PDF Se Text Kaise Nikale (Jab Copy-Paste Kaam Na Kare)",
  description:
    "Scanned PDF par normal text extraction kyun fail ho jaata hai, aur OCR picture jaisi dikhne wali file se text kaise nikalta hai.",
  sections: [
    {
      heading: "Trap: PDF jo text jaisi dikhti hai par hai nahi",
      body: [
        "Yeh problem baar-baar hoti hai — aap koi scanned document PDF viewer mein kholte hain, text bilkul normal dikhta hai, toh aap kisi paragraph ko select karke copy karne ki koshish karte hain — aur kuch nahi hota, ya sirf ek box sa ban jaata hai. Yahi asli signal hai. Ek scanned page, ya document ki photo jo PDF ke roop mein save ki gayi ho, usmein asal mein koi text data hota hi nahi. File format ke hisaab se yeh sirf ek picture hai, bilkul kisi pahad ki photo jaisi. Normal copy-paste aur text extraction tools ke paas nikalne ke liye kuch hota hi nahi, kyunki koi text layer hai hi nahi.",
        "Isi liye scanned PDF mein Ctrl+F se search karne par bhi kuch nahi milta, chahe aap apni aankhon se page par woh word saaf dekh sakein — computer letters nahi padh raha, woh sirf pixels dikha raha hai jo insaan ko letters jaise dikhte hain.",
      ],
    },
    {
      heading: "OCR asal mein alag kya karta hai",
      body: [
        "Optical Character Recognition (OCR) is problem ko insaan ki tarah page ko \"dekh kar\" solve karta hai, na ki kisi na hone wale text data ko padh kar. Har page ko high-resolution image mein badla jaata hai, aur ek recognition engine usmein maujood shapes ko pehchanta hai, yeh andaza lagate hue ki generally letters aur words kaise dikhte hain, aur is tarah ek picture se asli, computer dwara padhe jaane wala text bana deta hai.",
        "Yeh text layer padhne se kahin zyada bhaari kaam hai, isi liye OCR mein normal PDF-to-text conversion se zyada time lagta hai — yeh pehle se maujood data nahi nikal raha, balki pixel-by-pixel andaza laga kar text bana raha hai.",
      ],
    },
    {
      heading: "OCR se accha result paane ka tarika",
      body: [
        "Yahan scan ki quality sabse zyada matter karti hai. Saaf, achhi lighting wala, high-resolution scan bahut accurately pehchana jaata hai — yeh iske liye poori tarah proven technology hai. Lekin tirchi khinchi gayi blurry photo, kam resolution wala fax scan, ya haath se likha hua text kahin zyada mistakes dega, kyunki jin shapes se engine match karne ki koshish kar raha hai, woh khud hi blurry ya unclear hain.",
        "Agar aapke paas source par control hai (jaise kisi paper ko dobara scan karna), toh seedha aur zyada DPI par scan karna, phone se tirchi photo khinchne se kahin behtar result dega.",
      ],
    },
    {
      heading: "OCR kiske liye hai, aur kiske liye nahi",
      body: [
        "OCR tabhi use karein jab aapki PDF mein koi use karne layak text layer na ho — scanned documents, photo khinche gaye pages, ya purani files jo kabhi digitally type nahi hui. Agar pakka na ho, toh pehle normal PDF to Text tool try karein; agar woh khali ya bekaar text de, toh yeh confirm ho jaata hai ki aapko OCR chahiye. Normal, digitally bani PDF (jaise exported report ya Word se bani PDF) par OCR ka use na karein — unmein pehle se hi sahi text layer hota hai aur normal extraction fast aur zyada accurate hoga.",
        "Ek baat pehle se jaan lein: yeh recognition English text ke liye kaam karta hai. Doosri languages ke documents ke liye us language ke hisaab se set kiya gaya alag recognition engine chahiye hoga.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kaise pata chale ki meri PDF ko OCR chahiye ya normal text extraction?",
      answer:
        "Apne PDF viewer mein text select karne ki koshish karein — agar aap words ko normal tarike se highlight aur copy kar pa rahe hain, toh pehle se text layer maujood hai aur normal extraction kaam karega. Agar click karke khinchne par sirf ek khali box banta hai, toh yeh image-only hai aur isse OCR chahiye.",
    },
    {
      question: "Kya OCR haath se likhi handwriting padh sakta hai?",
      answer:
        "Bahut kam, ya bilkul nahi — OCR engines printed fonts ko pehchanne ke liye train kiye jaate hain, jinke letters ek jaise hote hain. Handwriting har insaan mein (aur ek hi insaan mein bhi) itni alag hoti hai ki normal OCR use sahi tarike se nahi padh paata.",
    },
    {
      question: "Kya OCR karte time meri scanned document kahin upload hoti hai?",
      answer:
        "Nahi — recognition engine WebAssembly ke through aapke browser mein hi chalta hai. Sirf ek baar language wala recognition model download hota hai, aapke document ka content nahi.",
    },
  ],
};
