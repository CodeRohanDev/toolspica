import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-collage-maker",
  lang: "hinglish",
  title: "Bina Design App Khole Photo Collage Kaise Banaye",
  description:
    "Kuch photos ko chand clicks mein ek clean grid collage mein badle — koi layout software nahi, koi manual alignment nahi.",
  sections: [
    {
      heading: "Ek simple grid collage ke liye bhi alag tool kyun chahiye",
      body: [
        "Chhah vacation photos ko ek shareable image mein jodna, ya ek hafte ki progress photos ko saath rakhna, sunne mein tees second ka kaam lagta hai. Asal mein kisi normal design tool mein yeh karne ke liye canvas banana, har photo ko haath se rakhna aur size karna, beech ke gaps theek karna, aur yeh pakka karna padta hai ki kuch bhi khincha hua ya galat align na ho — ek simple grid ke liye bees minute ki mehnat.",
        "Ek dedicated collage tool yeh saari setting hata deta hai: apni photos add karo, columns ki number aur spacing choose karo, aur ek barabar-sajaayi hui image wapas pao — na canvas size karna, na haath se jagah tay karna, na aankh se alignment dekhna.",
      ],
    },
    {
      heading: "Photos bina khinche ya khaali jagah chhode grid cell mein kaise fit hoti hai",
      body: [
        "Aapki photos na sikudti hain na cell mein khaali jagah chhodti hain, iski wajah hai ek technique jise cover-fit cropping kehte hain: har photo ko tab tak bada ya chota kiya jaata hai jab tak woh apna tay cell pura bhar na de, aur jo edges se bahar nikalta hai woh cut ho jaata hai. Yahi tarika lagbhag har photo app aur social platform ke thumbnail grids mein use hota hai — pura bhare hue, clean cell ko asli photo ke har pixel dikhane se zyada priority di jaati hai.",
        "Ek baat jaan lena chahiye: kyunki zyada hissa sikodne ke bajaye cut kiya jaata hai, agar photo mein zaroori subject frame ke edge ke paas hai aur uska shape grid cell ke shape se zyada match nahi karta, toh woh subject thoda cut ho sakta hai. Jin photos mein edge ki cheez matter karti hai, wahan pehle subject ko center mein laakar ek baar jaldi se crop kar lena better hai.",
      ],
    },
    {
      heading: "Ek hi collage mein portrait, landscape aur square photos milana",
      body: [
        "Khud se layout banane mein jo cheez sabse zyada confuse karti hai woh hai bahut alag shape ki photos milana (ek lambi portrait photo aur ek chaudi landscape photo saath mein) — isse ya toh ek ko doosre jaisa khinchna padta hai, ya saaf taur par alag-alag size ke cells ban jaate hain jo grid ki cleanliness kharab kar dete hain. Yahan har cell ek fix, ek jaisa shape hai aur har photo apne asli proportion ke bawajood cover-fit crop hokar usme fit hoti hai, toh aap phone ki portrait photo, chaudi landscape photo aur square Instagram-style photo ko bina kisi manual setting ke ek jaise dikhne wale grid mein mila sakte hain.",
      ],
    },
    {
      heading: "Order aur odd numbers — kya expect karein",
      body: [
        "Photos usi order mein grid bharti hain jis order mein aap unhe add karte hain, left se right, top se bottom — agar arrangement waisa nahi aata jaisa aapne socha tha, toh fix yeh hai ki photos ko apne chahe order mein dobara add karein, na ki koi drag-to-reorder option dhoonde jo yahan hai hi nahi. Aur agar aapki photos ki number columns ki number mein barabar nahi bantti, toh last row mein bas kam bhare hue cells reh jaate hain, koi ajeeb uneven layout forcefully nahi banta — 3 columns mein 7 photos ka collage bas last row mein ek photo chhod deta hai, jo broken nahi balki jaan-boojh kar banaya gaya lagta hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya collage mein meri photos khinchi ya distorted dikhengi?",
      answer:
        "Nahi — har photo ko uske cell ke hisaab se cover-fit crop kiya jaata hai (pura bharne ke liye bada karke, zyada hissa cut karke), na ki cell ke proportion mein khincha jaata hai, toh bahut alag shape ki photos milane par bhi proportions natural rehte hain.",
    },
    {
      question: "Kya main tay kar sakta hoon ki kaunsi photo grid mein kahan jaaye?",
      answer:
        "Photos usi order mein grid bharti hain jis order mein aap unhe add karte hain, left se right, top se bottom. Arrangement badalne ke liye photos ko apne chahe order mein hatakar dobara add karein, kyunki grid ke andar alag se drag-to-reorder ka koi option nahi hai.",
    },
    {
      question: "Agar meri photos ki number grid mein barabar na bante toh kya hoga?",
      answer:
        "Last row mein bas poori row se kam bhare cells reh jaate hain — jaise 3-column grid mein 7 photos hone par last row mein sirf ek photo bachti hai, jagah bharne ke liye koi uneven ya khincha hua layout forcefully nahi banaya jaata.",
    },
  ],
};
