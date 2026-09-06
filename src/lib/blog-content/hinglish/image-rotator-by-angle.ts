import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-rotator-by-angle",
  lang: "hinglish",
  title: "Tirchhe Horizon Ko Theek Karne Ke Liye Sirf 90° Rotate Button Kaafi Nahi",
  description: "Halki tirchhi photo ko exact angle correction chahiye, quarter-turn nahi — jaaniye exact angle par rotate karte time asal mein kya hota hai.",
  sections: [
    {
      heading: "Har tirchhi photo 90° ki problem nahi hoti",
      body: [
        "Bagal mein padi photo ko saaf 90° ya 180° ghumaav chahiye — koi bhi basic rotate button ise turant theek kar deta hai. Ek alag, zyada common problem hai woh photo jo lagbhag sahi hai: horizon jo level se do-teen degree tirchha hai, scanner par theek se seedha na rakha gaya document scan, ya aisi landscape photo jahan camera pura level nahi tha. Quarter-turn iske liye kuch nahi karta — aapko ek exact, mann-chaha angle chahiye, aur use set karte time result dekhne ka tarika.",
        "Yahi woh kami hai jo live-angle-slider tool pura karta hai: -180° se 180° tak drag karein, image ko real time mein ghoomte dekhein, aur jab aapki reference line (horizon, table ka corner, door frame) level ho jaaye toh ruk jaayein.",
      ],
    },
    {
      heading: "Corners ki problem jiske baare mein koi nahi sochta, jab tak woh hoti nahi",
      body: [
        "Yahan ek aisi detail hai jo simple rotation tools ko confuse kar deti hai: kisi rectangular photo ko saaf 90° ke multiple ke alawa kisi aur angle par ghumaye, toh ghoome hue content ke corners ab asli rectangle ke andar nahi aate — woh asli edges se bahar nikal aate hain. Ek simple tarika un corners ko bas kaat deta hai, chupchaap aapki image ka hissa kho deta hai. Sahi tarike se bana tool iske bajaye puri ghoomi hui image ko bina kuch kaate samaane ke liye zaroori exact bada bounding box nikalta hai, canvas ko is tarah badhata hai ki edges par kuch na chhute.",
        "Yahi wajah hai ki result hamesha PNG hota hai: naye, bade canvas mein aapki tirchhi image ki asli boundary ke bahar khaali corners hote hain, aur unhe asli transparency chahiye, koi aisa color nahi jo wahan hone ka bahana kare.",
      ],
    },
    {
      heading: "Result shuruaati image se bada kyun hota hai",
      body: [
        "Pehli baar aisa hone par, bada output size kisi mistake jaisa lag sakta hai — hai nahi. Kuch degree bhi ghumayi gayi photo ke corners sirf geometry ke hisaab se apne asli rectangle se bahar nikalte hain, aur doosra option (asli canvas size rakhna) chupchaap woh content kaat dega jise aap khona nahi chahte the. Result ke transparent corners sirf naye bounding box ke woh parts hain jo aapki asli ghoomi hui photo se bahar hain — wahan koi image content missing nahi hai, kyunki wahan kabhi kuch hona hi nahi tha.",
      ],
    },
    {
      heading: "Chota, soch-samajh kar kiya gaya rotation vs pura quarter-turn tool",
      body: [
        "Yeh jaanna zaroori hai ki kab kaunsa tool use karein: seedhi bagal wali ya ulti photo ke liye 90°/180°/270° rotate tool fast aur bina quality loss ke hai. Yeh angle-slider tool khaas taur par fine, corrective rotation ke liye hai — horizon seedha karne ke liye kuch degree, pura ghumaav nahi. Galat tool choose karne se ya toh time waste hota hai (saaf 90° ke kareeb pahunchne ke liye angle slider se jujhna) ya asli problem solve nahi hoti (quarter-turn button 3° ki tirchhapan theek nahi kar sakta).",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri rotate ki hui image asli se badi kyun hai?",
      answer: "90° ke multiple ke alawa kisi angle par ghumaane se image ke corners asli rectangle ki boundary se bahar nikal jaate hain. Tool puri ghoomi hui image ko bina kuch kaate samaane ke liye zaroori exact size tak canvas badhata hai, isliye result bada hota hai.",
    },
    {
      question: "Result ke transparent corners mein kya hai?",
      answer: "Woh naye, bade canvas ke woh parts hain jo aapki asli ghoomi hui image se bahar hain — wahan koi content nahi hai, isliye unhe kisi anchahe background color se bharne ke bajaye transparent chhoda jaata hai.",
    },
    {
      question: "Kya mann-chahe angle par ghumaane se image ki quality kam hoti hai?",
      answer: "Non-90° angle par pixels dobara banate time kuch resampling hona normal hai, jo kisi bhi rotation software mein common baat hai. Kuch degree ke chote corrective rotations ke liye, visual farak bahut kam hota hai.",
    },
  ],
};
