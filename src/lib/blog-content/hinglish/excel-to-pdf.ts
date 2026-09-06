import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = {
  toolSlug: "excel-to-pdf",
  lang: "hinglish",
  title: "Spreadsheet Share Karein, Formulas Nahi",
  description:
    "Share karne se pehle Excel file ko PDF mein badalna aapke formulas aur formatting ko galti se hue badlaav se kaise bachata hai.",
  sections: [
    {
      heading: ".xlsx file jitna chahte hain usse zyada share kar deti hai",
      body: [
        "Kisi ko directly spreadsheet bhejna matlab use sab kuch thama dena hai — har formula, har chhupi hui calculation, har conditional formatting rule, aur yeh ability ki woh galti se (ya jaan-boojh kar) koi number badal de aur aapko pata chale bina pura hisab bigaad de. Zyadatar cases mein, jise aap price list, invoice ya report bhej rahe hain, use sirf numbers dekhne hain, peeche ki machinery se chhedchhaad nahi karni.",
        "Usi data ka PDF version ise saaf tarike se solve kar deta hai — saamne wala theek wahi rows aur columns dekhta hai jo aapne chaha, bina is dar ke ki koi galat keystroke teen cell door kisi formula ko bigaad dega.",
      ],
    },
    {
      heading: "Asal mein render kya hota hai",
      body: [
        "Yeh conversion .xlsx file ke internal ZIP-aur-XML structure ko directly padhta hai, pehli worksheet ki cell values nikalta hai (Excel ki shared-strings table ko sahi tarike se resolve karte hue, jo Excel ek jaise text ko baar-baar na dohrane ke liye use karta hai), aur har row-column ko page par ek barabar-space wali grid mein lagata hai, jismein header row ko bold karke neeche ke data se alag dikhaya jaata hai.",
        "Page ki width apne aap isper depend karke badhti hai ki sheet mein kitne columns hain, taaki wide spreadsheet kisi tang, fixed page mein ajeeb tarike se na simat jaaye — yeh bina kisi manual adjustment ke ek simple char-column list aur zyada wide data table, dono ko handle kar leta hai.",
      ],
    },
    {
      heading: "Kya nahi bachta: formulas, colors aur charts",
      body: [
        "Yeh sirf value wali grid banata hai — har cell mein jo bhi text filhaal saved hai, wahi dikhta hai, koi live formula dobara calculate nahi hota (jis cell mein formula ka aakhri result dikh raha tha, woh saved value dikhayega, formula dobara nahi chalega). Conditional formatting, cell colors, charts, aur workbook mein pehli ke alawa koi bhi sheet shamil nahi hoti, kyunki Excel jaisi puri visual accuracy dobara banane ke liye ek halke grid conversion se kahin zyada heavy tool chahiye hoga.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kya meri spreadsheet ke formulas PDF mein dobara calculate honge?",
      answer:
        "Nahi — har cell mein jo bhi value filhaal saved hai, wahi output mein dikhti hai. Live formula calculation nahi hota; yeh file ka saved data padhta hai, koi spreadsheet engine nahi chalata.",
    },
    {
      question: "Kya yeh workbook ki har sheet convert karta hai?",
      answer:
        "Nahi — sirf pehli sheet convert hoti hai. Agar koi alag sheet chahiye, toh convert karne se pehle use workbook mein pehle number par laana hoga.",
    },
    {
      question: "Cell color aur conditional formatting ka kya hota hai?",
      answer:
        "Woh saath nahi aate — output sirf ek simple, plain value grid hota hai jismein saaf-safai ke liye sirf header row bold hoti hai. Puri visual formatting dobara nahi banti.",
    },
  ],
};
