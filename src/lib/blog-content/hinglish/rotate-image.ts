import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "rotate-image",
  lang: "hinglish",
  title: "Rotation \"Theek\" Karne Ke Baad Bhi Photo Sideways Kyun Dikhti Hai",
  description:
    "Rotate ki gayi photo kabhi-kabhi wapas purani direction mein kyun dikh jaati hai, aur rotation ko hamesha ke liye file mein kaise pakka karein.",
  sections: [
    {
      heading: "Woh rotation jo sirf aapki screen par maujood hai",
      body: [
        "Yeh lagbhag sabke saath kabhi na kabhi hota hai: aap kisi app mein sideways photo ko ghumate hain, wahan sahi dikhti hai, phir use kahin aur bhejte hain aur woh phir se sideways ho jaati hai. Iski common wajah yeh hai ki kuch apps sirf display ke liye visual rotation lagate hain — jaise CSS style transform, ya ek metadata flag jo sirf us khaas app ko batata hai ki image kaise dikhani hai — bina file ke asli pixel data ko badle. Usi file ko kisi doosre program mein kholein jo woh flag nahi padhta, toh photo phir se sideways dikhegi.",
        "Asli fix ka matlab hai ki rotation export ki gayi file ke asli pixel data mein pakka ho jaaye, taaki yeh har jagah, har program mein, har device par sahi dikhe — sirf usi ek app mein nahi jisne rotation flag sahi se padha.",
      ],
    },
    {
      heading: "90-degree rotation buttons lagbhag har asli situation ko kyun cover karte hain",
      body: [
        "Sideways aur ulti photos hi asal mein woh do problems hain jinka log sabse zyada saamna karte hain — phone ko vertical pakadna jab camera horizontal expect kar raha tha, ya scan ulta feed ho jaana. Dono 90-degree ya 180-degree rotation se theek ho jaate hain, isi liye teen simple buttons (left, right, 180°) bina kisi jhanjhat wale angle input ke real-world ki zyadatar rotation zaroorat pura kar dete hain.",
        "Ek sahi tarike se bana rotation tool 90-degree ghumane par image ki width aur height ko bhi apne aap badal deta hai — 1920×1080 wali landscape photo ghumane ke baad sahi tarike se 1080×1920 ban jaati hai, na ki asli landscape frame mein dabi hui distorted image, jo kuch kamzor tools ki mistake hai.",
      ],
    },
    {
      heading: "Jab 90-degree presets sahi tool nahi hote",
      body: [
        "Kuch degree tirchhi photo — halka tedha scan, aisa horizon line jo bilkul seedha na ho — 90/180-degree wali rotation problem nahi hai, aur ise in presets se theek karne ki koshish kaam nahi karegi. Iske liye aisa tool chahiye jo koi bhi angle live preview ke saath le, taaki aap bilkul 3 degree ya jitna bhi chota correction chahiye woh set kar sakein, na ki sirf 90-degree ki jump mein.",
      ],
    },
    {
      heading: "Baar-baar rotate karne se quality utni nahi ghatti jitna socha jaata hai",
      body: [
        "Rotation khud visual detail nahi hatata jaise lossy compression karta hai — yeh pixel ka geometric rearrangement hai, quality ka trade-off nahi. Jo cheez jama ho sakti hai woh hai har baar save karne par JPEG ka dobara encode hona, kyunki JPEG har save par lossy hota hai chahe aapne koi bhi edit kiya ho. Agar aap sirf rotate kar rahe hain (koi aur edit nahi), toh kuch rotations ke baad dikhne wala farak mostly negligible hota hai, especially high export quality par.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri photo ek app mein sahi aur doosre mein sideways kyun dikhti hai?",
      answer:
        "Kuch apps rotation ko sirf display setting ya metadata flag ki tarah lagate hain, asli pixel data badle bina. Woh flag na padhne wala doosra app asli, bina-ghumayi gayi direction dikhayega. Rotation ko pixels mein pakka karne wala tool ise har jagah theek kar deta hai.",
    },
    {
      question: "Kya 90-degree rotation thodi tedhi photo ko theek kar dega?",
      answer:
        "Nahi — 90 aur 180-degree presets sirf pure quarter aur half turns handle karte hain. Thodi tirchhi photo (kuch degree) ke liye aisa tool chahiye jo live preview ke saath koi bhi angle le sake.",
    },
    {
      question: "Kya image ghumane se uski quality ghatti hai?",
      answer:
        "Rotation khud sirf geometric rearrangement hai aur detail nahi hatata. Quality mein change tabhi aata hai jab har save par JPEG jaisa lossy format dobara encode hota hai, jo ek alag, mostly minor effect hota hai sahi export quality par.",
    },
  ],
};
