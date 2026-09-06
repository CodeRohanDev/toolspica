import type { BlogPost } from "@/lib/blog/types";

export const pdfSplitPost: BlogPost = {
  toolSlug: "pdf-split",
  lang: "hinglish",
  title: "PDF Ko Alag-Alag Pages Mein Kaise Split Kare (Free, Bina Install Kiye)",
  description:
    "Ek multi-page PDF ko alag-alag page files mein online kaise split kare, aur kab Split aur kab Extract sahi tool hai.",
  sections: [
    {
      heading: "Bulk scanning wali problem",
      body: [
        "Yeh zaroorat zyadatar scanning ke baad hi aati hai — kisi ne bees bills ek saath scanner mein daale aur ek hi 20-page ki PDF ban gayi, lekin accounting software ya filing system ko har bill alag file mein chahiye. Yeh kaam haath se karna matlab hai har baar PDF editor kholna, baaki sab pages delete karna, save karna, aur yahi bees baar dohrana — poora afternoon barbaad karne wala kaam.",
        "Split tool isse ek hi step mein badal deta hai: 20-page wali file ek baar upload karo, aur bees alag-alag ek-page wali PDF order mein wapas mil jaati hain. Jo kaam aadhe ghante ka dohrav tha, woh ab sirf ek upload ban jaata hai.",
      ],
    },
    {
      heading: "Bees alag download ki jagah ek ZIP kyun",
      body: [
        "Browsers ek saath bees alag-alag downloads shuru karne par aksar atak jaate hain — kuch pop-up ki tarah block ho jaate hain, kuch download folder mein ulte-seedhe order mein aa jaate hain. Isliye sabhi split hue pages ko ek ZIP file mein pack kar diya jaata hai — ek hi download, phir ek baar extract karne par saari files order mein mil jaati hain (page-1.pdf, page-2.pdf, waghera).",
        "Yeh order mein naam hona chhoti baat nahi hai. Agar bill number 7 mein total galat nikla, toh bina har file khole seedha usi file tak pahunch sakte hain.",
      ],
    },
    {
      heading: "Split ya Extract — sahi tool kaun sa hai",
      body: [
        "Aksar log Split choose kar lete hain jabki unhe asal mein Extract chahiye hota hai, ya iska ulta. Split tab hai jab aapko har page alag-alag file ke roop mein chahiye — poore document ko split karna hai. Extract tab hai jab aapko kuch khaas pages choose karke ek nayi file mein ikattha karna hai — jaise 40 page ki report mein se sirf page 4 se 7.",
        "Ek simple rule: agar split hui zyadatar files aapko wapas ek chhote group mein jodni padengi, toh asal mein aapko Extract chahiye tha, Split nahi.",
      ],
    },
    {
      heading: "Ek-page wali PDF aur baaki edge cases",
      body: [
        "Ek page wali PDF mein split karne ke liye kuch hai hi nahi, isliye aisi files ke liye Split button disable rehta hai — warna wahi file wapas mil jaati, jiska koi matlab nahi. Yeh chhoti si rok bekaar download se bacha leti hai.",
        "Doosri common dikkat hai password se locked PDF — kisi bhi page-level kaam ke liye pehle password hatana zaroori hai. Pehle PDF unlock tool se password hataye, phir unlock hui file ko split karein — locked file ko seedha split karne ki koshish karne par woh load hi nahi hogi.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya split karne se pehle mujhe pata hona chahiye ki PDF mein kitne pages hain?",
      answer:
        "Nahi — file upload karte hi tool apne aap thumbnail aur page count dikha deta hai, taaki split karne se pehle aap sahi file hone ki confirm kar sakein.",
    },
    {
      question: "Kya split hue pages kisi bhi PDF reader mein khul jayenge?",
      answer:
        "Haan — har split hui file ek normal, standalone PDF page hoti hai, kisi khaas format mein nahi, isliye yeh kisi bhi phone ya computer ke PDF viewer mein normally khul jaati hai.",
    },
    {
      question: "Agar baad mein mann badal jaaye toh kya split hue pages phir se jode ja sakte hain?",
      answer:
        "Haan — PDF merge tool kisi bhi set ki PDF ko, chahe woh pehle kisi ek hi document se split ki gayi ho, aapke chune hue order mein wapas ek file mein jod sakta hai.",
    },
  ],
};
