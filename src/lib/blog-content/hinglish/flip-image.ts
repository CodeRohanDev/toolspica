import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "flip-image",
  lang: "hinglish",
  title: "Aapki Selfie Mein Text Ulta Kyun Dikhta Hai (Aur Ise Kaise Theek Karein)",
  description:
    "Front-camera photos aksar mirror hokar aati hain. Yeh kyun hota hai, aur image flip karne aur ghumane mein asli farak kya hai.",
  sections: [
    {
      heading: "Woh mirror effect jo kisi ne maanga hi nahi",
      body: [
        "Frame mein kahin text dikhne wali selfie lein — t-shirt ka logo, background mein koi sign, book ka cover — aur yeh tay nahi hota ki saved photo mein woh text sahi dikhega ya ulta. Yeh asal mein koi bug nahi hai: kai front cameras default se horizontally mirrored version dikhate aur kabhi-kabhi save bhi karte hain, kyunki shot frame karte time mirror image natural lagti hai (yeh asli aaine ki tarah move karti hai). Iska nuksaan yeh hai ki asli text ya asymmetric detail ulti aa jaati hai.",
        "Horizontal flip ise asli dikhne wali situation mein wapas theek kar deta hai — yeh fix fast hai, lekin tabhi jab sahi direction mein flip karein, jo guess karne ke bajaye samajhna better hai.",
      ],
    },
    {
      heading: "Flipping aur rotation dikhne mein ek jaisa lagte hain par hain nahi",
      body: [
        "Inhe mix karna aasan hai kyunki dono image ki direction badalte hain, lekin yeh bilkul alag kaam karte hain. Rotation image ko apne center point ke chaaron taraf ghumata hai, left-to-right padhne ki direction bakarar rakhte hue — text ke kisi page ko 90 degree ghumaye toh woh tirchha ho jaata hai, lekin har letter sahi shape mein hi rehta hai, bas tilted. Flipping image ko kisi axis par mirror karta hai, padhne ki direction ko pura ulta deta hai — usi text page ko flip karein toh har letter ulta ho jaata hai, jaise aaine mein padhna.",
        "Isi liye mirror hui selfie ko flip chahiye, rotation nahi — ise kitna bhi ghumaye, ulta text kabhi theek nahi hoga, kyunki rotation kabhi bhi asli padhne ki direction ko nahi palatta jo asal mein bigdi hui hai.",
      ],
    },
    {
      heading: "Dono directions mein ek saath flip karne par kya hota hai",
      body: [
        "Horizontal aur vertical dono ko ek saath flip karna bilkul waisa hi result deta hai jaise image ko 180 degree ghumana — image ka har point apni starting jagah se diagonally ulti taraf pahunch jaata hai. Agar kabhi 180-degree ghumaav chahiye ho aur sirf flip controls maujood hon, toh yeh jaanna kaam aata hai, halanki agar directly yahi chahiye toh ek alag rotate tool zyada seedha rasta hai.",
      ],
    },
    {
      heading: "Ek cheez jo flip theek nahi karega",
      body: [
        "Agar aapka source ek animated GIF hai, toh flip karne par mostly sirf ek frame badalta hai, puri animation nahi, kyunki har frame ko sahi se flip karne ke liye har ek ko alag-alag process karna padta hai, na ki file ko ek static image maankar. Agar aapko flip ki gayi animated GIF chahiye, toh aisa tool dhoondhein jo especially animated content ko frame-by-frame handle karta ho.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri front-camera photo mirror hui si kyun dikhti hai?",
      answer:
        "Kai phone aur webcam ke front cameras default se horizontally mirrored preview dikhate aur kabhi-kabhi save bhi karte hain, kyunki shot frame karte time yeh aaine jaisa natural lagta hai — lekin iska matlab hai ki photo mein koi bhi text ya asymmetric detail tab tak ulti dikhegi jab tak theek na ki jaaye.",
    },
    {
      question: "Flipping aur rotation mein asal mein kya farak hai?",
      answer:
        "Rotation image ko apne center ke chaaron taraf ghumata hai, padhne ki direction bakarar rakhte hue — ghumaya gaya text sahi hi padha jaata hai, bas tirchha. Flipping image ko kisi axis par mirror karta hai, padhne ki direction ko pura ulta deta hai, isi liye flip kiya gaya text ulta dikhta hai.",
    },
    {
      question: "Kya main animated GIF ko flip karke uski animation bachaye rakh sakta hoon?",
      answer:
        "Aam flip tool mostly sirf ek static frame process karta hai, puri animation nahi. Animated GIF ke har frame ko sahi se flip karne ke liye especially animated content ke liye bana tool chahiye.",
    },
  ],
};
