import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "crop-image",
  lang: "hinglish",
  title: "Woh Cropping Mistake Jo Profile Picture Ko Off-Center Bana Deti Hai",
  description:
    "Square profile picture aur social posts ke liye photo ko sahi tarike se crop karne ka tarika, bina off-center ya khinche hue look ke.",
  sections: [
    {
      heading: "Platform ka apna auto-crop aksar sahi kyun nahi aata",
      body: [
        "Koi rectangular photo aisi jagah upload karein jahan woh square dikhayi jaati hai — profile picture, marketplace thumbnail, grid post — toh zyadatar platforms use apne aap crop kar dete hain. Problem yeh hai ki yeh automatic crop lagbhag hamesha frame ke geometric center par focus karta hai, asli subject par nahi — isi liye itni saari auto-crop ki gayi photos mein face chin se cut ho jaata hai ya ajeeb tarike se ek taraf khisak jaata hai.",
        "Upload karne se pehle khud image crop karna ise jad se theek karta hai: frame mein kya rahega yeh aap tay karte hain, na ki kisi aise algorithm ko jise yeh pata hi nahi ki aapki photo mein asal mein kya matter karta hai.",
      ],
    },
    {
      heading: "Fixed aspect ratio kisi wajah se hain — inka use karein",
      body: [
        "Freeform crop aapko rectangle ke shape par pura control deta hai, jo bilkul galat tool hai jab destination ko ek tay ratio chahiye. Profile picture ko perfect square (1:1) chahiye; video thumbnail ko mostly 16:9 chahiye; phone wallpaper ka apna alag proportion hota hai. Crop selection kheenchte time sahi fixed ratio lock karne se result bilkul fit baithta hai, upload ke baad squeeze ya letterbox nahi hota kyunki shape thoda galat tha.",
        "Jab pakka na ho ki kisi platform ko kaunsa ratio chahiye, toh \"[platform ka naam] image size\" search karne se lagbhag hamesha sahi pixel dimensions aur ratio mil jaata hai.",
      ],
    },
    {
      heading: "Chota crop karne ka matlab dhundhla crop nahi",
      body: [
        "Ek common tension yeh hai ki kisi badi photo se chota hissa crop karne par quality kharab aayegi — lekin yeh hamesha sach nahi hai. Ek achha crop tool asli source image se select kiya gaya hissa pure resolution mein export karta hai, na ki screen par dikh rahe preview ke size se. High-resolution asli photo se ek chota hissa crop karne par bhi result pura sharp aa sakta hai, bashart us crop kiye gaye hisse mein shuru se hi asli pixel detail kaafi ho.",
        "Quality asal mein tab kharab hoti hai jab pehle se hi low-resolution image se chota hissa crop kiya jaaye — wahan aap utni hi detail tak limited hain jitni us hisse mein shuru se maujood thi, koi bhi crop tool aisi detail nahi bana sakta jo kabhi capture hi nahi hui.",
      ],
    },
    {
      heading: "Ek baar crop karein, phir jahan bhi fit baithe wahan use karein",
      body: [
        "Agar ek hi photo kai alag platforms par square ya standard-ratio wali jagahon par chahiye, toh use ek baar sahi ratio mein crop kar lein aur usi crop ki gayi file ko har us jagah ke liye naya source bana lein jahan wahi ratio chahiye — har baar asli photo se dobara crop karne aur har platform par thoda alag framing aane ke risk se bachne ke liye.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri auto-crop ki gayi profile picture hamesha galat kyun dikhti hai?",
      answer:
        "Automatic crop photo ke geometric center par focus karta hai, asli subject par nahi — isi liye faces often cut ho jaate hain ya ek taraf khisak jaate hain. Upload se pehle khud crop karne se aap tay kar sakte hain ki frame mein kya rahega.",
    },
    {
      question: "Kya chota hissa crop karne se image ki quality ghatti hai?",
      answer:
        "Zaroori nahi — ek achha crop tool select kiye gaye hisse ko asli image ke pure resolution mein export karta hai, preview ke display size mein nahi. Quality sirf tabhi kharab hoti hai jab source hisse mein shuru se hi zyada detail na ho, jaise pehle se low-resolution photo se tight crop karna.",
    },
    {
      question: "Kya crop karte time hamesha fixed aspect ratio use karna chahiye?",
      answer:
        "Jab bhi destination ko koi khaas shape chahiye ho — square profile picture, 16:9 thumbnail — toh ise use karein, taaki result baad mein khincha ya letterbox hue bina bilkul fit baithe. Freeform cropping tabhi sahi hai jab koi khaas ratio requirement na ho.",
    },
  ],
};
