import type { BlogPost } from "@/lib/blog/types";

export const pdfExtractPagesPost: BlogPost = {
  toolSlug: "pdf-extract-pages",
  lang: "hinglish",
  title: "PDF Mein Se Sirf Zaroori Pages Kaise Nikale (Poori File Bhejne Ke Bajaye)",
  description:
    "Jab sirf kuch pages kaam ke hon toh poori PDF bhejna kyun galat aadat hai, aur sirf zaroori pages kaise nikale.",
  sections: [
    {
      heading: "Zyada share karne ki aadat jo aksar dhyan nahi aati",
      body: [
        "Yeh sabse aasan rasta lagta hai: kisi ko contract ka sirf sign wala page chahiye, aur aasan tarika hai poori 22 page ki file bhej dena. Yeh kaam toh kar jaata hai, lekin saath hi har clause, har bina matlab ka attachment, aur woh saari jaankari bhi de deta hai jo na maangi gayi thi na zaroori thi — financial terms, personal information, ya sirf original parties ke beech rehne wali sharton ke liye yeh sahi nahi.",
        "Jo page asal mein maanga gaya tha sirf wahi nikalna utni hi mehnat leta hai jitni poori file attach karna, bas ek aisa tool chahiye jahan page range choose karna thumbnail par click karne ya \"22\" ya \"4-7\" jaisi range type karne jitna aasan ho.",
      ],
    },
    {
      heading: "Pages choose karne ke do tarike, kab kaunsa use karein",
      body: [
        "Bikhre hue kuch pages ke liye — jaise lambe document mein page 3, 9, 15 — alag-alag thumbnail par click karna aasan lagta hai. Lekin jab pages zyadatar continuous hon, toh \"1-3,5,8-10\" jaisi range type karna fast hai, kyunki har thumbnail dhundhna nahi padta.",
        "Dono tarike mila bhi sakte hain: pehle range type karke zyadatar kaam poora karein, phir kinare par ek-do pages jodne ya hatane ke liye click karein. Chune gaye pages hamesha thumbnail grid par highlight dikhte rehte hain, isliye final result mein kya aayega yeh hamesha saaf dikhta hai.",
      ],
    },
    {
      heading: "Order wahi rehta hai, chahe click ka order alag ho",
      body: [
        "Aap chahe jaise bhi pages choose karein — ulte-seedhe order mein click karein, ya range mein order badalkar type karein — nikala gaya document hamesha original document ke order mein hi aata hai. Result mein page 5, page 8 se pehle hi rahega, chahe aapne pehle page 8 par click kiya ho. Yeh un cases mein matter karta hai jahan order ka matlab hota hai, jaise kisi form ke continuous pages ya multi-page agreement.",
        "Yeh chhoti si baat lagti hai, lekin yahi farak hai ek aise tool mein jis par aankh band karke bharosa kiya ja sake, aur ek aise tool mein jisme har baar output ka order dobara check karna pade.",
      ],
    },
    {
      heading: "Extract, Split ya Delete — sahi tool choose karna",
      body: [
        "Yeh teenon tools aapas mein judi lekin alag problems solve karte hain, aur galat tool choose karne se bas extra steps badhte hain. Extract chune hue pages rakhta hai aur baaki ko alag kar deta hai (aapko sirf aapki selection wali ek nayi file milti hai). Split har page ko apni alag file bana deta hai. Delete chune gaye pages hatakar baaki sab rakhta hai.",
        "Decide karne ka aasan tarika: agar aap un pages ke naam gina rahe hain jo chahiye, toh Extract use karein. Agar un pages ke naam gina rahe hain jo nahi chahiye, toh Delete use karein. Agar har page alag file chahiye, toh Split use karein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya sirf ek page, jaise sirf sign wala page, nikala ja sakta hai?",
      answer:
        "Haan — bas woh ek page number type karein, ya sirf usi thumbnail par click karein. Result ek-page ki PDF hogi jisme theek wahi page hoga.",
    },
    {
      question: "Kya nikale gaye pages ka text ab bhi select aur search kiya ja sakta hai?",
      answer:
        "Haan — pages PDF object ke roop mein copy hote hain, image ke roop mein nahi, isliye text poori tarah select aur search kiya ja sakta hai, aur font aur image apni asli quality mein rehte hain.",
    },
    {
      question: "Page 4 se 7 aur saath mein page 12 choose karne ka sabse fast tarika kya hai?",
      answer:
        "Range box mein \"4-7,12\" type karein — isse ek hi baar mein page 4, 5, 6, 7 aur 12 choose ho jaate hain, jo paanch alag thumbnails par click karne se fast hai.",
    },
  ],
};
