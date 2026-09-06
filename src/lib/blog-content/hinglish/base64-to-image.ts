import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "base64-to-image",
  lang: "hinglish",
  title: "Aapke Paas Base64 String Hai Aur Asli Image Chahiye — Tarika Yeh Hai",
  description:
    "CSS, JSON ya kisi email ke source code mein chhupi Base64 string se asli, download ki ja sakne wali image file nikalna.",
  sections: [
    {
      heading: "Woh pal jab picture ki jagah text ki deewar dikhe",
      body: [
        "Yeh jitna lagta hai usse kahin zyada hota hai: kisi stylesheet mein khojbeen karte hue `background-image` mein `data:image/png;base64,` se shuru hone wali ek badi string mil jaati hai, ya kisi JSON API response mein image field URL ki jagah sirf encoded characters ki deewar hoti hai. Us padhi na ja sakne wali text mein kahin ek asli image hai, aur jo chahiye woh hai use wapas asli file mein badalna jise dekha, save ya dobara use kiya ja sake.",
        "Base64-to-image decoder ka pura kaam yahi hai: text paste karein, badle mein asli, preview aur download ki ja sakne wali image file paayein.",
      ],
    },
    {
      heading: "Data URI vs raw Base64 — jo accuracy tay karta hai",
      body: [
        "Yeh text mostly do roopon mein dikhti hai. Pura data URI (`data:image/png;base64,iVBORw0KG...`) string mein hi MIME type shamil karta hai, toh decoder ko pata hota hai ki image kis format ki hai aur woh output file ka naam sahi rakh sakta hai. Sirf raw Base64 — bina prefix ke sirf encoded characters — mein koi format jaankari nahi hoti, toh decoder ko kuch maan lena padta hai, mostly default PNG.",
        "Agar aapko pata hai ki string asal mein JPEG ya WebP hai aur aap ise bina data URI prefix ke paste karte hain, toh image sahi se decode aur dikh jaane ke bawajood aapko galat extension wali file mil sakti hai. Jab choose karne ka mauka ho, hamesha pura data URI shamil karein — yeh har andaza hata deta hai.",
      ],
    },
    {
      heading: "Yahan asli fayda live preview hai, sirf download nahi",
      body: [
        "Base64 strings aksar galti se adhuri reh jaati hain — aadha copy hona, kahin character limit se cut ho jaana, ya carelessness se copy-paste mein kuch characters chhoot jaana. Jo tool asli image data milte hi live preview dikhata hai, woh turant ek sanity check deta hai: agar string sach mein puri aur sahi format mein hai, toh asli image turant dikh jaayegi, isse pehle ki aap use kahin download ya use karne ka decision lein.",
        "Agar kuch bhi nahi dikhta, ya khaali result ke bajaye saaf error milta hai, toh yeh bhi kaam ki jaankari hai — yeh batata hai ki problem string mein hi hai, tool mein nahi, aur aapko wapas jaakar check karna chahiye ki asal mein kya copy kiya tha.",
      ],
    },
    {
      heading: "Encoding ke saath pura cycle",
      body: [
        "Yeh tool image-to-Base64 encoder ka ulta hai — ek asli file ko embed karne layak text mein badalta hai, doosra us text ko wapas asli file mein badalta hai. Dono milkar pura cycle complete karte hain: kisi text-only jagah mein embed karne ke liye image ko encode karein, aur jab bhi asli image ko dekhna, edit karna ya dobara use karna ho, use wapas normal file mein decode karein.",
      ],
    },
  ],
  faqs: [
    {
      question: "Meri Base64 string decode kyun nahi ho pa rahi?",
      answer:
        "Iska lagbhag hamesha matlab hai ki raaste mein kahin string adhuri reh gayi ya badal gayi — character limit se cut ho gayi, ya copy-paste mein kuch characters chhoot gaye. Dobara check karein ki puri string shuru se aakhir tak copy hui hai.",
    },
    {
      question: "Kya 'data:image/png;base64,' prefix include karna zaroori hai?",
      answer:
        "Yeh bilkul zaroori nahi, par karna better hai — iske bina, tool ko ek format (mostly PNG) maan lena padta hai, jo galat file extension de sakta hai agar aapki image asal mein JPEG jaisi kisi doosre format ki hai.",
    },
    {
      question: "Kya aisi jagah se mili Base64 string decode karna safe hai jis par pura bharosa nahi?",
      answer:
        "Decoding pura aapke browser mein usi normal image-rendering process se hoti hai jo koi bhi webpage use karta hai — kahin kuch upload nahi hota. Result mein mili file ke saath wahi caution barte jo kisi anjaan source ki file ke saath barte.",
    },
  ],
};
