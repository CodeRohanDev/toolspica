import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "social-media-image-resizer",
  lang: "hinglish",
  title: "Instagram, Facebook Aur X Aapki Photo Ko Galat Kyun Crop Karte Rehte Hain",
  description:
    "Har platform ko alag pixel size chahiye — platform ko khud auto-crop karne dena aksar manchaha result kyun nahi deta.",
  sections: [
    {
      heading: "Woh auto-crop jo asal mein kisi ne choose hi nahi kiya",
      body: [
        "Kisi landscape photo ko Instagram Stories par upload karein aur dekhein ki aapke subject ka upar-neeche ka hissa gayab ho jaata hai, apne aap crop hokar ek lambe 9:16 frame mein fit kiya jaata hai jiske liye aapne photo design hi nahi ki thi. Yeh koi bug nahi hai — har platform ko har post type ke liye ek fixed pixel size chahiye, aur agar aapka upload usse match nahi karta, toh platform use fit karne ke liye crop kar deta hai, chahe aapko result pasand ho ya nahi. Frustrating baat yeh hai ki platform ke automatic crop ko yeh pata hi nahi hota ki aapki photo mein asal mein kya matter karta hai — yeh bas center karke kaat deta hai, jo tab theek kaam karta hai jab subject pehle se center mein ho, aur tab bahut bura fail hota hai jab na ho.",
      ],
    },
    {
      heading: "Woh 6 sizes jo asal mein matter karte hain",
      body: [
        "Instagram Post ko square 1080×1080 chahiye. Instagram Story ko lamba, full-screen 1080×1920 chahiye. Facebook Post ko wide 1200×630 pasand hai jo scrolling feed mein achha dikhta hai. X (pehle Twitter) 16:9 widescreen 1600×900 use karta hai. LinkedIn Post ka ratio Facebook jaisa hai lekin especially 1200×627 size ka, apni feed rendering ke liye. YouTube Thumbnail standard HD 1280×720 hai. Inme se koi bhi ek doosre se match nahi karta, yahi wajah hai ki phone se khinchi ek photo shayad hi kisi crop ke bina ek se zyada platform par saaf-suthri fit ho.",
      ],
    },
    {
      heading: "\"Cover\" fit vs stretching — woh farak jo aapki photo bachata hai",
      body: [
        "Kisi image ko tay size mein jabardasti fit karne ke do bilkul alag tarike hain: use stretch karke box mein bilkul bhar dena (jo ratio match na hone par face aur straight lines ko bigad deta hai), ya use proportion mein scale karke pure box ko bina khaali jagah ke bharna, phir baaki hissa kaat kar exact dimensions tak pahunchna — jise \"cover\" fit kehte hain. Cover fit use karne wala resizer aapki photo mein sab kuch normal dikhata hai, badle mein jis edge par match nahi karta wahan se kuch content cut ho jaata hai; stretch karne wala resizer sara content rakhta hai lekin use warped dikha deta hai. Lagbhag har real use case ke liye, cover fit hi woh hai jo aap asal mein chahte hain.",
      ],
    },
    {
      heading: "Ek photo ko kai platforms ke liye ek saath ready karna",
      body: [
        "Ek common mistake yeh hai ki pehle Instagram ke liye photo resize karna, phir usi crop ki gayi square photo ko dobara YouTube jaise widescreen platform ke liye resize karne ki koshish karna — ab aap ek crop ko phir se crop kar rahe hain, aur pehli baar jo cut gaya woh hamesha ke liye gayab ho chuka hai. Jab aapko pata ho ki ek photo kai platforms par jaani hai, toh har naye target size ke liye hamesha asli, bina-crop ki gayi source photo se shuru karein, pichle result se sequentially resize karne ke bajaye.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya preset mein resize karne se meri photo khich ya bigad jaayegi?",
      answer:
        "Nahi — ek sahi tarike se bana resizer aapki image ko bina bigade proportion mein scale karta hai, phir bacha hua hissa kaat kar target dimensions mein bilkul fit karta hai — yeh wahi tarika hai jo professional design tools use karte hain, na ki seedha stretch karke fit karna.",
    },
    {
      question: "Agar mera subject original photo mein center mein na ho toh kya hoga?",
      answer:
        "Kyunki standard resize crop default se center se hota hai, bahut alag ratio mein badalte time center se hata subject thoda cut ho sakta hai. Agar automatic center crop aapki composition ke liye kaam nahi karta, toh pehle source photo ko crop karke subject ko lagbhag center mein layein.",
    },
    {
      question: "Kya yeh exact pixel dimensions kabhi badalte hain?",
      answer:
        "Kabhi-kabhi, haan — platforms time-time par apne recommended sizes badalte rehte hain. Yeh mostly use hone wale, abhi sahi dimensions dikhate hain, lekin kisi zaroori campaign asset ke liye, platform ki current official specs se ek baar check kar lena better hai.",
    },
  ],
};
