import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "image-sharpener",
  lang: "hinglish",
  title: "Kya Dhundhli Photo Sach Mein Theek Ho Sakti Hai? Sharpening Asal Mein Kya Karti Hai",
  description:
    "Sharpening thodi soft photo ko bacha sakti hai, lekin sach mein out-of-focus photo ko nahi — farak aur sahi use jaaniye.",
  sections: [
    {
      heading: "Pehle clear karne layak ek badi galatfehmi",
      body: [
        "Sharpening tools se aksar woh umeed ki jaati hai jo mathematically possible hi nahi — kisi sach mein out-of-focus photo se detail wapas laana. Agar camera ne shuru mein hi koi tez edge capture nahi kiya, toh koi bhi processing use bana nahi sakti — woh detail pixel data mein hai hi nahi. Sharpening asal mein kuch aur karti hai, aur phir bhi genuinely useful hai: yeh existing edges par contrast badhati hai, taaki light aur dark hisson ke beech ka transition zyada saaf aur defined lage.",
        "Yeh farak samajhna zaroori hai kyunki isse sahi expectation banti hai. Halki si soft photo — thoda camera hilne se, thodi resizing se, ya JPEG compression se — sharpening se achhi tarah improve hoti hai. Jo photo sach mein blurry hai kyunki subject focus mein hi nahi tha, woh slider kitna bhi badhaye par utna improve nahi hogi.",
      ],
    },
    {
      heading: "Yeh effect asal mein kaise calculate hota hai",
      body: [
        "Andar se yeh ek standard 3x3 convolution kernel se kaam karta hai — ek jaana-pehchana, image-processing ka tarika jo har pixel ko uske padosi pixels se milakar dekhta hai. Jahan koi pixel apne aas-paas se saaf alag hai (ek edge), wahan woh farak badha diya jaata hai. Jahan aas-paas flat aur ek jaisa hai (khula aasman, plain wall, smooth skin), wahan zyada kuch nahi badalta, kyunki wahan badhane ke liye koi edge-contrast hai hi nahi.",
        "Isi liye sharpening se image pura alag nahi, balki zyada \"defined\" lagti hai — yeh sirf edges par kaam karti hai, har pixel par ek jaisa asar nahi daalti.",
      ],
    },
    {
      heading: "Over-sharpening ka trap, aur use kaise pehchane",
      body: [
        "Strength bahut zyada badha do toh halos dikhne lagte hain — cheezon ke edges par halki ya dark lines, saath hi ek grainy, artificial harshness jo \"clean\" ke bajaye \"processed\" jaisi lagti hai. Sharpening mein yeh sabse common mistake hai: yeh maan lena ki zyada strength hamesha better hoti hai, jabki asal maksad sabse kam matra hai jo saaf tarah help kare.",
        "Ise judge karne ka ek tarika: 100% zoom karke sharpen ki gayi aur asli photo ko saath-saath dekhein. Agar edges bina halos ya noise ke sach mein clean lagte hain, toh setting sahi hai. Agar image grainy lagne lage ya edges par line jaisi dikhe, toh strength kam kar dein.",
      ],
    },
    {
      heading: "Apne workflow mein sharpen kab karein",
      body: [
        "Agar aap image resize bhi kar rahe hain, toh resize karne ke baad sharpen karein, pehle nahi — resizing khud thodi softness la deti hai, aur final size par sharpen karna, pehle sharpen karke phir chota karne (jo effect kam kar sakta hai) ya bada karne (jo kharaabiyan badha sakta hai) se zyada reliable result deta hai. Yeh order jitna log sochte hain usse zyada matter karta hai, aur aksar isi wajah se web ke liye chota ki gayi \"sharp\" photo bhi soft lagti rehti hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya sharpening sach mein blurry photo theek kar sakti hai?",
      answer:
        "Pura nahi — sharpening existing edges par contrast badhati hai, asli focus-blur ki wajah se capture na hui detail wapas nahi la sakti. Yeh halki soft images par achhe se kaam karti hai, bahut zyada out-of-focus photos par nahi.",
    },
    {
      question: "Kaise pata chale ki maine zyada sharpen kar diya?",
      answer:
        "Halos (edges ke aas-paas halki ya dark lines) aur overall grainy, artificial look dekhein. Agar image clean ke bajaye \"processed\" jaisi lagne lage, toh strength kam kar dein.",
    },
    {
      question: "Image resize karne se pehle sharpen karein ya baad mein?",
      answer:
        "Resize karne ke baad sharpen karein. Resizing khud thodi softness la deti hai, isliye final size par sharpen karna pehle sharpen karke baad mein resize karne se zyada reliable result deta hai.",
    },
  ],
};
