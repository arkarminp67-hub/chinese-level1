const CHAPTER_DATA = [
  {
    id: 1,
    title: "Level 1",
    words: [
    {"id": "l1-1", "chapter": 1, "chinese": "介绍", "pinyin": "jièshào", "meaning": "မိတ်ဆက်သည်"},
    {"id": "l1-2", "chapter": 1, "chinese": "叫", "pinyin": "jiào", "meaning": "ခေါ်သည်၊ အမည်ဖြစ်သည်"},
    {"id": "l1-3", "chapter": 1, "chinese": "名字", "pinyin": "míngzi", "meaning": "အမည်"},
    {"id": "l1-4", "chapter": 1, "chinese": "从", "pinyin": "cóng", "meaning": "မှ"},
    {"id": "l1-5", "chapter": 1, "chinese": "缅甸", "pinyin": "Miǎndiàn", "meaning": "မြန်မာနိုင်ငံ"},
    {"id": "l1-6", "chapter": 1, "chinese": "住", "pinyin": "zhù", "meaning": "နေသည်"},
    {"id": "l1-7", "chapter": 1, "chinese": "唐人街", "pinyin": "Tángrénjiē", "meaning": "တရုတ်တန်း"},
    {"id": "l1-8", "chapter": 1, "chinese": "家乡", "pinyin": "jiāxiāng", "meaning": "ဇာတိမြေ"},
    {"id": "l1-9", "chapter": 1, "chinese": "中国", "pinyin": "Zhōngguó", "meaning": "တရုတ်နိုင်ငံ"},
    {"id": "l1-10", "chapter": 1, "chinese": "做", "pinyin": "zuò", "meaning": "လုပ်သည်"},
    {"id": "l1-11", "chapter": 1, "chinese": "学习", "pinyin": "xuéxí", "meaning": "လေ့လာသည်၊ သင်ယူသည်"},
    {"id": "l1-12", "chapter": 1, "chinese": "汉语", "pinyin": "Hànyǔ", "meaning": "တရုတ်ဘာသာစကား"},
    {"id": "l1-13", "chapter": 1, "chinese": "学生", "pinyin": "xuésheng", "meaning": "ကျောင်းသား၊ ကျောင်းသူ"},
    {"id": "l1-14", "chapter": 1, "chinese": "哪里", "pinyin": "nǎlǐ", "meaning": "ဘယ်မှာ၊ ဘယ်နေရာ"},
    {"id": "l1-15", "chapter": 1, "chinese": "见到", "pinyin": "jiàndào", "meaning": "တွေ့သည်"},
    {"id": "l1-16", "chapter": 1, "chinese": "很", "pinyin": "hěn", "meaning": "အလွန်၊ တော်တော်"},
    {"id": "l1-17", "chapter": 1, "chinese": "高兴", "pinyin": "gāoxìng", "meaning": "ပျော်သည်"},
    {"id": "l1-18", "chapter": 1, "chinese": "也", "pinyin": "yě", "meaning": "လည်း"}
    ]
  }
];

const WORD_DATA = CHAPTER_DATA.flatMap(chapter => chapter.words);
