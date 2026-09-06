import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "pdf-metadata-editor",
  lang: "hinglish",
  title: "PDF Ki Chhupi Hui Details Jise Koi Check Nahi Karta — Par Fix Karna Zaroori Hai",
  description:
    "Aapki PDF ka title, author aur keywords ek aisi jagah hote hain jise shayad hi koi directly dekhta hai — jab tak file share hone par yeh careless na dikhe.",
  sections: [
    {
      heading: "Metadata ki problem jo tab tak pata nahi chalti jab tak koi aur na dekh le",
      body: [
        "Kisi bhi PDF par right-click karke properties check karein, toh achhe chances hain ki title \"Untitled-2\" likha ho, ya author woh insaan ho jo do saal pehle company chhod chuka ho. Yeh kisi ne jaan-boojh kar nahi likha — yeh sirf woh hai jo export karne wale software ne default rakh diya, aur yeh chupchap file ke saath chalta rehta hai jab tak file kahin aisi jagah share na ho jahan metadata dikhta hai — document management system, search index, ya kisi client ka properties panel.",
        "Yeh choti baat hai, lekin aisi choti baat hai jo ek badhiya taiyar kiye gaye document par bhi carelessness ka signal deti hai — ek final report jiska title \"Untitled-2\" ho, woh content mein lagayi gayi mehnat ko kamzor kar deti hai.",
      ],
    },
    {
      heading: "Yeh 4 fields asal mein karte kya hain",
      body: [
        "Title, Author, Subject aur Keywords har PDF ke structure ke ek standard hisse mein save hote hain, jo page par dikhne wale content se poori tarah alag hota hai — inhe edit karne se page par ek bhi shabd, image ya layout nahi badalta. Yeh sirf identification information hote hain jise doosre systems padhte hain — koi search index Title aur Keywords par rank kar sakta hai, koi document management system Author ke hisab se sort kar sakta hai, aur kuch PDF viewers file naam ki jagah Title ko tab mein dikhate hain.",
        "Keywords ko khaaskar internal search ke liye halke SEO ki tarah use karein — \"Q3, finance, board, 2026\" jaise tags wali report chhah mahine baad kisi colleague ko usi naam ki tamaam PDF se bhari shared drive mein dhundna bahut aasan bana deti hai.",
      ],
    },
    {
      heading: "File bhejne se pehle 5 minute ka check",
      body: [
        "Koi bhi final PDF bhejne se pehle — jise archive, index ya dobara use kiya ja sakta hai, jaise resume, proposal ya report — ek baar check kar lein: kya title asal mein document ko sahi batata hai, kya author field sahi hai (ya khaali hai, agar naam nahi jodna chahte), aur kya do-teen keywords baad mein isse dhundhne mein madad karenge.",
        "Purani files ke ek pure batch ko saaf karne ke liye bhi yeh useful hai. Agar aapke paas aisi reports ka folder hai jinmein ek jaisa hi generic author naam dikhta hai, toh ise fix karne se har file ko asal content chhue bina ek sahi aur professional identity mil jaati hai.",
      ],
    },
    {
      heading: "Yeh kya fix nahi karega",
      body: [
        "Metadata editing poori tarah informational hai — isse document kaise padha jaata hai, print hota hai ya dikhta hai, yeh nahi badalta, aur page count, layout ya file size par bhi koi asar nahi padta. Agar maksad page par chhapi cheez badalna hai, toh yeh galat tool hai; agar maksad yeh hai ki file search tools, file browser aur agle insaan ko khud ko sahi tarike se pehchane, toh yeh bilkul sahi tool hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya metadata edit karne se PDF ka size badh jaayega ya khulne mein der lagegi?",
      answer:
        "Nahi — metadata fields page content ke muqable bahut chhoti hoti hain, aur inhe dobara likhne se file size ya document khulne par koi asar nahi padta.",
    },
    {
      question: "Kya main purane author ka naam poori tarah hata sakta hoon?",
      answer:
        "Haan — Author field khaali karke save karein, aur output PDF mein woh field khaali rahegi, purana naam nahi aayega.",
    },
    {
      question: "Kya isse PDF ki asli creation date badal jaati hai?",
      answer:
        "Nahi — save karne par sirf modification date apne aap update hoti hai. Agar PDF mein asli creation date field hai, toh woh waisi hi rehti hai.",
    },
  ],
};
