import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "png-to-pdf",
  lang: "hinglish",
  title: "Screenshots Ke Dher Ko Ek PDF Mein Kaise Badle (PNG, JPG Ya Mix)",
  description:
    "PNG screenshots ya kisi bhi image file ko ek order mein PDF mein kaise jode, aur transparency ka asal mein kya hota hai.",
  sections: [
    {
      heading: "Screenshot jama hone ki problem sabko hoti hai",
      body: [
        "Bug report, design review, step-by-step setup guide — inme aksar bahut saare alag-alag screenshots jama ho jaate hain jinhe aakhir mein ek document banana padta hai. Email mein pandrah alag PNG attachment bhejna aisa kaam hai jo saamne wale ka inbox bekaar kar deta hai aur yeh pakka karta hai ki kam se kam ek image chhut jaayegi ya galat order mein khulegi.",
        "Iska solution hai sab kuch ek PDF mein jodna, usi order mein jo asal mein baat samjhaata hai — screenshot 1, fir 2, fir 3 — na ki jis order mein file explorer ne unhe sort kiya ho. Yeh theory mein paanch minute ka kaam hai lekin sahi tool ke bina pareshaan karne wala ho jaata hai, kyunki zyadatar 'image jodne' wale tools ya toh format ko lekar strict hote hain ya unka upload tarika confusing hota hai.",
      ],
    },
    {
      heading: "Yeh asal mein sirf PNG tak limited nahi, chahe naam kuch bhi ho",
      body: [
        "'PNG to PDF' naam wale kai tools chupchaap har wo file reject kar dete hain jo .png na ho — yeh tab pareshaan karta hai jab aapke screenshot folder mein PNG aur JPG dono mile hon, ya koi export kiya diagram asal mein WEBP ho. Sahi tarike se bana tool ek hi batch mein kisi bhi common image format ko accept karta hai: PNG, JPG, WEBP, GIF, BMP — sabko bina extension ke hisaab se chhaante ek saath jod sakte hain.",
        "Yeh utna chota masla nahi jitna lagta hai, kyunki asal mein screenshot folder almost kabhi ek jaise format ke nahi hote — phone ka screenshot ek format mein save hota hai, desktop screen-capture tool doosre mein, aur download ki gayi koi reference image teesre mein.",
      ],
    },
    {
      heading: "Transparent PNG ka asal mein kya hota hai",
      body: [
        "Convert karne se pehle yeh ek baat zaroor jaan lein: PDF page kabhi transparent nahi ho sakta, yeh hamesha ek opaque (solid) rectangle hota hai. Isliye jab koi transparent PNG (jaise transparent background par kata hua logo) PDF page banta hai, toh har transparent pixel white color se bhar jaata hai. Yeh bilkul normal aur expected behavior hai jab kisi transparent graphic ko print karne layak cheez mein badla jaata hai — lekin agar aap soch rahe the ki transparency kisi tarah PDF mein bhi bani rahegi, toh aisa nahi hoga, kyunki printed page mein iske liye koi option hi nahi hai.",
        "Agar asli transparent PNG file baad mein kaam aani hai, toh uski original copy alag se rakhein — PDF version padhne, share karne ya print karne ke liye hai, design asset ke taur par dobara edit karne ke liye nahi.",
      ],
    },
    {
      heading: "Pehli baar mein hi sahi page order rakhna",
      body: [
        "Har image-se-PDF tool files ko upload order mein dikhata hai aur generate karne se pehle order badalne deta hai — final button dabane se pehle yeh zaroor check karein, kyunki yehi wo ek step hai jise baad mein bina pura kaam dobara kiye theek karna mushkil hota hai. Ek simple habit jisse order badalne ki zaroorat hi na pade: file explorer mein screenshot ke naam ke aage number laga dein (01-step, 02-step, 03-step) taaki wo apne aap sahi order mein upload hon.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya yeh tool sirf PNG files accept karta hai?",
      answer:
        "Nahi — chahe aise tools aksar PNG ke naam se jaane jaate hon, sahi tarike se bana tool ek hi batch mein kisi bhi common image format (JPG, WEBP, GIF, BMP) ko accept karta hai, isliye pehle files ko format ke hisaab se chhaantne ki zaroorat nahi.",
    },
    {
      question: "PNG ka transparency wala hissa PDF page banne par kya hota hai?",
      answer:
        "Kyunki PDF page hamesha opaque (solid) hota hai, har transparent hissa white color se bhar jaata hai. Yeh normal aur expected behavior hai — transparency khud nahi bachti, kyunki printed page mein iske liye koi barabar option nahi hai.",
    },
    {
      question: "Kya main ek hi document mein PNG aur JPG screenshot mila sakta hoon?",
      answer:
        "Haan — ek hi session mein kisi bhi format ka mix jodein, wo sab ek PDF mein jud jaayenge, har image ke liye ek page, usi order mein jo aap generate karne se pehle set karenge.",
    },
  ],
};
