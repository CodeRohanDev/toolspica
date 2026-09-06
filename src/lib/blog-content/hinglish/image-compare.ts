import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-compare",
  lang: "hinglish",
  title: "Lagbhag Ek Jaisi Do Images Ke Beech Ka Farak Asal Mein Kaise Pakde",
  description:
    "Do images ko aankh se dekh kar compare karne mein halke changes aksar chhoot jaate hain — pixel-diff tool yeh pakad leta hai jo sirf dekhne se miss ho jaata hai.",
  sections: [
    {
      heading: "\"Mujhe toh ek jaisa hi lag raha hai\" kaafi nahi hai",
      body: [
        "Koi designer \"bas ek chota sa change\" wala layout bhejta hai, ya build pipeline se dobara export ki gayi image pichli wali jaisi hi honi chahiye. Do images ke beech nazar ghuma kar farak dhoondna kisi saaf change ke liye toh kaam karta hai — jaise button ka hilna, alag headline — lekin halke changes ke liye aksar fail ho jaata hai: color ka thoda shade badal jaana, ek icon badal jaana, ek pixel ki alignment gadbad jo puri line ko bigad de. Insaani aankhein exact pixel comparison mein weak hoti hain; woh overall feel samajhne mein achhi hoti hain, jo is kaam ke liye bilkul ulta hai.",
        "Pixel-diff tool guess karna pura khatam kar deta hai — yeh har ek pixel position check karta hai aur aapko exactly batata hai ki dono images kahan alag hain, na ki sirf mote taur par.",
      ],
    },
    {
      heading: "Diff red color mein dhundhle grayscale par kyun dikhta hai",
      body: [
        "Ek achhe diff result ka visual design utna hi matter karta hai jitna comparison logic khud. Badle hue pixels ko asli image ke dhundhle, grayscale version par bright red mein dikhana aapko ek saath do information deta hai: change kahan hua (red color) aur woh kis cheez ka part hai (neeche ka halka asli image). Sirf black background par red pixels dikhane wala diff aapko yeh toh batata hai ki kuch badla, lekin yeh nahi ki woh asli image mein kahan hai — map kho jaata hai.",
      ],
    },
    {
      heading: "Woh ek zaroori baat jo log bhool jaate hain: size match karna",
      body: [
        "Pixel-by-pixel comparison tabhi matter karta hai jab dono images ek hi size ki hon — tool position (0,0), phir (0,1), aur aage isi tarah, doosri file ki usi position ke saath check karta hai, aur agar ek image ka resolution doosre se alag hai toh yeh karne ka koi sahi tarika nahi bachta. Yeh sabse zyada tab problem karta hai jab koi resized export image ko asli se ya thode alag zoom level par liye gaye do screenshots ko compare kiya jaaye. Agar aapki dono images size mein match nahi karti, toh pehle ek ko doosri ke barabar resize karein — warna comparison ya toh chalega hi nahi, ya galat pixels aapas mein compare kar dega.",
      ],
    },
    {
      heading: "Sirf picture nahi, percentage bhi padhein",
      body: [
        "Jab aap ek saath kai images check kar rahe ho — jaise build pipeline verification, ya export ki gayi files ka batch — toh diff percentage often visual result se bhi zyada kaam ka hota hai. 0% ka matlab hai dono bilkul ek jaisi hain; ek percent ke hisse se upar kuch bhi dekhne layak hai, aur kuch percent se zyada lagbhag pakka asli, dikhne wala change hai. Bahut chote nonzero percentages (1% se bahut kam) often sirf re-encoding noise hote hain — thodi alag quality setting par dobara compress ki gayi JPEG har jagah chote-chote pixel farak dikhayegi, chahe visually kuch khaas na badla ho.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri dono images bilkul ek hi size ki kyun honi chahiye?",
      answer:
        "Comparison har pixel position ko directly doosri image ki usi position ke saath check karta hai. Size match na hone par, dono images ko position-by-position sahi tarike se milane ka koi tarika nahi bachta.",
    },
    {
      question: "Kya main ek hi image ke PNG aur JPEG version ko compare kar sakta hoon?",
      answer:
        "Haan — comparison source file format chahe jo bhi ho, decoded pixel data par kaam karta hai, halanki JPEG mein dobara encode karne se khud kuch chote compression farak aa sakte hain jo minor changes ki tarah dikh sakte hain chahe jaan-boojh kar kuch na badla ho.",
    },
    {
      question: "Kya compare karne ke liye meri images kahin upload hoti hain?",
      answer:
        "Nahi — pura comparison aapke browser mein canvas pixel data use karke locally hota hai. Dono mein se koi bhi image kabhi server par upload nahi hoti.",
    },
  ],
};
