import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-page-size-converter",
  lang: "hinglish",
  title: "A4 vs US Letter: Videsh Mein Print Karte Time PDF Galat Kyun Dikhti Hai",
  description:
    "Ek desh mein bani document doosre desh mein print hone par kharab kyun dikhti hai, aur bina content bigade PDF ko A4, Letter aur Legal mein kaise badlein.",
  sections: [
    {
      heading: "Page size ka farak jo print karne tak nazar nahi aata",
      body: [
        "North America ke bahar lagbhag har desh A4 ko standard page size maanta hai; USA, Canada aur kuch aur countries Letter (aur lambe documents ke liye Legal) use karte hain. Screen par yeh farak lagbhag nazar hi nahi aata — dono ki shape lagbhag same hai. Lekin agar A4 format mein bani document USA ke kisi printer par bhej di jaaye jismein Letter size ka paper laga ho (ya iska ulta ho), toh ya toh ajeeb sa extra margin aa jaata hai ya content edge se cut ho jaata hai, kyunki asli paper ka size document ke liye tay kiye gaye size se match nahi karta.",
        "Yeh problem international job applications, alag-alag countries ke offices ke beech bheje jaane wale contracts, aur un sabko pareshan karti hai jo kisi alag regional standard se bani document ko apne local printer par print karte hain.",
      ],
    },
    {
      heading: "Sahi size conversion asal mein kya karta hai",
      body: [
        "Ise theek karne ka sahi tarika content ko khinch kar naye page mein fit karna nahi hai — isse sab kuch bekaar dikhega, gol cheezein oval jaisi dikhne lagengi aur text thoda tedha lagega. Iske bajaye, ek sahi converter har page ke content ko proportion mein (width aur height par ek jaisa ratio laga kar) target size mein fit karta hai, phir use equal margin ke saath beech mein set karta hai. Page par maujood har cheez ka proportion — text, images, diagrams — bilkul waisa hi rehta hai, bas sab kuch ek jaisa bada ya chhota ho jaata hai.",
        "Technically, yeh PDF ke apne page-content scaling aur positioning operators ko adjust karke kaam karta hai, na ki page ko image mein badal kar — isliye vector text sharp aur select karne layak rehta hai, aur embedded images apni asli quality mein rehti hain — size change se kuch bhi kharab nahi hota.",
      ],
    },
    {
      heading: "Kabhi-kabhi extra safed jagah kyun dikhti hai",
      body: [
        "A4 aur Letter ka ratio lagbhag same hai, isliye dono ke beech badalna lagbhag bina kisi extra margin ke ho jaata hai. Legal ki kahani alag hai — yeh A4 ya Letter ke mukable apni width ki tulna mein kaafi lamba hota hai, isliye Legal mein ya Legal se badalne par ek taraf zyada safed jagah dikh sakti hai. Yeh conversion ki kami nahi hai — yeh bina kuch khinche ek ratio ko doosre alag ratio mein sahi tarike se fit karne ka honest result hai.",
        "Agar kisi specific document ke liye yeh extra margin pareshan kare, toh asli content na hila hai na badla hai — sirf page ki boundary aur centering badli hai — yeh sirf geometry ka ek cosmetic effect hai, iska matlab yeh nahi ki kuch galat ho gaya.",
      ],
    },
    {
      heading: "Yeh kab asal mein zaroori hai aur kab nahi",
      body: [
        "Yeh tab sabse zyada matter karta hai jab document kisi aisi jagah ja rahi ho jahan specific paper size ki condition ho — jaise US visa application jismein saaf taur par Letter size manga gaya ho, ya koi international submission jismein A4 chahiye, ya bas yeh pakka karna ki print shop par alag regional default hone par bhi document sahi se print ho. Agar aap document sirf screen par dekhte hain, kabhi print nahi karte, toh page size ka farak lagbhag nazar hi nahi aata aur uski chinta karne ki zaroorat nahi.",
        "Ek baat yeh theek nahi karta: agar document ko shuru se hi kisi specific page size ko dhyan mein rakh kar design kiya gaya tha (jaise header kisi ekdum fixed corner par set ho), toh proportional scaling sab kuch lagbhag sahi rakhti hai, lekin naye size ke liye haath se dobara design kiya gaya page hamesha kisi bhi automatic conversion se zyada sahi dikhega.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya page size badalne se mera text blurry ho jaayega?",
      answer:
        "Nahi — yeh conversion PDF ke asli vector content aur positioning ko scale karta hai, page ko image mein nahi badalta, isliye text naye size mein bhi utna hi sharp, select karne layak aur search karne layak rehta hai jitna pehle tha.",
    },
    {
      question: "Kya main scanned PDF ka page size badal sakta hoon, ya yeh sirf text wali documents ke liye hai?",
      answer:
        "Haan — scaling operation page par maujood kisi bhi cheez par apply hota hai, chahe woh vector text ho ya scanned image, kyunki yeh page transform level par kaam karta hai, na ki kisi specific type ke content par.",
    },
    {
      question: "Agar pata na ho ki saamne wale ko kaunsa size chahiye, toh kaunsa use karein?",
      answer:
        "North America ke bahar A4 international default hai; US Letter America aur Canada mein standard hai. Agar pakka na ho, toh saamne wale ke desh mein generally use hone wala size choose karein, ya kisi bhi legal ya immigration jaisi zaroori document ke liye seedha unse puch lein.",
    },
  ],
};
