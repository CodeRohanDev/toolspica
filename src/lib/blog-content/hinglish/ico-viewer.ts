import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "ico-viewer",
  lang: "hinglish",
  title: ".ico File Ek Icon Nahi — Kai Icons Ek Saath Bundle Hain",
  description: "favicon.ico kholne par zyadatar viewers sirf ek size dikhate hain. Jaaniye asal mein andar kya packed hai, aur web development mein yeh kyun matter karta hai.",
  sections: [
    {
      heading: "Aapka icon viewer hamesha sirf ek size kyun dikhata hai",
      body: [
        ".ico file ko kisi normal image viewer mein kholein, aapko ek hi icon dikhega. Yeh is baare mein misleading hai ki file mein asal mein kya hai: .ico ek container format hai jo ek hi icon ke kai resolutions ko ek file mein bundle karta hai — mostly 16×16, 32×32, aur 48×48, kabhi-kabhi bade bhi — taaki jo bhi use dikha raha ho (browser tab, bookmark bar, desktop shortcut) woh asal mein fit hone wala size choose kar sake, ek hi image ko bada-chota karke sharpness khone ke bajaye.",
        "Zyadatar viewers sirf pehli ya sabse badi entry dikhate hain aur baaki ko chupchaap chhupa dete hain, yahi wajah hai ki ek alag .ico inspector tab kaam aata hai jab aapko asal mein jaanna ho ki andar kya packed hai — deploy karne se pehle favicon check karna, kisi client ki di gayi icon file mein kaafi size variants hone ki confirmation karna, ya yeh debug karna ki kisi khaas size par site ka tab icon blurry kyun dikhta hai.",
      ],
    },
    {
      heading: "Ek hi file format mein do icon encodings",
      body: [
        "Yahan ek detail hai jo logon ko confuse kar deti hai: .ico file ke andar har entry ek jaise tarike se store nahi hoti. Bade, zyada modern icon sizes mostly PNG-encoded hote hain — modern compression, format samajhne wale kisi bhi tool mein saaf preview hota hai. Chote, purane sizes aksar original ICO specification ke raw bitmap format mein store hote hain, jo PNG se bhi purana encoding hai aur ise visually render karne ke liye zyada khaas decoding chahiye.",
        "Yahi wajah hai ki ek achha .ico inspection tool PNG-encoded entries ke liye live preview dikhata hai lekin raw-bitmap wali entries ke liye (bina visual render ke) size aur bit-depth metadata list karta hai — yeh tool ki limitation nahi, balki yeh format asal mein andar se kitna mixed hai iska sahi reflection hai.",
      ],
    },
    {
      heading: "Sahi favicon banane ke liye yeh kyun matter karta hai",
      body: [
        "3-5 sizes bundle karne wala achhi tarah bana favicon.ico har zaroori context ko cover karta hai: bheed wale browser tab bar ke liye chota size, bookmarks ke liye medium size, desktop shortcut ya high-DPI display ke liye bada size. Sirf ek size wali .ico bhejne par, kam se kam kuch contexts mein blurry, bada ya chota kiya gaya icon milega, chahe technically file mein \"favicon hai\". Deploy karne se pehle asal mein kya bundle hai yeh check karne se user ke notice karne se pehle hi yeh pakad mein aa jaata hai.",
      ],
    },
    {
      heading: "Sirf zaroori ek size nikaalna",
      body: [
        "Kabhi-kabhi aapko pura bundle nahi chahiye — sirf ek specific resolution alag file ki tarah chahiye, jaise kisi design mockup ya kisi doosre platform ki icon requirement ke liye. Kisi bhi PNG-encoded entry ke liye, ek baar use live preview ki tarah dekh lene par, us image ko directly save karne se aapko bina pura .ico container unpack karne ke liye alag software ki zaroorat ke, wahi ek size alag se mil jaata hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri .ico file ki kuch entries preview kyun nahi dikhati?",
      answer: "Chote, purane icon sizes aksar PNG ke bajaye original ICO specification ke raw bitmap format mein store hote hain. PNG-encoded entries (bade sizes ke liye common) reliably preview hoti hain; raw-bitmap entries rendered image ke bajaye size aur bit-depth metadata dikhati hain.",
    },
    {
      question: "Ek .ico file mein asal mein kitne resolutions ho sakte hain?",
      answer: "Format mein hi koi fixed limit nahi hai — achhi tarah bana favicon.ico mostly 3-5 sizes bundle karta hai, jaise 16×16, 32×32, aur 48×48, taaki alag-alag display contexts ko appropriate size ka icon mil sake.",
    },
    {
      question: "Kya main sirf ek size ko alag file ki tarah nikaal sakta hoon?",
      answer: "PNG-encoded entries ke liye, haan — ek baar woh preview ki tarah render ho jaaye, toh us ek resolution ko standalone PNG ki tarah pane ke liye right-click karke directly save karein.",
    },
  ],
};
