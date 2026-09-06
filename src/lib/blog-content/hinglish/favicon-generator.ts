import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "favicon-generator",
  lang: "hinglish",
  title: "Kuch Devices Par Aapki Website Ka Icon Galat Kyun Dikhta Hai (Aur Ise Kaise Theek Karein)",
  description:
    "Ab sirf ek favicon.ico kaafi nahi hai — har woh icon size jo aaj ki website ko asal mein chahiye, aur har ek ki zaroorat kyun hai.",
  sections: [
    {
      heading: "Pehle ek favicon kaafi tha — ab nahi",
      body: [
        "Lambe time tak, website ke root folder mein sirf ek favicon.ico daal dena hi pura kaam tha. Phones, tablets aur progressive web apps aane ke baad yeh badal gaya — browser tab icon, iOS home screen bookmark, aur Android app shortcut teen alag-alag jagah hain, har ek ko apna khaas size ki image chahiye, aur agar website inme se koi bhi miss karti hai toh ya toh aapke logo ka dhundhla, galat size wala version dikhta hai, ya kuch generic dikhta hai, jaise aapka asli icon nahi balki page ka screenshot.",
        "Isi liye jin websites ne sirf purana favicon.ico set kiya hota hai, woh especially mobile par thodi broken lagti hain — desktop tab theek dikhta hai, lekin home screen bookmark nahi.",
      ],
    },
    {
      heading: "Har khaas size asal mein kis liye hai",
      body: [
        "16×16 aur 32×32 PNG sizes alag-alag display density par browser tabs aur bookmark bar ko cover karte hain. 180×180 apple-touch-icon especially isliye hai kyunki iOS home screen bookmarks ke liye favicon.ico use karta hi nahi — usi size ki yeh asli file ke bina, iOS chupchap aapke page ka screenshot lekar use bookmark icon bana deta hai, aapke logo ki jagah, jo saaf tarike se broken dikhta hai. 192×192 aur 512×512 sizes Android ke Chrome aur kisi bhi progressive web app install prompt ke liye hain, jinhe site.webmanifest file ke through bataya jaata hai ki kis size par kaunsa icon use karna hai.",
        "Inme se koi bhi size random nahi hai — har ek kisi real-world display situation se juda hai, isi liye guess karne ke bajaye ki aapko kaunsa chahiye hoga, pura set ek saath bana lena zyada safe hai.",
      ],
    },
    {
      heading: "Woh manifest file jise log asal mein check karna bhool jaate hain",
      body: [
        "site.webmanifest file ko bas daal kar bhool jaane wala black box samajhna aasan hai, lekin ise banane ke baad asal mein khol kar dekhna zaroori hai — isme mostly aapke app ke naam, theme color aur background color ke liye placeholder values hoti hain, aur agar koi visitor aapki website ko home screen app ya PWA ki tarah install karta hai toh yeh saaf dikhti hain. Kisi ke home screen par aapki asli website ke naam ki jagah ek generic placeholder naam dikhna ek chota lekin noticeable miss hai, jise agar yaad rahe toh do minute mein theek kiya ja sakta hai.",
      ],
    },
    {
      heading: "Yeh files asal mein kahan jaati hain",
      body: [
        "Files banana kaam ka sirf aadha hissa hai — inhe sahi tarike se refer karna bhi zaroori hai taaki yeh kaam karein. Zyadatar aapki website ke public ya root directory mein jaati hain, aapke HTML ke <head> mein har ek ke liye saaf <link> tag ke saath (favicon.ico ko often browser apne aap pehchan lete hain agar woh root mein ho, lekin baaki ko mostly saaf tag chahiye). Link tags chhod dena ek common wajah hai jisse naya banaya gaya icon set deploy ke baad bhi sahi se nahi dikhta — files maujood hoti hain, lekin page par kuch bhi unhe point nahi karta.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri website ka icon especially iPhone home screen par galat kyun dikhta hai?",
      answer:
        "iOS home screen bookmarks ke liye favicon.ico use nahi karta — sahi size ki 180×180 apple-touch-icon ke bina, iOS aapke asli logo ki jagah page ke screenshot par chala jaata hai.",
    },
    {
      question: "Kya files banane ke baad kuch edit karna zaroori hai?",
      answer:
        "Shayad haan — banayi gayi site.webmanifest mein aapke app ke naam aur theme colors ke liye placeholder values hoti hain, jinhe deploy karne se pehle mostly apni asli website ke hisaab se badalna chahiye.",
    },
    {
      question: "Kya yeh icons banane ke liye mera logo kahin upload hota hai?",
      answer:
        "Nahi — har icon size, .ico file, aur ZIP packaging pura aapke browser mein hote hain. Aapki image kabhi server par upload nahi hoti.",
    },
  ],
};
