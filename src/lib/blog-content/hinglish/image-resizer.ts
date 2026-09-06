import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-resizer",
  lang: "hinglish",
  title: "\"Galat Image Dimensions\" Ki Wajah Se Upload Baar-Baar Reject Kyun Hota Hai",
  description:
    "Zyadatar upload rejections asal mein pixel dimensions ki wajah se hote hain, file size ki wajah se nahi — pehli baar mein sahi tarike se image resize kaise karein.",
  sections: [
    {
      heading: "\"Image bahut badi hai\" ka aksar matlab kuch aur hota hai",
      body: [
        "Bahut saari upload errors jo size ki baat karti dikhti hain, asal mein megabyte mein file size ki nahi balki pixel dimensions ki problem hoti hain — kisi job portal ko 200×200px photo chahiye, kisi marketplace listing ko 1000×1000px, kisi print template ko bilkul tay width-height. 300×300px wali jagah par 4000×3000px ki phone photo upload karne par ya toh directly reject ho jaati hai, ya apne aap aisi crop ho jaati hai jo aapne nahi chahi thi — bilkul wahi hissa cut ho jaata hai jo aap dikhana chahte the.",
        "Upload karne se pehle platform ke tay dimensions mein image ko resize karna dono problems se bachata hai — frame mein kya rahega yeh aap khud tay karte hain, automatic crop ke bharose nahi chhodte.",
      ],
    },
    {
      heading: "Aspect ratio lock jitna dikhta hai usse zyada kaam karta hai",
      body: [
        "Resizing ki sabse common mistake yeh hai ki log nayi width aur height alag-alag type kar dete hain, yeh jaane bina ki asli photo ke proportions se yeh match nahi karta — result saaf dikhne wali khinchi ya dabi hui image hoti hai, faces thode ajeeb lagne lagte hain, seedhi lines seedhi nahi rehti. Aspect ratio lock isse rokta hai — ek dimension badalte hi doosra apne aap sahi proportion mein set ho jaata hai, bina aapko khud hisaab lagaye.",
        "Lock band karna kabhi-kabhi sahi decision hota hai — kisi banner ad ya fixed-size template slot ko asal mein bilkul tay width-height chahiye hoti hai, chahe asli image ka proportion kuch bhi ho, aur us khaas situation mein khinchaav koi mistake nahi balki intent hota hai.",
      ],
    },
    {
      heading: "Image ko bada karna jaisa log sochte hain waise kaam nahi karta",
      body: [
        "Kisi image ko technically bada kiya ja sakta hai, lekin yeh samajhna zaroori hai ki asal mein kya hota hai: koi nayi detail nahi judti, sirf interpolation hota hai — software aas-paas ke pixels ke aadhar par andaza lagata hai ki beech ke pixels kaise dikhne chahiye. Halka increase (jaise 10-20% zyada) mostly theek dikhta hai. Asli size ko double ya triple karne par image dhundhli dikhne lagti hai, kyunki aap software se aisi detail banwa rahe hain jo kabhi capture hi nahi hui thi.",
        "Agar aapko baar-baar choti source image ka bahut bada version chahiye, toh yeh alag problem hai — iske liye bane khaas upscaling tools zyada advanced tarike use karte hain, na ki roz ke kaam wala simple resize.",
      ],
    },
    {
      heading: "Pehle resize, phir compress — order asal mein matter karta hai",
      body: [
        "Ek common mistake yeh hai ki log pehle file size ke liye image compress karte hain aur baad mein resize karte hain, ya dono ko aise order mein karte hain jisse quality ki kami bewajah badh jaati hai. Sahi order hai: pehle apne tay dimensions mein resize karein (mostly lossless export), phir agar file size bhi chota karna hai toh usi sahi-size result ko compress karein — is tarah aap sirf ek baar lossy compression jhelte hain, kayi baar nahi.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri resize ki gayi image khinchi hui kyun aayi?",
      answer:
        "Yeh tab hota hai jab width aur height aspect ratio lock ke bina alag-alag set ki jaati hain, aur naya proportion asli image ke shape se match nahi karta. Aspect ratio lock on rakhein taaki ek dimension badalne par doosra apne aap sahi ho jaaye.",
    },
    {
      question: "Kya main image ko asli size se bada resize kar sakta hoon?",
      answer:
        "Haan, lekin koi nayi detail nahi judti — software existing pixels ke beech interpolate karke bada size bharta hai. Halka increase theek dikhta hai; zyada increase (2x ya zyada) dhundhla dikhne lagta hai, kyunki asal mein koi detail wapas paane ke liye hai hi nahi.",
    },
    {
      question: "Pehle resize karoon ya compress?",
      answer:
        "Pehle apne tay dimensions mein resize karein, phir agar file size bhi chota karna hai toh usi sahi-size result ko baad mein compress karein. Isse bewajah kayi baar lossy compression jhelne se bacha ja sakta hai.",
    },
  ],
};
