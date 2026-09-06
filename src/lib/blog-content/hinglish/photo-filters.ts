import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "photo-filters",
  lang: "hinglish",
  title: "Sepia, Vintage Ya Noir — Kaunsa Photo Filter Asal Mein Aapki Image Par Fit Baithta Hai",
  description:
    "9 one-click photo filters ki quick guide — har ek asal mein kya karta hai, aur kab kaunsa use karein.",
  sections: [
    {
      heading: "Zyadatar logon ke liye preset, manual color grading se better kyun hai",
      body: [
        "Professional photo editing software aapko hue, saturation, contrast, brightness aur dozen aur values ke liye alag-alag sliders deta hai — powerful, lekin agar aapko bas photo ko thoda warm, ya purana, ya zyada dramatic dikhana hai, bina yeh seekhe ki har slider asal mein image par kya asar dalta hai, toh yeh sach mein bahut zyada lagta hai. Ek one-click filter preset yeh sab kuch ek aise combination mein samet deta hai jo pehle se kisi khaas, pehchaane jaane wale look ke liye tune kiya gaya hai.",
        "Isme ek trade-off hai: control ka. Aap shuru se kuch banane ke bajaye ek ready look choose kar rahe hain. Casual photo sharing ke liye, yeh trade-off lagbhag hamesha faydemand hai — aapko ek click mein achha result milta hai, pandrah minute guess karne ke baad average result ke bajaye.",
      ],
    },
    {
      heading: "Milte-julte naam walon mein farak",
      body: [
        "Sepia aur Vintage aksar confuse kar dete hain kyunki dono \"purani photo\" wala look hain, lekin dono alag-alag era ko target karte hain: Sepia ek strong, pura monochrome warm tone lagata hai — 19th century ki photo ke kareeb — jabki Vintage kuch color rakhta hai lekin saturation kam kar deta hai aur warmth thodi badha deta hai, jo 1970s ki faded print ke kareeb hai. Agar photo ko sach mein purana aur colorless dikhana hai, toh Sepia. Agar use ek asli photo jaisa dikhana hai jo bas purani ho gayi ho, toh Vintage.",
        "Noir aur plain grayscale conversion bhi confuse kar dete hain. Ek flat desaturation sirf color hatata hai. Noir color hatane ke saath-saath contrast badhata hai aur brightness thodi kam karta hai, jo film noir photography se juda hua jaan-boojh kar banaya gaya moody, high-contrast look hai — sirf \"color hataya gaya version\" nahi, balki ek khaas dramatic treatment.",
      ],
    },
    {
      heading: "Warm, Cool, Vivid aur Fade — roz kaam aane wale 4",
      body: [
        "Dramatic filters ke alawa, 4 filters normal photo touch-up ke liye hain. Warm aur Cool poore color temperature ko badalte hain — Warm orange/yellow tones ki taraf le jaata hai (skin ke liye achha, golden-hour shots ke liye best), Cool blue ki taraf le jaata hai (winter scenes, water, ya zyada clean look ke liye achha). Vivid saturation aur contrast dono badhakar photo ko zyada eye-catching banata hai, jo often \"photo mein aur jaan chahiye\" ka matlab hota hai. Fade iska lagbhag ulta karta hai — yeh contrast kam karta hai aur shadows thode halke karta hai, jo aajkal ki lifestyle photography mein common soft, muted, editorial look deta hai.",
        "Inme se koi bhi photo mein asal mein kuch nahi badalta — yeh kisi phone camera ke built-in filters ke zyada kareeb hain, kisi bade style change ke bajaye, jo inhe tab safe default banate hain jab aap sure na ho ki koi strong effect fit baithega ya nahi.",
      ],
    },
    {
      heading: "Decide karne se pehle compare karein",
      body: [
        "Kyunki har filter browser ki canvas pipeline se turant apply hota hai, sahi filter choose karne ka sabse fast tarika hai kai filters try karke compare karna, sirf naam se guess karne ke bajaye — kuch photos par \"Cool\" aur \"Fade\" surprisingly ek jaise lag sakte hain, yeh original lighting par depend karta hai, aur yeh jaanne ka ekmatra reliable tarika hai apni asli photo par dono ko saath-saath dekhna, na ki kisi generic example se guess lagana.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya main filter ki intensity kam-zyada kar sakta hoon?",
      answer:
        "Is tool se nahi — har filter ek fixed intensity par apply hota hai jo uske khaas look ke liye tune ki gayi hai. Agar aapko alag-alag settings par fine control chahiye, toh woh manual color-grading ka kaam hai, jiske liye pura editing software better rahega.",
    },
    {
      question: "Professional dikhne wali headshot ke liye kaunsa filter use karein?",
      answer:
        "Zyadatar professional cases mein, Original (bina filter) ya bahut halka change sabse safe hai — Sepia ya Noir jaise strong stylized filters creative/casual lagte hain, professional nahi, isliye inhe personal ya social content ke liye bacha kar rakhein.",
    },
    {
      question: "Kya filter lagane ke liye meri photo kahin upload hoti hai?",
      answer:
        "Nahi — har filter pura aapke browser mein Canvas API ki built-in filter pipeline se chalta hai. Kuch bhi kabhi server par upload nahi hota.",
    },
  ],
};
