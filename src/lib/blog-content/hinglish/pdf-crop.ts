import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-crop",
  lang: "hinglish",
  title: "Scanned PDF Se Bekaar White Margin Kaise Hataye",
  description:
    "Scan aur export mein itne bade khali border kyun aa jaate hain, aur asli content ko touch kiye bina PDF ke margin kaise crop karein.",
  sections: [
    {
      heading: "Yeh bade white borders asal mein aate kahan se hain",
      body: [
        "Scanned documents ke saath yeh sabse common problem hai — aap ek page scan karte hain, aur woh asli content se double bada dikhta hai, chaaron taraf khali white space ke saath. Aisa isliye hota hai kyunki scanners aur kuch export tools poore physical page ya canvas size ko capture karte hain, na ki sirf us jagah ko jahan aapka content hai — scanner ko yeh pata nahi hota ki aapka text kahan khatam hota hai, woh poora bed hi capture kar leta hai.",
        "Yahi problem design ya presentation software se export ki gayi kuch PDF mein bhi hoti hai jo asli content se bade canvas par set hoti hain, ya aise printouts mein jo jis bhi process se PDF bani usmein edges par extra margin ke saath capture ho gaye hon.",
      ],
    },
    {
      heading: "PDF crop karne ka sahi tarika (aur galat tarika)",
      body: [
        "Ise theek karne ka galat tarika hai image editor kholna, har page ko picture mein badalna, wahan crop karna, aur phir crop ki gayi images se nayi PDF banana — isse aapka content flat ho jaata hai, select kiya ja sakne wala text khatam ho jaata hai, aur do-chaar pages se zyada ke liye yeh bahut mehnat wala kaam hai. Sahi tarika PDF ki apni ek khaasiyat use karta hai jise \"crop box\" kehte hain — PDF ke rules ka ek standard hissa jo batata hai ki page ka kaunsa hissa asal mein dikhega aur print hoga, yeh asli content se poori tarah alag hota hai.",
        "Crop box set karne se kuch bhi delete ya touch nahi hota — pura asli content file mein wahin rehta hai jahan pehle tha, bas nayi visible boundary ke bahar ho jaata hai. Isi liye yeh fast, poori tarah safe hai aur kuch bhi kharab nahi karta — aap yeh badal rahe hain ki viewer kis window se dekhe, na ki window ke peeche kya hai.",
      ],
    },
    {
      heading: "Jab scan center mein na ho toh uneven crop karna",
      body: [
        "Asli scans shayad hi kabhi bilkul center mein hote hain — jo page scanner mein thoda tirchha daala gaya ho, usmein aksar ek taraf doosri taraf se kaafi zyada margin hota hai. Top, bottom, left aur right ke liye alag-alag sliders yahan kaam aate hain, kyunki sabhi chaaron taraf ek jaisa crop lagane se ya toh wide side par bahut zyada margin bach jaayega ya narrow side par asli content cut ho jaayega. Margin ko fixed measurement ke bajaye page size ke percentage ke roop mein set karein, aur sabse kam margin wali side ka preview pehle check karein — wahi side hai jahan zyada crop karne par asli content katne ka sabse zyada khatra hota hai.",
        "Ek safe habit: pehli baar mein halka crop karein, check karein ki kuch zaroori nahi kata, phir agar abhi bhi extra margin bacha ho toh doosri baar mein crop percentage badhayein.",
      ],
    },
    {
      heading: "Cropping kya nahi karti (aur yeh theek kyun hai)",
      body: [
        "Kyunki asli content ko touch nahi kiya jaata, isliye PDF ke margin crop karne se file ka size zyada kam nahi hota — pura page data wahin rehta hai, bas visible window ke bahar ho jaata hai, isliye ise size kam karne ka tarika mat samajhiye. Yeh bache hue hisse mein text select karne ki ability ya image quality ko bhi affect nahi karta, kyunki asli content na dobara render kiya gaya, na compress kiya gaya.",
        "Agar genuinely chhoti file chahiye, toh woh ek alag goal hai jiske liye ek alag compression tool hai — cropping aur compression do alag-alag problems solve karte hain, aur chhoti, saaf-suthri file ke liye dono karna faydemand rehta hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya PDF crop karna wapas undo kiya ja sakta hai?",
      answer:
        "Is tool se download karne ke baad directly nahi, lekin kyunki crop box ek non-destructive PDF property hai, na ki delete kiya gaya content, isliye asli pura page kisi advanced PDF editor se crop box reset karke technically wapas paaya ja sakta hai.",
    },
    {
      question: "Kya crop karne se meri scanned document ka file size kam hoga?",
      answer:
        "Bahut mamuli, agar bilkul bhi ho — asli page content delete ya compress nahi hota, sirf nayi visible boundary ke bahar chhup jaata hai, isliye aap kitna bhi margin trim karein, file size lagbhag waisa hi rehta hai.",
    },
    {
      question: "Kya ek hi page ke alag-alag side ke liye alag crop amount set kar sakte hain?",
      answer:
        "Haan — top, bottom, left aur right ke margins alag-alag adjust kiye ja sakte hain, jo ki us scan ke liye bilkul sahi hai jo center mein na ho aur ek taraf doosri taraf se zyada khali jagah ho.",
    },
  ],
};
