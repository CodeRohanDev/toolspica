import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-to-csv",
  lang: "hinglish",
  title: "PDF Ki Table Ko Excel Mein Bina Bigade Kaise Le Jaye",
  description:
    "PDF ki table copy-paste karne par columns kyun bigad jaate hain, aur ise saaf CSV mein kaise badle.",
  sections: [
    {
      heading: "Copy-paste wala sabse pehla (aur galat) tarika",
      body: [
        "Jab bhi PDF ki kisi table se data chahiye hota hai, sabse pehle yehi khayal aata hai — select karo, copy karo, aur Excel ya Google Sheets mein paste kar do. Lekin yeh almost kabhi sahi tarike se kaam nahi karta. Kabhi puri row ek hi cell mein lambi line ban kar aa jaati hai, kabhi columns aapas mein mix ho jaate hain, kabhi row ka order hi bigad jaata hai. Yeh aapki spreadsheet ki galti nahi hai — asal wajah yeh hai ki PDF mein \"table\" jaisi koi cheez hoti hi nahi. Isme bas yeh info hoti hai ki har text page par kahan hai, isliye PDF viewer ka copy function sirf andaza laga raha hota hai.",
        "Ek sahi PDF-to-CSV conversion yeh kaam sahi tarike se karta hai — har text ki position dekhi jaati hai, ek hi line mein aane wale text ko ek row mein jod diya jaata hai, aur jahan normal se zyada gap ho wahan alag-alag columns mein baant diya jaata hai. Yeh wahi tarika hai jo hamari aankhein table padhte time khud-ba-khud karti hain, bas yahan yeh computer se hota hai.",
      ],
    },
    {
      heading: "Kuch tables perfect aati hain, kuch nahi — aisa kyun",
      body: [
        "Yeh tarika un tables par sabse achha kaam karta hai jinme spacing ek jaisi aur clean ho — jaise Excel se export ki gayi table, billing software se bani table, ya achhi tarah formatted reports. Agar table pehle Excel mein bani thi aur uske baad PDF mein export hui hai, toh result lagbhag perfect milega.",
        "Jahan yeh problem deta hai woh hai aisi tables jinme koi cell do lines mein fail hui ho, cells aapas mein merge ho, ya column ki width haath se alag-alag set ki gayi ho. Aise cases mein ek row ko galti se do row maan liya jaata hai, ya galat jagah se split kar diya jaata hai. Isliye hamesha pehle kuch rows check kar lein, puri file par aankh band karke bharosa na karein.",
      ],
    },
    {
      heading: "Scan ki gayi PDF wala issue",
      body: [
        "Ek cheez jo yeh tool nahi kar sakta, woh hai aisi table se data nikalna jo asal mein ek photo ya scan ho, real text na ho — kisi printed page ko scan karke banai gayi PDF mein koi text layer hoti hi nahi, woh sirf table ki ek tasveer hoti hai. Aisi file convert karne par khaali ya almost khaali result milega — isme kuch galat nahi hua, bas nikalne ke liye text data hai hi nahi.",
        "Iska solution hai — pehle us scanned PDF ko OCR tool se guzarein taaki asli text layer ban jaaye, uske baad us OCR wale output ko convert karein. Yeh ek extra step hai, lekin ise skip kar dena hi sabse badi wajah hoti hai jab log sochte hain ki \"table extraction kaam hi nahi kar raha\", jabki asal problem source file ki type hoti hai.",
      ],
    },
    {
      heading: "Ek hi document mein multiple tables ho toh kya kare",
      body: [
        "Agar aapki PDF mein alag-alag pages par alag tables hain — jaise kisi quarterly report mein page 2 par summary table aur page 8 par detail table — toh puri file ko ek saath convert karne par sab kuch ek hi CSV mein mix ho jaayega, jo mostly sahi nahi hota jab dono tables ka column structure alag-alag ho.",
        "Behtar tarika yeh hai ki pehle zaroori pages alag karke apni khud ki PDF bana lein, phir har hisse ko alag-alag convert karein. Is tarah har CSV file exactly ek hi table se match karegi, aur column headers bhi sahi tarike se ek-dusre se jude rahenge.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri converted CSV mein sab kuch galat column mein kyun chala gaya?",
      answer:
        "Aisa mostly tab hota hai jab table ki spacing uneven ho, cells merge ho, ya koi cell do lines mein fail hui ho — conversion column ki boundary pehchanne ke liye gap ki width par depend karta hai, isliye irregular layout mein gadbad ho sakti hai. Clean aur ek jaisi spacing wali tables kahin zyada reliably convert hoti hain.",
    },
    {
      question: "Kya scan kiye gaye document ki table is tarah convert ho sakti hai?",
      answer:
        "Directly nahi — scanned PDF bas ek image hoti hai jisme koi text nahi hota, isliye nikalne ke liye kuch hai hi nahi. Pehle use OCR tool se guzar kar asli text layer banayein, phir us result ko convert karein.",
    },
    {
      question: "Kya sensitive financial data wali table is tarah convert karna safe hai?",
      answer:
        "Yeh tabhi safe hai jab conversion directly aapke browser mein ho, file kisi server par upload na ho — koi bhi sensitive file daalne se pehle yeh zaroor check kar lein ki tool isi tarah kaam karta hai.",
    },
  ],
};
