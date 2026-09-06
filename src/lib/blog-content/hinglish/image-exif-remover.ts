import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-exif-remover",
  lang: "hinglish",
  title: "Photo Mein Chhupa Woh Data Jo Post Karne Se Pehle Hatana Zaroori Hai",
  description: "Phone har photo mein chupchap GPS location aur device ki info jod deta hai. Share karne se pehle ise kaise hataye.",
  sections: [
    {
      heading: "Woh vacation wali photo aapka pura address bata sakti hai",
      body: [
        "Zyadatar phones mein location service default se on rehti hai, aur khinchi gayi har photo mein us jagah ka exact latitude-longitude EXIF naam ke metadata part mein chupa ho sakta hai. Ghar ke living room se khinchi photo post karne par, bina jaane hi aapne apna ghar ka address us file mein jod diya hoga. Kisi trip ke hotel se photo post karne par, aap bata rahe hain ki aap kahan theher rahe hain — aur yeh bhi ki aap ghar par nahi hain.",
        "Zyadatar log yeh data kabhi nahi dekhte kyunki normal photo apps ise interface mein nahi dikhate — yeh tab tak invisible rehta hai jab tak koi ise khaas taur par nikaale, aur kai automated scraping tools aur kuch social platforms chupchap yahi karte hain.",
      ],
    },
    {
      heading: "Metadata \"edit karke hatana\" nahi, dobara banana better kyun hai",
      body: [
        "Is data ko hatane ke do tarike hain: jaane-pehchaane metadata fields ko ek-ek karke delete karna, ya image ko shuru se aise dobara banana ki usme metadata ho hi nahi. Pehla tarika weak hai — koi ek anjaan tag chhoot jaaye toh woh bach jaata hai. Yeh tool doosra tarika use karta hai: yeh image ko canvas par banakar dobara export karta hai, aur canvas ke paas metadata store karne ka koi tarika hi nahi hota. Jab chun kar hatane ke liye kuch hai hi nahi, toh kuch bhi chhoot nahi sakta.",
        "Visual result aapki asli photo jaisa pixel-by-pixel ek jaisa rehta hai. Sirf uske saath judi invisible data gayab ho jaati hai.",
      ],
    },
    {
      heading: "Sirf GPS nahi — puri list logon ki soch se lambi hai",
      body: [
        "Location ke alawa, EXIF data mein mostly photo khichne wali device ka exact model, second tak ki exact timestamp, aperture aur ISO jaisi camera settings, aur kabhi-kabhi baad mein edit karne ke liye use kiye gaye software ka naam bhi shamil hota hai. Doston ke saath share ki gayi simple photo ke liye yeh zyada matter nahi karta — lekin kahin bhi publicly, professionally, ya kisi anjaan insaan ko bheji jaane wali photo ke liye, ise har baar ki aadat ki tarah hatana hi samajhdari hai.",
      ],
    },
    {
      heading: "Yeh kab asal mein matter karta hai, kab zaroori nahi",
      body: [
        "Kisi family group chat mein share ki gayi personal photo ke liye yeh zyada matter nahi karta. Yeh tabhi matter karne lagta hai jab photo kahin public jagah jaaye — marketplace listing, public social post, public profile ki photo, ya kisi anjaan insaan ko bheji gayi photo. Ek aasan aadat jisme kuch kharch nahi hota: kahin bhi post karne se pehle, jahan aap pura nahi jaante ki kaun dekhega, photo ka metadata hata dein — bilkul waise hi jaise bhejne se pehle photo ke background mein kaun hai yeh check karna.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya metadata hatane se photo alag dikhne lagti hai?",
      answer: "Nahi — sirf invisible metadata hatta hai. Har pixel waisa hi rehta hai; dikhne wali image bilkul nahi badalti.",
    },
    {
      question: "Kya koi EXIF field bach sakti hai?",
      answer: "Nahi — kyunki yeh technique alag-alag metadata tags edit karne ke bajaye image ko canvas se dobara banati hai, result wali file mein metadata rakhne ki capability hi nahi bachti jisme kuch bach sake.",
    },
    {
      question: "Kya metadata hatane ke liye photo kahin upload hoti hai?",
      answer: "Nahi — puri process aapke browser mein hi hoti hai, isliye asli file (aur usme maujood sensitive data) kabhi aapki device se bahar nahi jaata.",
    },
  ],
};
