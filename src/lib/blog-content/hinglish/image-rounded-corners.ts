import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-rounded-corners",
  lang: "hinglish",
  title: "Image File Mein Rounded Corners, Sirf Webpage Par Nahi",
  description:
    "CSS border-radius sirf live webpage par kaam karta hai — jaaniye asli image file mein rounded corners kaise permanently add karein, jahan bhi zaroorat ho.",
  sections: [
    {
      heading: "CSS trick jo sirf ek jagah kaam karti hai",
      body: [
        "Agar aap developer hain, toh image ko rounded corners dene ke liye turant CSS `border-radius` ka khayal aata hai — aur jab image aapke control wale webpage par dikhani ho, toh yeh sahi choice hai. Problem tab aati hai jab wahi image kahin aisi jagah jaani ho jahan CSS kaam hi nahi karta: koi PDF, presentation slide, app icon submission, printed flyer, ya koi bhi platform jahan aap directly image file upload karte hain aur use kisi aur ki styling dikhaati hai, aapki nahi.",
        "In sabhi cases mein, asli image file abhi bhi ek plain rectangle hai, chahe CSS kisi ek browser mein kuch bhi kahe. Asal mein jis cheez ki zaroorat hai woh hai ek aisa tool jo image file ko hi badal de.",
      ],
    },
    {
      heading: "Ise file mein permanently add karna asal mein kaise kaam karta hai",
      body: [
        "Yeh canvas par banaye gaye rounded-rectangle path se image ko clip karke kaam karta hai, us shape ke bahar sab kuch cut karke. Kyunki rounded rectangle ke corners, definition ke hisaab se, clip karne ke baad image se covered nahi rehte, woh chaaron corners transparent ho jaate hain — yahi wajah hai ki result hamesha PNG ki tarah aata hai, woh format jo asal mein transparency support karta hai, chahe aapne JPG upload kiya ho.",
        "Yeh CSS-only rounded corners se bilkul alag tarika hai, jo sirf dikhawe mein clip karta hai, asli file ko touch hi nahi karta — farak turant pata chalta hai agar aap exported file directly kholein: CSS-rounded image kisi image viewer mein plain rectangle ki tarah khulti hai, jabki is tool ka result asli rounded, transparent-corner wala shape dikhata hai.",
      ],
    },
    {
      heading: "Sirf rounded corners ke bajaye perfect circle paana",
      body: [
        "Square image par ek khaas radius value hai — image ki width ka bilkul aadha — jo rounded corners ko pura circle bana deta hai, profile picture ya avatar ka classic look. Radius ko isse aage badhane par ek galat, distorted shape ban jaayega, toh tool apne aap radius ko usi mathematical limit par rok deta hai, matlab aap bina kabhi broken result par pahunche \"fully rounded\" tak slide kar sakte hain.",
        "Non-square image ke liye, wahi slider maximum radius par perfect circle ki jagah oval banata hai, kyunki limit dono dimensions mein se chote par based hoti hai — yeh jaanna zaroori hai agar aapko specifically perfect circle chahiye, aise mein pehle square crop se shuru karna better rehta hai.",
      ],
    },
    {
      heading: "Yeh kab socha se zyada matter karta hai",
      body: [
        "Profile pictures aur avatars toh saaf mamla hai, lekin yeh kam dikhne wali jagahon par bhi lagatar kaam aata hai: PDF catalog mein jaane wala product thumbnail, kisi store par submit hone wala app icon jise file mein pakka rounded shape chahiye, ya presentation deck mein jaane wali images jahan aap slide software mein har baar shape effect set kiye bina, har slide par ek jaise soft corners chahte hain.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri rounded image hamesha PNG ki tarah kyun aati hai, chahe maine JPG upload kiya ho?",
      answer:
        "Corners round karne se image ke asli corner wale hisse cut ho jaate hain, aur woh cut-away hisse transparent ho jaate hain. JPG transparency dikha hi nahi sakta, isliye result hamesha PNG ki tarah aata hai, jo ise sahi tarike se support karta hai.",
    },
    {
      question: "Kya main isse bilkul circular profile picture bana sakta hoon?",
      answer:
        "Haan, square image par — radius ko image ki width ke bilkul aadhe par set karne se ek perfect circle banta hai, aur tool apne aap radius ko usi limit par rok deta hai taaki aap use distorted shape tak na le ja sakein.",
    },
    {
      question: "Kya rounded corners add karne se image crop ya resize hoti hai?",
      answer:
        "Nahi — overall dimensions bilkul waise hi rehte hain. Sirf rounded shape ke bahar ke chaar corners transparent hote hain; beech mein kuch bhi crop ya resize nahi hota.",
    },
  ],
};
