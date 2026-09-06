import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-metadata-viewer",
  lang: "hinglish",
  title: "Har Phone Photo Mein Chhupa Data (Aur Use Kaise Dekhein)",
  description:
    "Aapke phone ki har JPEG chupchap camera details, timestamp aur kabhi-kabhi location store karti hai — ise asal mein kaise dekhein.",
  sections: [
    {
      heading: "Aaj khinchi photo ke andar kya-kya chhupa hai",
      body: [
        "Kisi bhi modern phone ya camera se khinchi gayi photo sirf pixels nahi hoti — file ke andar EXIF naam ka ek metadata block chhupa hota hai, jisme camera ka sahi model, second tak ki sahi date aur time, exposure settings, aur kai baar shoot ki exact GPS location darj hoti hai. Image dekhte time inme se kuch bhi nazar nahi aata; yeh file ki binary structure mein chhupa rehta hai, jab tak koi ise asal mein padhe nahi.",
        "Zyadatar log iske baare mein tab tak nahi sochte jab tak yeh matter na kare — koi journalist yeh check karna chahe ki photo asal mein kab khinchi gayi, koi realize kare ki share ki gayi vacation photo mein embedded GPS data se ghar ka address pata chal sakta hai, ya bas yeh curiosity ki phone ke camera app ne photo ke saath asal mein kya record kiya.",
      ],
    },
    {
      heading: "Yeh sirf JPEG par reliably kyun kaam karta hai",
      body: [
        "EXIF ek JPEG-specific metadata system hai — yeh TIFF format use karte hue directly file mein embed kiya gaya data block hai, jo asli image data se pehle file ki shuruaat mein hi hota hai. PNG files mein yeh system bilkul nahi hota; woh apne header mein sirf pixel dimensions jaisi basic technical jaankari rakhti hain, kyunki PNG mainly graphics aur screenshots ke liye banaya gaya tha, photography ke liye nahi, aur isme kabhi JPEG wala EXIF tarika apnaya hi nahi gaya.",
        "Yahi wajah hai ki phone cameras aur dedicated cameras lagbhag hamesha photos ko PNG ki jagah JPEG mein save karte hain — format ka choice directly isse juda hai ki sara camera metadata shuruaat mein safe rahega ya nahi.",
      ],
    },
    {
      heading: "Downloaded photo mein kuch bhi kyun na dikhe",
      body: [
        "Agar social media ya messaging app se download ki gayi photo ka metadata check karne par kuch bhi na mile, toh yeh tool ki galti nahi hai — zyadatar bade platforms upload ke dauran jaan-boojh kar EXIF data hata dete hain, especially privacy protect karne ke liye, kyunki public distribution se pehle GPS coordinates hatane se galti se yeh pata chalne se bacha jaata hai ki photo kahan khinchi gayi. Jab tak aap wahi photo dobara download karte hain, asli file mein maujood metadata pehle hi gayab ho chuka hota hai.",
        "Iska matlab hai ki metadata check karna sach mein sirf kisi device se seedhi, bina share ki gayi asli file par hi matter karta hai — zyadatar platforms se guzarne ke baad, mostly padhne ke liye kuch bachta hi nahi.",
      ],
    },
    {
      heading: "Share karne se pehle check karein, baad mein nahi",
      body: [
        "Agar aap apne device par khinchi gayi photo ko public post karne wale hain — kisi bhi platform ke apna data hatane se pehle — toh pehle uska metadata check karna bilkul bata deta hai ki agar aapne raw file directly share ki (email se, private file transfer se, ya kisi aisi jagah jo apne aap metadata nahi hatati) toh kya-kya jaankari embed hogi. Agar GPS ya timestamp data zaroorat se zyada lage, toh share karne se pehle alag se metadata hatane ka step us jaankari ko file ke saath jaane se rok deta hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri PNG mein JPEG ke muqable lagbhag koi metadata kyun nahi dikhta?",
      answer:
        "PNG woh EXIF system use nahi karti jis par JPEG depend karti hai — yeh sirf dimensions jaisi basic technical jaankari store karti hai. Yeh formats ke beech ka structural farak hai, viewer ki galti nahi.",
    },
    {
      question: "Instagram ya WhatsApp se download ki gayi photo mein metadata kyun nahi dikhta?",
      answer:
        "Zyadatar social aur messaging platforms privacy ki wajah se upload ke dauran apne aap EXIF data hata dete hain, especially GPS coordinates. Ek baar photo inme se kisi service se guzar jaaye, toh uska asli metadata mostly pehle hi ja chuka hota hai.",
    },
    {
      question: "Kya metadata check karna aur hatana ek hi baat hai?",
      answer:
        "Nahi — metadata viewer sirf jo embedded hai use padh kar dikhata hai, file ko badalta nahi. Metadata hatana ek alag step hai jo iske liye bane alag tool se kiya jaata hai.",
    },
  ],
};
