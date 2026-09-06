import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "svg-viewer",
  lang: "hinglish",
  title: "Kisi Bhi SVG File Ko Directly Browser Mein Kyun Nahi Kholna Chahiye",
  description: "SVG mein embedded script ho sakti hai. SVG code ko haath se edit karte time bina is risk ke turant preview dekhne ka safe tarika.",
  sections: [
    {
      heading: "SVG sirf picture format nahi, markup hai",
      body: [
        "SVG file ko kisi bhi doosri image ki tarah maan lena aasan hai, lekin yeh JPG ya PNG se fundamentally alag hai: yeh XML markup hai jise browser samajh kar render karta hai, bilkul HTML ki tarah. Iska matlab hai ki SVG file mein sirf shapes aur paths hi nahi, balki `<script>` tags aur event handlers bhi ho sakte hain, bilkul kisi webpage ki tarah. Zyadatar SVG jo aap dekhenge woh harmless normal graphics hote hain, lekin yeh format technically active content ki ijazat deta hai, jo tab matter karta hai jab aap kisi aisi jagah se file khol rahe ho jis par pura bharosa nahi hai.",
        "Yahi wajah hai ki kisi anjaan SVG file ko directly kholna, ya uska raw markup directly kisi live page mein paste kar dena, utna safe nahi jitna lagta hai — aap sirf image nahi dikha rahe, ho sakta hai code bhi chala rahe ho.",
      ],
    },
    {
      heading: "Haath se SVG edit karte time turant preview ki problem",
      body: [
        "SVG ki ek aur khaasiyat yeh hai ki yeh sach mein human-readable aur haath se edit ki ja sakne wali text hai — aap design tool khole bina directly code mein path ka coordinate ya fill color badal sakte hain. Dikkat yeh confirm karne mein hoti hai ki aapka change asal mein sahi dikh raha hai ya nahi: purana tarika hai file save karo, browser ya image viewer par switch karo, dekho, wapas switch karo, repeat karo — jo turant milne wale feedback ke liye bahut slow hai.",
        "Live preview panel ise directly solve karta hai: SVG markup paste karein ya type karein aur use turant render hote dekhein, code ke saath-saath, har keystroke par update hote hue, bina save-aur-dobara-kholne ke chakkar ke.",
      ],
    },
    {
      heading: "Sandboxed preview asal mein kya fayda deta hai",
      body: [
        "Ek sahi tarike se sandboxed preview frame hi pichli baat ko asal mein safe banata hai, sirf theoretical nahi: yeh aapke SVG markup ka visual output dikhata hai jabki kisi bhi embedded script ya event handler ko chalne se especially rokta hai. Iska matlab hai ki aap kisi anjaan source se SVG markup paste kar sakte hain — kisi ne bheji file, kisi random site se copy ki gayi cheez — aur bina apne browser session ko kisi risk mein daale dekh sakte hain ki woh kaisi dikhti hai, jo directly file kholne ya bina is security ke live page mein embed karne par sach nahi hota.",
        "Yeh farak tab aur matter karta hai jab aap zyada jagahon se SVG files lete hain — icon libraries, design exports, group chat mein share ki gayi files — kyunki aapko shayad hi kabhi pakka pata ho ki koi file kaise banayi gayi ya usse chhed-chhad hui ya nahi.",
      ],
    },
    {
      heading: "Bina design tool ke apna kaam check karna",
      body: [
        "Security se alag, live preview sirf yeh check karne ke liye bhi bahut useful hai ki aapka haath se likha ya edit kiya SVG visually sahi ban raha hai ya nahi — yeh confirm karna ki viewBox sahi set hai, koi path wahin band hota hai jahan aap chahte hain, ya koi gradient definition use karne wale shape se sahi tarike se refer ki ja rahi hai. Choti SVG mistakes (koi missing closing tag, galat type hua attribute) sirf code padhne par aksar dikhai nahi deti, lekin render hote hi turant saaf dikh jaati hain.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya bharose layak na source se SVG code preview karna sach mein safe hai?",
      answer: "Haan, jab preview ek pure tarike se sandboxed frame mein render hota hai jo embedded script aur event handler ko chalne se rokta hai — yahi isolation untrusted SVG markup ko safely preview karne layak banata hai, directly kholne ke ulat jisme embedded code chal sakta hai.",
    },
    {
      question: "Mera SVG preview mein invalid kyun dikh raha hai?",
      answer: "Markup ko sahi-sahi bana XML hona chahiye jisme ek <svg> root element ho — preview mein error dikhne par pehle kisi na-band hue tag ya missing root element ko check karna better hai.",
    },
    {
      question: "Kya yeh mere SVG ka sahi file size bata sakta hai?",
      answer: "Directly nahi, lekin element count complexity ka ek reasonable andaza deta hai — kahin zyada element count mostly bade file size se juda hota hai, chahe exact byte count na mile.",
    },
  ],
};
