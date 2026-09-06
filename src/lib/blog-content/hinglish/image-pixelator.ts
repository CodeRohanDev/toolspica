import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-pixelator",
  lang: "hinglish",
  title: "Photo Ko Pixelate Karna: Classic Censor Look, Aur Uski Asli Limits",
  description:
    "Pixelation asal mein andar se kaise kaam karta hai, yeh sensitive information chupane ke liye hamesha reliable kyun nahi hai, aur kab blur ki jagah ise use karein.",
  sections: [
    {
      heading: "Blocky look ke peeche ka trick",
      body: [
        "Pixelation internet ke sabse purane visual effects mein se ek hai — kisi number plate, face, ya screenshot mein spoiler ko ek jaise moote, hard edges wale blocks se dhaka jaata hai. Yeh effect dekhne mein complicated lagta hai lekin asal mein ek seedhe trick se kaam karta hai: image ko bahut chota kiya jaata hai, taaki bacha har pixel original ke ek bade hisse ka average ban jaaye, phir smoothing band karke ise wapas pure size mein bada kiya jaata hai. Normally chhoti image ko bada karne se woh dhundhli ho jaati hai; smoothing band karne se har average nikala gaya pixel ek hard, dikhne wale block ki tarah render hota hai — bas yahi pura effect hai, aur yahi wajah hai ki yeh blur se bilkul alag dikhta hai.",
      ],
    },
    {
      heading: "Blocky vs smooth: sahi chupane wala effect choose karna",
      body: [
        "Pixelation aur blur dono detail chupate hain, lekin dekhne wale ko dono bilkul alag lagte hain. Pixelation ke hard edges saaf batate hain ki \"yeh jaan-boojh kar censor kiya gaya hai\" — yeh \"redacted\" ke liye duniya bhar mein pehchana jaane wala visual signal hai, isi liye news channels aur reality shows faces aur number plates ke liye ise use karte hain. Blur zyada soft, out-of-focus photo jaisa lagta hai, jo asal mein ulta asar daal sakta hai agar maksad yeh dikhana hai ki kuch jaan-boojh kar chupaya gaya hai, na ki bas focus theek nahi aaya.",
      ],
    },
    {
      heading: "Woh privacy limit jise lagbhag koi check nahi karta",
      body: [
        "Yahan woh baat hai jo logon ko chaunka deti hai: halka pixelation effect hamesha one-way nahi hota. Simple, guess ho sakne wale content ke liye — especially text, jahan possible characters limited hote hain — halka pixelation kabhi-kabhi partially wapas banaya ja sakta hai, kyunki average nikale gaye blocks asli content ka kuch hisaab apne andar rakhte hain. Yeh pixelation ki redaction technique ki tarah ek well-documented weakness hai, koi hypothetical concern nahi. Agar aap kuch sach mein sensitive chupa rahe hain — koi document number, screenshot mein dikh raha password, kuch bhi jo saamne aane par sach mein matter kare — toh halka pixel size kaafi nahi hai. Strong, heavy setting use karein, ya isse bhi better, us area ko reversible effect ke bajaye ek solid, opaque block se dhak dein.",
      ],
    },
    {
      heading: "Kaam ke hisaab se sahi pixel size choose karna",
      body: [
        "Pixel size slider hi asli control hai, aur yeh samajhna zaroori hai ki yeh asal mein kya badalta hai: chota value source pixels ke ek chote cluster ka average nikalta hai, jisse ek halka sa softening banta hai jo \"pixelated\" jaisa mushkil se dikhta hai — yeh kisi cheez ko chupane ke bajaye halke stylistic effect ke liye kaam aata hai. Bada value kahin bade blocks ka average nikalta hai, jisse woh strong, saaf censored look banta hai jo zyadatar log face ya detail chupate time asal mein chahte hain. Agar aapka result aisa lage ki kuch khaas nahi badla, toh iska matlab hai setting bahut kam hai, tool mein koi gadbad nahi.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya sensitive information chupane ke liye pixelation reliable hai?",
      answer:
        "Halki setting par nahi — guess ho sakne wale content, especially text ke liye, pixelation ko kabhi-kabhi partially reverse kiya ja sakta hai, jo is technique ki ek well-documented weakness hai. Sach mein sensitive information ke liye, strong, heavy setting ya ek solid opaque block use karein.",
    },
    {
      question: "Kya main image ke sirf ek hisse, jaise face, ko pixelate kar sakta hoon aur baaki ko saaf rakh sakta hoon?",
      answer:
        "Nahi — yeh tool puri image par ek jaisa pixelation lagata hai. Sirf ek region choose karke pixelate karne aur baaki chhodne ke liye, aapko kisi targeted, region-based effect wale tool ki zaroorat hogi.",
    },
    {
      question: "Kya image pixelate karne se file ka size chota ho jaata hai?",
      answer:
        "Aksar haan, especially JPEG output ke liye — ek jaise color wale bade blocks fine detail se kahin zyada achhe se compress hote hain, toh heavily pixelated image original se kaafi choti ho sakti hai.",
    },
  ],
};
