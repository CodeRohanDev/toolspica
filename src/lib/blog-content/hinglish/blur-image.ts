import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "blur-image",
  lang: "hinglish",
  title: "Privacy Ke Liye Image Blur Kar Rahe Ho? Yeh Jaan Lo Ki Asal Mein Kya Chhupta Hai",
  description:
    "Har blur ek jaisa safe nahi hota. Image blur karne par asal mein kya hota hai, aur halka blur kab kaafi nahi hota.",
  sections: [
    {
      heading: "Log blur tool ki taraf sabse zyada kis wajah se jaate hain",
      body: [
        "Screenshots har roz share hote hain — kisi bug ki report, kharch ke claim ki receipt, ya advice ke liye post ki gayi chat — aur lagbhag har ek mein kuch na kuch aisa hota hai jo sabke saamne nahi aana chahiye: background mein gaadi ki number plate, pura naam, account number, ya koi baarik print jo padhi nahi jaani chahiye. Share karne se pehle sirf us ek hisse ko blur karna, puri image crop karne ya design tool mein edit karne se kahin fast hai, aur baaki screenshot pura waisa hi aur kaam ka bana rehta hai.",
        "Blur tool exactly isi chote, targeted kaam ke liye bana hai, saath hi kuch aur common kaamon ke liye bhi — jaise kisi busy background ko soft karna taaki subject ubhar kar dikhe, ya load ho rahe page ke liye image ka halka placeholder version banana.",
      ],
    },
    {
      heading: "Blur asal mein pixels ke saath kya karta hai",
      body: [
        "Asli blur effect har pixel ko uske aas-paas ke pixels ke saath average karta hai, jisse sharp edges aur baarik detail ek smooth, soft gradient mein fail jaate hain. Strength setting yeh tay karti hai ki yeh average kitne pixels ke daayre mein ho — chota daayra halki softness deta hai, jabki bada daayra baarik text ya detail ko lagbhag pura padhne layak nahi chhodta, jo tabhi kaam aata hai jab aap blur sirf soft karne ke liye nahi balki kuch chhupane ke liye use kar rahe hon.",
        "Yeh exported file mein permanently pixels mein badla hua asli effect hai, kisi ek app mein hi dikhne wala filter nahi — browser mein kholo, photo viewer mein dekho, ya print kar lo, blur har jagah waisa hi dikhega.",
      ],
    },
    {
      heading: "Halka blur privacy protection mein kahan fail ho sakta hai",
      body: [
        "Yeh woh part hai jo logon ko chauka deta hai: halka se moderate blur, dikhne jitna pura information mitata nahi hai. Deconvolution techniques aur modern AI-based sharpening tools halke blur ko kuch had tak wapas palat sakte hain, especially limited character set wale text ya simple geometric shapes jaise predictable content par — blur signal ko fail deta hai, lekin kaafi simple content ke liye, us signal ka kuch hissa mathematically wapas nikala ja sakta hai.",
        "Kisi bhi sach mein sensitive cheez ke liye — koi document number, aisa face jise pura anonymous rehna hai, screen par dikhta password — safe choice hai ek strong blur radius jo \"soft\" se aage badh kar \"pehchan mein na aane\" tak pahunche, ya usse bhi behtar, us hisse ko pura dhakne wala ek solid box. Solid box mein wapas nikalne ke liye koi information nahi bachti; halke blur mein kuch na kuch bach hi jaata hai, chahe nangi aankh se waisa na lage.",
      ],
    },
    {
      heading: "Use karne se pehle jaan lene layak ek limit",
      body: [
        "Ek standard blur tool puri image par ek jaisa effect lagata hai — yeh sirf kisi face ya number plate ko chun kar baaki sab kuch saaf chhodne ki facility nahi deta. Agar aapko baaki image saaf rakhte hue sirf ek hissa chhupana hai, toh woh ek alag, region-based redaction tool ka kaam hai, puri image blur karne ka nahi. Sirf ek corner chhupane ke liye puri image blur kar dena pure screenshot ko soft kar dega, jo mostly woh nahi hai jo aap asal mein chahte hain.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya koi mere chhupaye hue hisse ko wapas saaf kar sakta hai?",
      answer:
        "Halke ya moderate blur ke liye, kabhi-kabhi partially haan — deconvolution aur AI-sharpening techniques asli signal ka kuch hissa wapas nikaal sakti hain, especially text jaise predictable content par. Kisi sach mein sensitive cheez ke liye strong blur ya solid box use karein.",
    },
    {
      question: "Kya main image ke sirf ek hisse, jaise face ko blur karke baaki saaf rakh sakta hoon?",
      answer:
        "Puri-image blur tool se nahi — yeh puri image par ek jaisa effect lagata hai. Sirf ek hissa (jaise face ya number plate) blur karne ke liye ek alag tarah ka tool chahiye jo especially isi kaam ke liye bana ho.",
    },
    {
      question: "Kya blur karne se image ka file size kam ho jaata hai?",
      answer:
        "Aksar haan, especially JPEG output mein — blur ki gayi image mein baarik detail kam hoti hai, jo zyada efficiently compress hoti hai, toh result usi quality setting par asli sharp image se kaafi chota ho sakta hai.",
    },
  ],
};
