const text = document.getElementById("text");
const language = document.getElementById("language");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");

// جميع لغات العالم
const languages = {
  "af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian",
  "az":"Azerbaijani","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian",
  "bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","zh":"Chinese","co":"Corsican",
  "hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch","en":"English",
  "eo":"Esperanto","et":"Estonian","fi":"Finnish","fr":"French","fy":"Frisian",
  "gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gu":"Gujarati",
  "ht":"Haitian Creole","ha":"Hausa","haw":"Hawaiian","he":"Hebrew","hi":"Hindi",
  "hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo","id":"Indonesian",
  "ga":"Irish","it":"Italian","ja":"Japanese","jw":"Javanese","kn":"Kannada",
  "kk":"Kazakh","km":"Khmer","ko":"Korean","ku":"Kurdish","ky":"Kyrgyz",
  "lo":"Lao","la":"Latin","lv":"Latvian","lt":"Lithuanian","lb":"Luxembourgish",
  "mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese",
  "mi":"Maori","mr":"Marathi","mn":"Mongolian","my":"Myanmar","ne":"Nepali",
  "no":"Norwegian","ny":"Nyanja","ps":"Pashto","fa":"Persian","pl":"Polish",
  "pt":"Portuguese","pa":"Punjabi","ro":"Romanian","ru":"Russian","sm":"Samoan",
  "gd":"Scots Gaelic","sr":"Serbian","st":"Sesotho","sn":"Shona","sd":"Sindhi",
  "si":"Sinhala","sk":"Slovak","sl":"Slovenian","so":"Somali","es":"Spanish",
  "su":"Sundanese","sw":"Swahili","sv":"Swedish","tg":"Tajik","ta":"Tamil",
  "te":"Telugu","th":"Thai","tr":"Turkish","uk":"Ukrainian","ur":"Urdu",
  "uz":"Uzbek","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","yi":"Yiddish",
  "yo":"Yoruba","zu":"Zulu"
};

// ملأ قائمة اللغات
for(let code in languages){
  language.innerHTML += `<option value="${code}">${languages[code]}</option>`;
}

// الترجمة الفورية
text.addEventListener("input", translate);
language.addEventListener("change", translate);

async function translate(){
  const t = text.value;
  const lang = language.value;
  if(!t){ result.innerHTML=""; return; }

  try{
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(t)}`
    );
    const data = await res.json();
    result.innerHTML = data[0].map(a=>a[0]).join("");
  }catch{
    result.innerHTML = "خطأ في الترجمة";
  }
}

// نسخ الترجمة
copyBtn.addEventListener("click", ()=>{
  if(result.innerHTML){
    navigator.clipboard.writeText(result.innerHTML);
    copyBtn.innerHTML = "تم النسخ ✅";
    setTimeout(()=>copyBtn.innerHTML="نسخ الترجمة",1000);
  }
});

/* ===== إضافات فقط ===== */

// وضع ليلي / نهاري
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("light");
  themeBtn.innerHTML = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// تغيير اسم المترجم (عربي / فرنسي)
const uiLang = document.getElementById("uiLang");
const title = document.querySelector("h1");

// ===== إضافة الإنجليزية =====
uiLang.addEventListener("change", ()=>{
  if(uiLang.value === "fr"){
    title.innerText = "🌐 Traducteur Universel PRO";
    text.placeholder = "Écrivez ici";
    copyBtn.innerText = "Copier la traduction";
  }
  else if(uiLang.value === "en"){
    title.innerText = "🌐 Universal Translator PRO";
    text.placeholder = "Type here";
    copyBtn.innerText = "Copy translation";
  }
  else{
    title.innerText = "🌐 مترجم عالمي PRO";
    text.placeholder = "اكتب هنا";
    copyBtn.innerText = "نسخ الترجمة";
  }
});


