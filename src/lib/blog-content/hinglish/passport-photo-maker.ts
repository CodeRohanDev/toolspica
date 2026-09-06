import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "passport-photo-maker",
  lang: "hinglish",
  title: "Passport Photo Reject Ho Gayi? Pehli Baar Mein Sahi Size Aise Paye",
  description:
    "Passport aur visa photo ke liye exact dimensions, sirf size hi puri requirement kyun nahi hai, aur ek sheet se kai copies kaise print karein.",
  sections: [
    {
      heading: "Passport photo ka reject hona jitna common nahi hona chahiye, utna hai",
      body: [
        "Passport ya visa application ka sirf photo ki wajah se wapas aana ek frustrating, avoid ho sakne wali delay hai — photo aankhon ko dekhne mein theek lagti hai, lekin issuing authority ke tay standard se kuch millimeter idhar-udhar hoti hai. Photo studios yeh sahi karte hain kyunki woh roz yahi kaam karte hain; khud kisi normal photo se yeh karne ke liye exact target size pata hona aur usi hisaab se precise crop karna zaroori hai, sirf \"lagbhag sahi\" nahi.",
        "Duniya ke zyadatar hisson ke liye do dimensions kaam aate hain: America ka 2×2 inch standard, aur 35×45mm size jo UK, Schengen area, India aur kai aur countries mein use hota hai. Crop ko sahi ratio mein lock karna — sirf final size sahi hona nahi — utna hi matter karta hai, kyunki galat ratio mein crop ki gayi photo ko jabardasti fit karne par woh saaf tarike se stretched dikhegi.",
      ],
    },
    {
      heading: "Size zaroori hai, lekin kaafi nahi",
      body: [
        "Yeh baat saaf keh deni chahiye: pixel dimensions bilkul sahi karna passport photo ki requirements ka ek hissa solve karta hai, pura nahi. Zyadatar countries aisi cheezein bhi tay karte hain jo koi cropping tool enforce nahi kar sakta — plain, mostly white ya light-gray background, band mouth ke saath neutral expression, glasses mein koi reflection na ho, frame ke andar sir ki khaas position (eyes ek tay height par, sir frame ka tay hissa cover kare). Size sahi karna rejection ki ek common wajah hatata hai; yeh aapke country ki current puri photo guidelines check karne ki jagah nahi le sakta.",
      ],
    },
    {
      heading: "Crop karne se pehle kaam layak original photo lena",
      body: [
        "Crop tool sirf usi ke saath kaam kar sakta hai jo original photo mein hai — agar source photo mein aadhe face par shadow ho ya background mein clutter ho, toh kitna bhi sahi crop karne se yeh theek nahi hoga. Sirf phone camera se bhi achha kaam karne wala ek simple tarika: kisi plain wall (white ya light color ki, kyunki zyadatar countries ki requirements mein yeh sabse safe hai) se kuch feet door khade ho, flash ya strong upar ki light ke bajaye window ya kisi soft, even light ki taraf face karein, aur khud front camera se arm's length par photo lene ke bajaye kisi aur se photo khichwaye, kyunki paas se liya front camera shot face ke proportions ko bigad deta hai.",
        "Ek baar achhi lighting aur plain background wali source photo mil jaaye, toh crop wala hissa aasan ho jaata hai — face ko guide ke andar rakhein, sahi ratio mein lock karein, mushkil hissa pehle hi complete ho chuka hota hai.",
      ],
    },
    {
      heading: "Print sheet ko photo counter par sach mein useful banana",
      body: [
        "4×6 print sheet especially isliye hai kyunki yahi size lagbhag har photo counter aur self-service kiosk mein default rakha hota hai — kisi normal photo studio mein custom print size maangne par often zyada wait ya extra charge lagta hai, jabki standard 4×6 print mostly sabse fast, sabse sasta option hota hai. Print karte time \"actual size\" choose karein (\"fit to page\" nahi, jo halka sa scale badal kar exact millimeter dimensions bigad sakta hai) taaki har tiled copy sahi final size mein rahe.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya sahi size karne se meri passport application pakka accept ho jaayegi?",
      answer:
        "Nahi — yeh aapke chune gaye standard ke liye pixel dimensions sahi kar deta hai, lekin official requirements mein background, expression, lighting aur sir ki position bhi shamil hoti hai. Sirf size ke alawa hamesha apne country ki current official requirements check karein.",
    },
    {
      question: "Sirf ek photo ke bajaye 4×6 inch ki print sheet kyun chahiye?",
      answer:
        "Zyadatar photo studios aur shops standard 4×6 inch paper par print karte hain — passport photo ki kai copies ek sheet par tile karne se ek hi order mein kai physical prints mil jaate hain, har photo ke liye alag paise dene ke bajaye.",
    },
    {
      question: "Kya crop karte time meri photo kahin upload hoti hai?",
      answer:
        "Nahi — cropping aur print sheet banana dono pura aapke browser mein Canvas API se hote hain. Aapki photo kabhi server par upload nahi hoti.",
    },
  ],
};
