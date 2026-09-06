import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "ico-converter",
  lang: "hinglish",
  title: "Aapka Favicon Dhundhla Kyun Dikhta Hai (Aur Sahi .ico File Ise Kaise Theek Karti Hai)",
  description:
    "Favicon ki tarah upload ki gayi single PNG aksar browser tab mein dhundhli dikhti hai. Jaaniye asli multi-size .ico file ise kaise theek karti hai.",
  sections: [
    {
      heading: "Dhundhla tab icon, jis par tab tak dhyan nahi jaata jab tak woh apni site na ho",
      body: [
        "Aap website mein favicon add karne ke liye bas PNG logo ka naam badal kar favicon.ico kar dete hain aur daal dete hain, aur yeh mostly chal jaata hai — jab tak aapko dhyan nahi aata ki browser tab ka icon baaki jagah jitna saaf dikhne ke muqable thoda dhundhla ya ajeeb tarike se cropped lag raha hai. Aisa isliye hota hai kyunki ek hi image file ko browser ko jitni chhoti size chahiye utne mein khincha ya dabaya jaata hai, aur yeh scaling shayad hi kabhi utni sharp dikhti jitni us khaas size ke liye banayi gayi version dikhti.",
        "Sahi .ico file ise alag tarike se solve karti hai: ek image ko turant resize karne ke bajaye, yeh kai pehle se bani sizes ko ek file mein saath bandhti hai, toh browser kisi ko khinchne-dabane ke bajaye pehle se sahi size wala version chun leta hai.",
      ],
    },
    {
      heading: "Ek file mein kai images kyun ho sakti hain",
      body: [
        "Yahi woh part hai jo .ico ko normal image file se asal mein alag banata hai: yeh ek container format hai jo ek saath kai alag images rakh sakta hai — mostly 16, 32, 48, 64, 128 aur 256 pixels, sab ek hi .ico file mein. Browser tab ko ek chota 16px icon chahiye; desktop shortcut ya app icon ko kahin bada kuch chahiye; sahi .ico har situation ko uski apni, pehle se render ki gayi size deta hai, na ki ek hi image se sara kaam chalata hai.",
        "Yahi wajah hai ki sirf PNG ka naam badal kar .ico kar dena waisa kaam nahi karta jaisa log sochte hain — yeh technically kuch jagahon par load ho jaata hai, par wahan bhi bas ek hi size ko baaki har jagah khincha ja raha hota hai, jo is format ka asli maksad hi miss kar jaata hai.",
      ],
    },
    {
      heading: "Aapki source image square kyun honi chahiye",
      body: [
        "Kyunki .ico ke andar banne wali har size ek square ki tarah render hoti hai, non-square source image ko fit karne ke liye khincha ya dabaya jaata hai — yahi zyadatar favicon koshishein saaf galat ho jaati hain, especially symbol ke saath text wale wide logos mein. Ek square source (ya aisi image jisme asli subject beech mein ho aur aas-paas kaafi jagah ho) har size mein saaf result deta hai, jabki ek wide logo square mein thoosne par lagbhag hamesha ajeeb lagta hai.",
        "Agar aapke paas sirf ek wide horizontal logo hai, toh mostly better hai ki sirf uska icon ya symbol wala hissa alag nikaalein — apne aap mein square — bajaye iske ki pura wordmark 16px ke square mein thoosein jahan text waise bhi padha nahi ja sakega.",
      ],
    },
    {
      heading: "Andar ka modern format, aur iska practical matlab",
      body: [
        "Aajkal ki .ico files mostly PNG-embedded format use karti hain (Windows Vista se supported aur sabhi browsers mein universal), purane raw bitmap-based format ke bajaye — container ke andar har size ek normal PNG image ki tarah store hoti hai, jo purane format ki complex structure ke muqable simple, zyada broadly compatible aur sahi tarike se banana aasan hai.",
        "Practically, iska matlab hai ki aaj ek sahi tarike se bana favicon converter dashkon purani bitmap compatibility ki confusions ki chinta nahi karta — use bas har target size mein saaf PNG render karna hai aur unhe sahi tarike se container mein pack karna hai.",
      ],
    },
  ],
  faqs: [
    {
      question: "Mera logo high-resolution hone ke bawajood favicon dhundhla kyun dikhta hai?",
      answer:
        "Ek hi image file ko browser tab ko jitni chhoti size asal mein chahiye utne mein turant scale kiya jaata hai, aur yeh scaling shayad hi kabhi us situation ke liye especially banayi gayi size jitni sharp dikhti — yahi woh cheez hai jisse sahi multi-size .ico file bachati hai.",
    },
    {
      question: "Kya mera source logo square image hona zaroori hai?",
      answer:
        "Ideally haan — har banayi gayi size square ki tarah render hoti hai, toh non-square source fit karne ke liye khincha ya dabaya jaata hai. Ek square image, ya jisme subject beech mein ho aur kaafi jagah ho, har size mein sabse saaf result deti hai.",
    },
    {
      question: "Kya PNG ka naam badal kar favicon.ico kar dena lagbhag wahi baat hai?",
      answer:
        "Nahi — yeh kuch jagahon par load ho sakta hai, par wahan bhi ek hi image ko browser ya OS ki zaroorat wali har size mein khincha ja raha hota hai, na ki ek asli multi-size container jo har situation ko uska apna sahi tarike se render kiya version de.",
    },
  ],
};
