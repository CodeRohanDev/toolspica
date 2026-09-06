import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-watermark",
  lang: "hinglish",
  title: "Online Share Karne Se Pehle Photo Par Watermark Kaise Lagaye",
  description:
    "Aisa text watermark lagane ka practical tarika jo sach mein reuse roke, bina neeche ki photo kharab kiye.",
  sections: [
    {
      heading: "Woh pal jab lagta hai kaash pehle watermark laga hota",
      body: [
        "Mostly yeh baad mein pata chalta hai: koi photographer dekhta hai ki uski event photos bina credit ke kahin aur share ho rahi hain, koi designer dekhta hai ki uska portfolio piece kisi aur ki website par laga hai, koi small business dekhta hai ki uski product photos kisi competitor ki listing mein hain. Yeh pura rok nahi ja sakta, lekin watermark maths badal deta hai — yeh ek aasani se churayi ja sakne wali photo ko aisi photo mein badal deta hai jo saaf batati hai ki yeh kiski hai, jo often ek normal scraper ko kisi aasan target ki taraf move karne ke liye kaafi hota hai.",
        "Jo aadat banani chahiye woh hai publish karne se pehle watermark lagana, problem dikhne ke baad nahi. Ek baar bina watermark wali original photo bahar aa jaaye, toh aage ki uploads mein mark jodne se jo pehle se phail chuka hai use koi protection nahi milta.",
      ],
    },
    {
      heading: "Yeh pixels mein bake kyun hota hai, hatane layak layer kyun nahi",
      body: [
        "Ek watermark tool jo directly image data mein draw karta hai (kisi proprietary file format mein alag, toggle ki ja sakne wali layer ke bajaye), iska matlab hai ki exported file mein watermark ko kisi aur program mein khol kar aasani se nahi hataya ja sakta — kisi ke click karne ke liye koi \"watermark layer hide karo\" option nahi hota, kyunki flat JPEG ya PNG ki tarah export hone ke baad koi alag layer bachti hi nahi.",
        "Yeh waisa nahi hai jaise watermark ko mehnat se pura hataya hi nahi ja sakta — kaafi time aur skill ke saath lagbhag kuch bhi image se hataya ja sakta hai. Asli maksad hai itni mehnat zaroori bana dena ki koi normal reuser itni mehnat karne ko tayar na ho, aur baked-in watermark yeh achhe se karta hai.",
      ],
    },
    {
      heading: "Opacity aur position sahi rakhna",
      body: [
        "Bahut halka ho toh watermark crop ho jaata hai ya ignore ho jaata hai; bahut gehra ho toh jis photo ko share karna chahte hain wahi kharab ho jaati hai. Zyadatar photos ke liye 40-70% opacity sahi range hai — itna dikhe ki matter kare, itna heavy nahi ki subject se zyada attention khinche. Corner mein rakhna (mostly bottom-right) mark ko bina main subject par baithe present rakhta hai, jabki center mein rakhna reuse ke khilaf zyada strong signal deta hai lekin visually zyada dakhal deta hai.",
        "Ek baat jo log kam sochte hain: plain white ya plain dark watermark text photo ke peeche ki cheez ke hisaab se gayab ho sakta hai — halka aasman, gehri shadow. Halke outline ya shadow wala watermark dono mein saaf dikhta rehta hai, isliye batch final karne se pehle yeh zaroor dekh lein.",
      ],
    },
    {
      heading: "Text watermark kya nahi karega",
      body: [
        "Is tarah ka tool text add karta hai, logo image nahi — agar maksad naam ya copyright line ke bajaye brand mark hai, toh aapko image-over-image overlay ke liye bana ek alag tool chahiye. Yeh bhi samajhna zaroori hai ki watermark normal reuse se bachata hai, pakki chori se nahi — koi bhi mehnati insaan watermark ko crop, clone-stamp ya paint-over kar sakta hai. Ise rokthaam aur pehchaan ka zariya maanein, security ka upaay nahi.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya koi mera watermark sirf crop karke hata sakta hai?",
      answer:
        "Agar yeh corner mein margin ke saath hai, toh technically haan — isiliye kuch photographers ise main subject par partially rakhte hain. Subtlety aur crop-resistance ke beech asli trade-off hai; koi bhi position na pura invisible hoti hai, na pura hatane se bachi hoti hai.",
    },
    {
      question: "Agar photo se attention na bhatke, aisi safe opacity kya hai?",
      answer:
        "40-50% ek reasonable low end hai jo hawi hue bina saaf dikhta rehta hai. Isse zyada tabhi rakhein jab reuse rokna watermark ke halka rehne se zyada matter karta ho.",
    },
    {
      question: "Kya watermark lagane se image ki quality kam hoti hai?",
      answer:
        "Watermark khud existing pixels par saaf tarike se banaya jaata hai — yeh baaki image ko kharab nahi karta. Koi bhi quality change sirf baad mein use kiye gaye export/compression settings se aata hai, watermarking step se nahi.",
    },
  ],
};
