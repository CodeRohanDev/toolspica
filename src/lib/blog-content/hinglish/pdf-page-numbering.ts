import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-page-numbering",
  lang: "hinglish",
  title: "Bina Page Number Wali PDF Mein Number Kaise Jode",
  description:
    "Scan ya merge ki gayi PDF mein sahi jagah aur sahi format mein page number jodne ka tarika, plus ek trick jo kam hi log use karte hain.",
  sections: [
    {
      heading: "Kuch PDF mein page number bilkul kyun nahi hote",
      body: [
        "Word processor mein likhi cheezon mein page number aksar apne aap aa jaate hain. Dikkat un documents mein hoti hai jo is process se kabhi guzre hi nahi — scan kiye gaye pages ka dher, kisi aise tool se export hui PDF jismein numbering ka option hi nahi tha, ya kai alag-alag files ko milakar banaya gaya ek packet jahan shuru se hi kisi file mein number nahi the. Result ek aisa document hota hai jise meeting mein ya print copy mein refer karna ajeeb ho jaata hai — \"page 7 par dekho\" tab kaam nahi karta jab kahin page 7 printed hi nahi hai.",
        "Yeh poori tarah dikhawti lekin kaam ki cheez hai — ek numbering tool existing PDF par text layer jod deta hai, bina us asli source file ki zaroorat ke jisne isse banaya tha — jo zaroori hai kyunki scan kiye gaye document ke liye aksar koi source file hoti hi nahi.",
      ],
    },
    {
      heading: "Woh format trick jo almost koi use nahi karta: {n} of {total}",
      body: [
        "Zyadatar numbering tools position choose karne dete hain, lekin asli kaam ki setting format string hi hai. Sirf page number (\"7\") batata hai ki aap kahan hain; \"Page 7 of 42\" batata hai ki aap kahan hain aur kitna bacha hai — jo ek printed handout, contract, ya kisi bhi aisi cheez ke liye zyada useful hai jise koi bina scroll bar ke shuru se aakhir tak padhega.",
        "Iske liye placeholders bahut simple hain: {n} current page number ke liye aur {total} total page count ke liye, jinhe jaise chahein mila sakte hain — chota sa \"{n}/{total}\" ya pura-bhara \"Page {n} of {total}\". Yeh ek chota badlaav hai jo printed document padhne ke experience ko kaafi behtar bana deta hai.",
      ],
    },
    {
      heading: "Woh setting jo log aksar bhool jaate hain: starting number",
      body: [
        "Agar koi document kisi aur cheez ka aage ka hissa hai — jaise kisi report ka Volume 2, jiska Volume 1 page 200 par khatam hua tha — toh naye sire se page 1 se start karna technically sahi hai lekin dono volume ke beech palatne wale kisi bhi insaan ke liye confusing hai. Start number ko 201 set karne se dono volume mein numbering continuous rehti hai — yahi woh detail hai jo multi-part document ko sahi tarike se taiyar mehsoos karati hai.",
        "Yahi setting tab bhi kaam aati hai jab koi cover page ya title page bina number ke rakhna ho — baaki document ko 1 se number karein aur cover ko alag rakhein, ya apne convention ke hisab se cover ko hi page 1 maan lein.",
      ],
    },
    {
      heading: "Yeh tool kya nahi kar sakta",
      body: [
        "Ek baar mein ek hi format aur position pure document par lagu hoti hai — alag-alag section ke liye alag numbering style yeh directly nahi kar sakta. Agar waqai alag-alag section mein alag numbering chahiye, toh pehle document ko baanto, har hisse ko alag-alag number karein, aur phir unhe wapas merge karein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya page number jodne se mera koi existing content dhak jaayega?",
      answer:
        "Number page ke kinare ke paas ek margin mein rakhe jaate hain, jo ek normal document mein content se khaali hota hai — lekin agar aapki PDF mein pehle se hi text ya image us kinare ke bahut kareeb hain, toh bharosa karne se pehle ek-do page check kar lena behtar hai.",
    },
    {
      question: "Kya ek hi PDF ke alag-alag section mein alag format ho sakta hai?",
      answer:
        "Ek baar mein nahi — pure document par ek hi format aur position lagu hoti hai. Agar waqai alag-alag section mein alag numbering chahiye, toh pehle document ko baanto, har hisse ko alag number karein, phir results ko wapas merge karein.",
    },
    {
      question: "Kya number jodne ke liye PDF banane wali asli file chahiye?",
      answer:
        "Nahi — numbering directly PDF par ek nayi text layer ke roop mein kaam karti hai, jo isse scan kiye gaye documents ya aisi merged files ke liye useful banata hai jinka ab koi ek asli source nahi bacha.",
    },
  ],
};
