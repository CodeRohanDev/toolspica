import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-compressor",
  lang: "hinglish",
  title: "Website Slow Kyun Lagti Hai (Aur Image Compression Ise Kaise Theek Karta Hai)",
  description:
    "Bina compress ki gayi photos aksar website ya upload ke slow hone ki sabse badi wajah hoti hain — bina quality khoye ise kaise theek karein.",
  sections: [
    {
      heading: "Woh file size jo tab tak nahi dikhta jab tak problem na ban jaaye",
      body: [
        "Aajkal ke phone camera se khinchi photo mostly 3MB se 8MB ke beech hoti hai. Yeh camera roll mein pade rehne ke liye theek hai, lekin jaise hi yahi photo website ki hero image, email attachment, ya size-limit wale form upload mein badalti hai, wahi rukawat ban jaati hai — paanch bina-compress photo wala page kisi visitor ke phone par ek bhi word padhne se pehle aasani se 20-30MB bhej sakta hai.",
        "Pareshan karne wali baat yeh hai ki is extra size se lagbhag kuch bhi dikhne layak fayda nahi milta. Kam size wala compressed version phone ya laptop screen par normal comparison mein bilkul ek jaisa dikhta hai — farak sirf file browser ke size column mein dikhta hai, aapki aankhon mein nahi.",
      ],
    },
    {
      heading: "Compression bina dikhne wale nuksaan ke 80-90% size kyun ghata sakta hai",
      body: [
        "Photo mein aisi bahut saari visual information hoti hai jo aapki aankh asal mein pehchan hi nahi paati — milte-julte colors ke beech halka gradient, baarik texture ki detail, aisi information jo screen ya aapki nazar ki limit se neeche hoti hai. Compression algorithms especially isi invisible information ko sabse pehle hatane ke liye bane hain, isliye quality mein asli farak dikhne se pehle size mein itni badi kami aa jaati hai.",
        "Yahi wajah hai ki 70-80% quality par compress ki gayi wahi photo 4MB se 400KB tak ja sakti hai aur screen par lagbhag ek jaisi hi dikhti rehti hai — aap woh detail nahi kho rahe jo kabhi dikhni thi, balki woh detail kho rahe hain jise koi itne dhyan se dekhne wala hi nahi tha.",
      ],
    },
    {
      heading: "WebP vs JPEG ab sirf pasand ki baat nahi rahi",
      body: [
        "Saalon tak JPEG hi web par photos ke liye ekmatra sahi option tha. WebP ne yeh badal diya hai: barabar visual quality par WebP files mostly JPEG se choti hoti hain, aur ab har modern browser ise support karta hai, jo kuch saal pehle tak sach nahi tha. Agar JPEG par tike rehne ki wajah sirf aadat hai, koi khaas compatibility zaroorat nahi, toh pehle WebP try karna better hai — same look, mostly kaafi choti file ke saath.",
        "JPEG abhi bhi tab kaam aata hai jab aapko purane software, khaas print workflow, ya aise system ke saath pura compatibility chahiye jo abhi tak WebP support nahi karte.",
      ],
    },
    {
      heading: "Ek mistake jo chupchap yeh sab bigaad deti hai",
      body: [
        "JPEG aur WebP dono lossy formats hain, matlab har baar save karne par thodi information hamesha ke liye khatam ho jaati hai. Kisi image ko compress karna, phir edit karna, phir usi result ko baar-baar compress karna real, jama hoti hui quality ki kami laata hai, jo aakhirkar dikhne lagti hai, chahe har ek step alag se theek lage.",
        "Iska simple tarika hai: hamesha apni asli, sabse achhi quality wali source file se compress karein, pehle se compress ki gayi copy se nahi. Agar baad mein alag tarike se dobara process karna pad sakta hai, toh asli file kahin safe rakhein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Mujhe asal mein kaunsi quality percentage use karni chahiye?",
      answer:
        "Photos ke liye 70-80% ek achha default hai — yeh mostly bina kisi dikhne wale farak ke size kaafi ghata deta hai. Thumbnails aur background images ke liye kam rakhein jahan quality utni matter nahi karti, aur zyada rakhein jahan baarik detail paas se dekhne par bhi bani rehni chahiye.",
    },
    {
      question: "Kya ek hi image ko baar-baar compress karne se woh aur kharab hoti jaati hai?",
      answer:
        "Haan — kyunki JPEG aur WebP lossy hain, har dobara compression kuch aur information hamesha ke liye hata deta hai. Hamesha asli file se kaam karein, pehle se compress ki gayi copy ko baar-baar compress na karein.",
    },
    {
      question: "Kya WebP hamesha JPEG se better hota hai?",
      answer:
        "Barabar visual quality par file size ke hisaab se mostly haan, aur ab browser support bhi koi practical problem nahi hai. JPEG par tabhi tikein jab aapko purane software ke saath khaas compatibility chahiye jo WebP support nahi karta.",
    },
  ],
};
