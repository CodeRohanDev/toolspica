import type { BlogPost } from "@/lib/blog/types";

export const pdfCompressPost: BlogPost = {
  toolSlug: "pdf-compress",
  lang: "hinglish",
  title: "PDF Ka Size Kaise Kam Kare Taaki Email Ya Upload Limit Mein Fit Ho Jaaye",
  description:
    "Badi PDF file ko email attachment ya upload limit ke liye kaise chhota kare, aur pehle kaunsi setting badalni chahiye.",
  sections: [
    {
      heading: "Asli problem size limit ki hai",
      body: [
        "Zyadatar baar \"PDF chhoti karni hai\" wali naubat tabhi aati hai jab bhejne ka time aa jaaye — Gmail mein attachment ki limit lagbhag 25MB hai, kisi job portal par resume 2MB se zyada nahi hona chahiye, kisi college admission form mein 5MB se badi file nahi chalti. Yeh pata tabhi chalta hai jab send button kaam nahi karta — aur tabhi compression setting samajhna sabse mushkil lagta hai.",
        "Achhi baat yeh hai ki zyadatar badi PDF files high-resolution scan ya bhaari photo ki wajah se badi hoti hain, text ki wajah se nahi — aur yahi woh cheez hai jise compressor aasani se kam kar sakta hai, aksar file ko paanchve hisse jitna chhota kar deta hai, bina screen par dikhne mein farak daale.",
      ],
    },
    {
      heading: "Pehle resolution, baad mein quality",
      body: [
        "Do sliders samajhne layak hain, bas idhar-udhar khinchne ke bajaye — resolution (har page kitne pixels mein banta hai) aur quality (un pixels ko kitni sakhti se JPEG compress kiya jaata hai). Zyadatar documents ke liye resolution ka asar zyada hota hai, kyunki yeh directly pixels ki ginti tay karta hai — 2x se 1x par laane se quality ghatane se pehle hi data lagbhag ek-chauthai reh jaata hai.",
        "Ek achha tarika: pehle resolution ko 1x-1.25x ke aas-paas laayein, dekhein ki result apne maksad ke liye kaafi saaf dikh raha hai ya nahi (screen par dekhne ke liye print se kam resolution chalta hai), aur uske baad hi zaroorat padne par quality ghataye. Shuruaat mein hi bahut kam quality par jaane se file chhoti hone se pehle hi dhabbedar dikhne lagti hai.",
      ],
    },
    {
      heading: "Jab compression fayda nahi, nuksaan karta hai",
      body: [
        "Agar aapki PDF zyadatar text wali hai — koi contract, essay, ya Excel export — toh woh pehle se hi chhoti hogi, kyunki vector text bahut kam jagah leta hai. Aisi file ko image-based compressor se guzarne par text ek tasveer mein badal jaata hai, jisse file ka size pehle jitna ya usse bhi bada ho sakta hai, aur saath hi text select ya search karna bhi band ho jaata hai.",
        "Agar baad mein us text ko search ya copy karna pade, toh yeh baat pehle se jaan lena zaroori hai. Aise mein PDF banane se pehle asli document mein image ka resolution kam karna behtar tarika hai, na ki taiyaar PDF ko is tarah compress karna.",
      ],
    },
    {
      heading: "Bhejne se pehle result zaroor check karein",
      body: [
        "Koi bhi zaroori file bhejne se pehle pehle aur baad ke size par nazar daalein aur compress ki gayi file ko khol kar dekh lein — kabhi-kabhi ek setting sochne mein theek lagti hai lekin baarik print ya chhote diagram wale page par zyada tez nikalti hai. Isme das second lagte hain, lekin galti se kharab file kisi aise insaan ko bhejne se bacha leta hai jiske jawab ka aap intezaar kar rahe hain.",
        "Agar password se locked PDF compress nahi ho rahi, toh yeh normal hai — pehle PDF unlock tool se password hataye, phir unlock hui file ko compress karein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya compress karne se PDF ka text padhna mushkil ho jaayega?",
      answer:
        "Normal setting par nahi — text select hone wala text na rehkar tasveer ka hissa ban jaata hai, lekin dekhne mein saaf hi rehta hai, jab tak quality aur resolution bahut zyada na ghataye. Koi zaroori file bhejne se pehle result zaroor dekh lein.",
    },
    {
      question: "File asal mein kitni chhoti ho sakti hai?",
      answer:
        "Scan ki gayi ya photo wali PDF mein size paanchve ya dasve hisse tak kam hona aam baat hai. Text wali PDF mein zyada farak nahi padta, kabhi-kabhi size thoda badh bhi sakta hai.",
    },
    {
      question: "Kya har situation ke liye ek hi setting kaam karti hai?",
      answer:
        "Nahi — screen par dekhne wala document kam resolution mein bhi theek chalta hai, lekin print ke liye banaya gaya document nahi. Beech ki setting se shuru karein, result dekhein, phir usi hisaab se badlein.",
    },
  ],
};
