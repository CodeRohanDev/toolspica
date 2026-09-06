import type { BlogPost } from "@/lib/blog/types";

export const pdfRotatePost: BlogPost = {
  toolSlug: "pdf-rotate",
  lang: "hinglish",
  title: "PDF Ka Sideways Page Kaise Fix Kare (Sirf Viewer Mein Nahi, Hamesha Ke Liye)",
  description:
    "PDF viewer mein page ghumane se asal mein kuch fix kyun nahi hota, aur tirchhe ya ulte page ko hamesha ke liye kaise sahi kare.",
  sections: [
    {
      heading: "Jo rotation asal mein tikta nahi",
      body: [
        "Bahut se PDF viewers mein ek toolbar button se page ko screen par ghumaya ja sakta hai — aur yeh soch lena aasan hai ki problem solve ho gayi. Lekin aisa nahi hai. Woh rotation sirf aapke current viewing session ki setting hai — file save karke band karein aur dobara kholein (ya kisi aur ko bhejein), toh woh phir se tirchhi dikhegi, kyunki asli file kabhi badli hi nahi gayi.",
        "Ise hamesha ke liye fix karne ka matlab hai PDF ke apne page rotation property ko badalna, jo file ke andar hi save ek chhoti si jaankari hoti hai aur har PDF viewer ise maanta hai, na ki sirf woh jisme aapne view ghumaya tha.",
      ],
    },
    {
      heading: "Yeh turant aur bina quality khoye kyun hota hai",
      body: [
        "Is tarah page ghumane se asli content ka ek bhi pixel ya character nahi badalta — bas ek instruction update hota hai jo kehta hai \"is page ko itne degree ghumakar dikhao.\" Kuch bhi dobara nahi banta, isliye yeh kaam file ke size se beasar hokar turant ho jaata hai, aur quality mein zara bhi farak nahi padta, un tarikon ke ulat jo page ko image mein badal dete hain.",
        "Yahi wajah hai ki rotation judta jaata hai: pehle se 90° ghuma page dobara 90° ghumane par 180° par pahunch jaata hai, wapas 0° par nahi — har click pehle ke rotation mein judta jaata hai.",
      ],
    },
    {
      heading: "Scanner se bane batch mein har baar ek jaisi hi galti hoti hai",
      body: [
        "Agar koi scan kiya document tirchha nikla hai, toh bahut mumkin hai ki har page ek hi tarah se tirchha ho — scanner mein poora stack ek hi orientation mein daala gaya tha. Ek-ek page par click karne ke bajaye \"rotate all\" jaisa option dekhein jo poore document ko ek hi baar mein ghuma de; yeh zyada common situation ke liye fast rasta hai.",
        "Page-by-page click karna us mile-jule case ke liye bachaakar rakhein jahan kai sources se jude document mein sirf kuch hi pages galat orientation mein hon, poora nahi.",
      ],
    },
    {
      heading: "Rotation kya fix nahi kar sakta",
      body: [
        "Rotation sirf orientation badalta hai — agar kisi scan mein text kisi ajeeb angle par tedha hai (seedhe 90/180/270° ki jagah), toh yeh use fix nahi kar sakta, kyunki yeh sirf 90° ke fixed steps mein kaam karta hai, manmaane angle mein nahi. Aise tedhe scan ke liye image editing ka alag step chahiye, jo rotation tool ke daayre se bahar hai.",
        "Aur zyadatar page-level PDF kaamon ki tarah, password se locked file ke liye pehle password hatana zaroori hai — ghumaane ki koshish karne se pehle use PDF unlock tool se guzarein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Agar main page ghumakar save karu, toh kya jise bheju use bhi tirchha dikhega?",
      answer:
        "Nahi — agar aapne aise tool se ghumaya hai jo file ke page rotation property ko asal mein badalta hai (sirf viewer ki display nahi), toh sahi orientation file mein save ho jaati hai aur jo bhi ise kholega use sahi hi dikhegi.",
    },
    {
      question: "Kya ghumaane se file ka size badalta hai?",
      answer:
        "Nahi — rotation sirf har page ki ek chhoti metadata jaankari badalta hai, asli content nahi, isliye file ka size pehle jaisa hi rehta hai.",
    },
    {
      question: "Kya scan ki gayi image-based PDF bhi text PDF jaisi hi ghum sakti hai?",
      answer:
        "Haan — rotation page-level par kaam karta hai aur isse koi farak nahi padta ki page mein vector text hai ya scan ki gayi image, dono ek jaise hi ghumte hain.",
    },
  ],
};
