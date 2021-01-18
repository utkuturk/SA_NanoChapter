
define_ibex_controller({
      name: "MyPractice",

	  jqueryWidget: {
	      _init: function () {
		        this.options.transfer = null;
		        this.element.VBox({
			          options: this.options,
			          triggers: [1],
			          padding: "1em",
			          children: [
				            "Message", this.options,
      				      "AcceptabilityJudgment", this.options
                ]
                  });
          }
      },

      properties: { }
});
var exp = seq("practice", "startexp", sepWith("sep", seq(rshuffle(startsWith("target"), anyOf(startsWith("filler"), startsWith("control"))))));
var shuffleSequence = seq("intro","instructions", exp, "sr", "end");
var practiceItemTypes = ["practice"];

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Bir sonraki cümle için bekleyiniz.",
        errorMessage: "Yanlış cevap. Bir sonraki cümle için bekleyiniz.",
        ignoreFailure: true
    },
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5"],
        q: "Bu cümle kulağınıza nasıl gelmektedir?",
        leftComment: "(çok kötü)", rightComment: "(çok doğal)",
        presentAsScale: true
    },
    "Message", {
        hideProgressBar: true
    },

    "Question", {
        hasCorrect: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

var manualSendResults = true;

var items = [

    ["sr", "__SendResults__", { }],

    ["sep", "Separator", { }],


    ["intro", "Form", {html: { include: "intro.html" }}],
    ["instructions", "Message", {html: { include: "instructions.html" }}],
    ["startexp", "Message", {html: "Deneme cümleleri bitmiştir, artık deneye başlayabilirsiniz."}],
    ["end", "Message", {html: { include: "end.html" }, transfer: null}],

    ["practice", "MyPractice", {html: "<div style=\"text-align: center;font-style: italic;\">Aşağıdaki ölçekten cümlenin ne kadar doğal olduğunu seçiniz.</div>", s: "Daha dün annemizin kollarında yaşıyorduk."},
     "Message", {html: "Bazı cümleler biraz garip olabilir."}],


    ["practice", "MyPractice", {html: "<div style=\"text-align: center;font-style: italic;\">Aşağıdaki ölçekten cümlenin ne kadar doğal olduğunu seçiniz.</div>", s: "Gaviscon çok etkili bir ilaç değil gelmiş."}],



[["condition_datve", 1], "AcceptabilityJudgment", {s: "Duyduğuma göre sana ve bana mektup gelmiş."}],
[["condition_datyada", 1], "AcceptabilityJudgment", {s: "Duyduğuma göre sana ya da bana mektup gelmiş."}],
[["condition_ve", 1], "AcceptabilityJudgment", {s: "Duyduğuma göre sen ve bana mektup gelmiş."}],
[["condition_yada", 1], "AcceptabilityJudgment", {s: "Duyduğuma göre sen ya da bana mektup gelmiş."}],
[["condition_datve", 2], "AcceptabilityJudgment", {s: "Falcıya göre sana ve bana yol çıkmış."}],
[["condition_datyada", 2], "AcceptabilityJudgment", {s: "Falcıya göre sana ya da bana yol çıkmış."}],
[["condition_ve", 2], "AcceptabilityJudgment", {s: "Falcıya göre sen ve bana yol çıkmış."}],
[["condition_yada", 2], "AcceptabilityJudgment", {s: "Falcıya göre sen ya da bana yol çıkmış."}],
[["condition_datve", 3], "AcceptabilityJudgment", {s: "Baksana Twitter'da sana ve bana laf sokmuş."}],
[["condition_datyada", 3], "AcceptabilityJudgment", {s: "Baksana Twitter'da sana ya da bana laf sokmuş."}],
[["condition_ve", 3], "AcceptabilityJudgment", {s: "Baksana Twitter'da sen ve bana laf sokmuş."}],
[["condition_yada", 3], "AcceptabilityJudgment", {s: "Baksana Twitter'da sen ya da bana laf sokmuş."}],
[["condition_datve", 4], "AcceptabilityJudgment", {s: "Onlara değil, sana ve bana fatura kesilecek."}],
[["condition_datyada", 4], "AcceptabilityJudgment", {s: "Onlara değil, sana ya da bana fatura kesilecek."}],
[["condition_ve", 4], "AcceptabilityJudgment", {s: "Onlara değil, sen ve bana fatura kesilecek."}],
[["condition_yada", 4], "AcceptabilityJudgment", {s: "Onlara değil, sen ya da bana fatura kesilecek."}],
[["condition_datve", 5], "AcceptabilityJudgment", {s: "Bilmiyorum valla, sana ve bana kahve ısmarlayacakmış."}],
[["condition_datyada", 5], "AcceptabilityJudgment", {s: "Bilmiyorum valla, sana ya da bana kahve ısmarlayacakmış."}],
[["condition_ve", 5], "AcceptabilityJudgment", {s: "Bilmiyorum valla, sen ve bana kahve ısmarlayacakmış."}],
[["condition_yada", 5], "AcceptabilityJudgment", {s: "Bilmiyorum valla, sen ya da bana kahve ısmarlayacakmış."}],
[["condition_datve", 6], "AcceptabilityJudgment", {s: "Disiplin kurulu sana ve bana ceza verecek."}],
[["condition_datyada", 6], "AcceptabilityJudgment", {s: "Disiplin kurulu sana ya da bana ceza verecek."}],
[["condition_ve", 6], "AcceptabilityJudgment", {s: "Disiplin kurulu sen ve bana ceza verecek."}],
[["condition_yada", 6], "AcceptabilityJudgment", {s: "Disiplin kurulu sen ya da bana ceza verecek."}],
[["condition_datve", 7], "AcceptabilityJudgment", {s: "Haftanın sonunda sana ve bana bilet verecekler."}],
[["condition_datyada", 7], "AcceptabilityJudgment", {s: "Haftanın sonunda sana ya da bana bilet verecekler."}],
[["condition_ve", 7], "AcceptabilityJudgment", {s: "Haftanın sonunda sen ve bana bilet verecekler."}],
[["condition_yada", 7], "AcceptabilityJudgment", {s: "Haftanın sonunda sen ya da bana bilet verecekler."}],
[["condition_datve", 8], "AcceptabilityJudgment", {s: "Maile bakılırsa sana ve bana haddimizi bildirecek."}],
[["condition_datyada", 8], "AcceptabilityJudgment", {s: "Maile bakılırsa sana ya da bana haddimizi bildirecek."}],
[["condition_ve", 8], "AcceptabilityJudgment", {s: "Maile bakılırsa sen ve bana haddimizi bildirecek."}],
[["condition_yada", 8], "AcceptabilityJudgment", {s: "Maile bakılırsa sen ya da bana haddimizi bildirecek."}],
[["condition_datve", 9], "AcceptabilityJudgment", {s: "Maçtan sonra sana ve bana günümüzü gösterecekmiş."}],
[["condition_datyada", 9], "AcceptabilityJudgment", {s: "Maçtan sonra sana ya da bana günümüzü gösterecekmiş."}],
[["condition_ve", 9], "AcceptabilityJudgment", {s: "Maçtan sonra sen ve bana günümüzü gösterecekmiş."}],
[["condition_yada", 9], "AcceptabilityJudgment", {s: "Maçtan sonra sen ya da bana günümüzü gösterecekmiş."}],
[["condition_datve", 10], "AcceptabilityJudgment", {s: "Dediğine göre sana ve bana izin verecek."}],
[["condition_datyada", 10], "AcceptabilityJudgment", {s: "Dediğine göre sana ya da bana izin verecek."}],
[["condition_ve", 10], "AcceptabilityJudgment", {s: "Dediğine göre sen ve bana izin verecek."}],
[["condition_yada", 10], "AcceptabilityJudgment", {s: "Dediğine göre sen ya da bana izin verecek."}],
[["condition_datve", 11], "AcceptabilityJudgment", {s: "Yazdıklarına bakılırsa sana ve bana sırıksıklam aşıkmış."}],
[["condition_datyada", 11], "AcceptabilityJudgment", {s: "Yazdıklarına bakılırsa sana ya da bana sırıksıklam aşıkmış."}],
[["condition_ve", 11], "AcceptabilityJudgment", {s: "Yazdıklarına bakılırsa sen ve bana sırıksıklam aşıkmış."}],
[["condition_yada", 11], "AcceptabilityJudgment", {s: "Yazdıklarına bakılırsa sen ya da bana sırıksıklam aşıkmış."}],
[["condition_datve", 12], "AcceptabilityJudgment", {s: "Şuna baksana sana ve bana delicesine hayranmış."}],
[["condition_datyada", 12], "AcceptabilityJudgment", {s: "Şuna baksana sana ya da bana delicesine hayranmış."}],
[["condition_ve", 12], "AcceptabilityJudgment", {s: "Şuna baksana sen ve bana delicesine hayranmış."}],
[["condition_yada", 12], "AcceptabilityJudgment", {s: "Şuna baksana sen ya da bana delicesine hayranmış."}],
[["condition_datve", 13], "AcceptabilityJudgment", {s: "Hep derdi sana ve bana araba alacakmış."}],
[["condition_datyada", 13], "AcceptabilityJudgment", {s: "Hep derdi sana ya da bana araba alacakmış."}],
[["condition_ve", 13], "AcceptabilityJudgment", {s: "Hep derdi sen ve bana araba alacakmış."}],
[["condition_yada", 13], "AcceptabilityJudgment", {s: "Hep derdi sen ya da bana araba alacakmış."}],
[["condition_datve", 14], "AcceptabilityJudgment", {s: "Önümüzdeki günlerde sana ve bana engel olacakmış."}],
[["condition_datyada", 14], "AcceptabilityJudgment", {s: "Önümüzdeki günlerde sana ya da bana engel olacakmış."}],
[["condition_ve", 14], "AcceptabilityJudgment", {s: "Önümüzdeki günlerde sen ve bana engel olacakmış."}],
[["condition_yada", 14], "AcceptabilityJudgment", {s: "Önümüzdeki günlerde sen ya da bana engel olacakmış."}],
[["condition_datve", 15], "AcceptabilityJudgment", {s: "Son zamanlarda sana ve bana benzemeye çalışıyor."}],
[["condition_datyada", 15], "AcceptabilityJudgment", {s: "Son zamanlarda sana ya da bana benzemeye çalışıyor."}],
[["condition_ve", 15], "AcceptabilityJudgment", {s: "Son zamanlarda sen ve bana benzemeye çalışıyor."}],
[["condition_yada", 15], "AcceptabilityJudgment", {s: "Son zamanlarda sen ya da bana benzemeye çalışıyor."}],
[["condition_datve", 16], "AcceptabilityJudgment", {s: "Annem haftasonu sana ve bana temizlik yaptırtacak."}],
[["condition_datyada", 16], "AcceptabilityJudgment", {s: "Annem haftasonu sana ya da bana temizlik yaptırtacak."}],
[["condition_ve", 16], "AcceptabilityJudgment", {s: "Annem haftasonu sen ve bana temizlik yaptırtacak."}],
[["condition_yada", 16], "AcceptabilityJudgment", {s: "Annem haftasonu sen ya da bana temizlik yaptırtacak."}],
[["condition_datve", 17], "AcceptabilityJudgment", {s: "Bunu öğrendiklerinde sana ve bana hesap soracaklar."}],
[["condition_datyada", 17], "AcceptabilityJudgment", {s: "Bunu öğrendiklerinde sana ya da bana hesap soracaklar."}],
[["condition_ve", 17], "AcceptabilityJudgment", {s: "Bunu öğrendiklerinde sen ve bana hesap soracaklar."}],
[["condition_yada", 17], "AcceptabilityJudgment", {s: "Bunu öğrendiklerinde sen ya da bana hesap soracaklar."}],
[["condition_datve", 18], "AcceptabilityJudgment", {s: "Yaptıklarımızı görünce sana ve bana düşman kesilecek."}],
[["condition_datyada", 18], "AcceptabilityJudgment", {s: "Yaptıklarımızı görünce sana ya da bana düşman kesilecek."}],
[["condition_ve", 18], "AcceptabilityJudgment", {s: "Yaptıklarımızı görünce sen ve bana düşman kesilecek."}],
[["condition_yada", 18], "AcceptabilityJudgment", {s: "Yaptıklarımızı görünce sen ya da bana düşman kesilecek."}],
[["condition_datve", 19], "AcceptabilityJudgment", {s: "Düşünsene mesela sana ve bana davet gönderiyormuş."}],
[["condition_datyada", 19], "AcceptabilityJudgment", {s: "Düşünsene mesela sana ya da bana davet gönderiyormuş."}],
[["condition_ve", 19], "AcceptabilityJudgment", {s: "Düşünsene mesela sen ve bana davet gönderiyormuş."}],
[["condition_yada", 19], "AcceptabilityJudgment", {s: "Düşünsene mesela sen ya da bana davet gönderiyormuş."}],
[["condition_datve", 20], "AcceptabilityJudgment", {s: "Rüylarımda hep sana ve bana mesaj atıyor."}],
[["condition_datyada", 20], "AcceptabilityJudgment", {s: "Rüylarımda hep sana ya da bana mesaj atıyor."}],
[["condition_ve", 20], "AcceptabilityJudgment", {s: "Rüylarımda hep sen ve bana mesaj atıyor."}],
[["condition_yada", 20], "AcceptabilityJudgment", {s: "Rüylarımda hep sen ya da bana mesaj atıyor."}],
[["condition_datve", 21], "AcceptabilityJudgment", {s: "Eninde sonunda sana ve bana yol görünecek."}],
[["condition_datyada", 21], "AcceptabilityJudgment", {s: "Eninde sonunda sana ya da bana yol görünecek."}],
[["condition_ve", 21], "AcceptabilityJudgment", {s: "Eninde sonunda sen ve bana yol görünecek."}],
[["condition_yada", 21], "AcceptabilityJudgment", {s: "Eninde sonunda sen ya da bana yol görünecek."}],
[["condition_datve", 22], "AcceptabilityJudgment", {s: "Önemli olan sana ve bana zarar gelmemesi."}],
[["condition_datyada", 22], "AcceptabilityJudgment", {s: "Önemli olan sana ya da bana zarar gelmemesi."}],
[["condition_ve", 22], "AcceptabilityJudgment", {s: "Önemli olan sen ve bana zarar gelmemesi."}],
[["condition_yada", 22], "AcceptabilityJudgment", {s: "Önemli olan sen ya da bana zarar gelmemesi."}],
[["condition_datve", 23], "AcceptabilityJudgment", {s: "Eve gelince sana ve bana dert yanacakmış."}],
[["condition_datyada", 23], "AcceptabilityJudgment", {s: "Eve gelince sana ya da bana dert yanacakmış."}],
[["condition_ve", 23], "AcceptabilityJudgment", {s: "Eve gelince sen ve bana dert yanacakmış."}],
[["condition_yada", 23], "AcceptabilityJudgment", {s: "Eve gelince sen ya da bana dert yanacakmış."}],
[["condition_datve", 24], "AcceptabilityJudgment", {s: "Baksana heralde sana ve bana nutuk çekecek."}],
[["condition_datyada", 24], "AcceptabilityJudgment", {s: "Baksana heralde sana ya da bana nutuk çekecek."}],
[["condition_ve", 24], "AcceptabilityJudgment", {s: "Baksana heralde sen ve bana nutuk çekecek."}],
[["condition_yada", 24], "AcceptabilityJudgment", {s: "Baksana heralde sen ya da bana nutuk çekecek."}],
[["condition_datve", 25], "AcceptabilityJudgment", {s: "Heralde çocuğunu sana ve bana şikayet edecek."}],
[["condition_datyada", 25], "AcceptabilityJudgment", {s: "Heralde çocuğunu sana ya da bana şikayet edecek."}],
[["condition_ve", 25], "AcceptabilityJudgment", {s: "Heralde çocuğunu sen ve bana şikayet edecek."}],
[["condition_yada", 25], "AcceptabilityJudgment", {s: "Heralde çocuğunu sen ya da bana şikayet edecek."}],
[["condition_datve", 26], "AcceptabilityJudgment", {s: "İngiltere'den getirdiklerini sana ve bana hediye edecek."}],
[["condition_datyada", 26], "AcceptabilityJudgment", {s: "İngiltere'den getirdiklerini sana ya da bana hediye edecek."}],
[["condition_ve", 26], "AcceptabilityJudgment", {s: "İngiltere'den getirdiklerini sen ve bana hediye edecek."}],
[["condition_yada", 26], "AcceptabilityJudgment", {s: "İngiltere'den getirdiklerini sen ya da bana hediye edecek."}],
[["condition_datve", 27], "AcceptabilityJudgment", {s: "Bilge dedemiz sana ve bana yol gösterecek."}],
[["condition_datyada", 27], "AcceptabilityJudgment", {s: "Bilge dedemiz sana ya da bana yol gösterecek."}],
[["condition_ve", 27], "AcceptabilityJudgment", {s: "Bilge dedemiz sen ve bana yol gösterecek."}],
[["condition_yada", 27], "AcceptabilityJudgment", {s: "Bilge dedemiz sen ya da bana yol gösterecek."}],
[["condition_datve", 28], "AcceptabilityJudgment", {s: "Teyzem kuzenimi sana ve bana emanet edecek."}],
[["condition_datyada", 28], "AcceptabilityJudgment", {s: "Teyzem kuzenimi sana ya da bana emanet edecek."}],
[["condition_ve", 28], "AcceptabilityJudgment", {s: "Teyzem kuzenimi sen ve bana emanet edecek."}],
[["condition_yada", 28], "AcceptabilityJudgment", {s: "Teyzem kuzenimi sen ya da bana emanet edecek."}],
[["condition_datve", 29], "AcceptabilityJudgment", {s: "Eskisi gibi sana ve bana ilgi göstermiyor."}],
[["condition_datyada", 29], "AcceptabilityJudgment", {s: "Eskisi gibi sana ya da bana ilgi göstermiyor."}],
[["condition_ve", 29], "AcceptabilityJudgment", {s: "Eskisi gibi sen ve bana ilgi göstermiyor."}],
[["condition_yada", 29], "AcceptabilityJudgment", {s: "Eskisi gibi sen ya da bana ilgi göstermiyor."}],
[["condition_datve", 30], "AcceptabilityJudgment", {s: "Ofise gelince sana ve bana emir verecekmiş."}],
[["condition_datyada", 30], "AcceptabilityJudgment", {s: "Ofise gelince sana ya da bana emir verecekmiş."}],
[["condition_ve", 30], "AcceptabilityJudgment", {s: "Ofise gelince sen ve bana emir verecekmiş."}],
[["condition_yada", 30], "AcceptabilityJudgment", {s: "Ofise gelince sen ya da bana emir verecekmiş."}],
[["condition_datve", 31], "AcceptabilityJudgment", {s: "Bahsettiği kitabı sana ve bana kargoyla gönderecekmiş."}],
[["condition_datyada", 31], "AcceptabilityJudgment", {s: "Bahsettiği kitabı sana ya da bana kargoyla gönderecekmiş."}],
[["condition_ve", 31], "AcceptabilityJudgment", {s: "Bahsettiği kitabı sen ve bana kargoyla gönderecekmiş."}],
[["condition_yada", 31], "AcceptabilityJudgment", {s: "Bahsettiği kitabı sen ya da bana kargoyla gönderecekmiş."}],
[["condition_datve", 32], "AcceptabilityJudgment", {s: "Yarın akşam sana ve bana pasta yapacakmış."}],
[["condition_datyada", 32], "AcceptabilityJudgment", {s: "Yarın akşam sana ya da bana pasta yapacakmış."}],
[["condition_ve", 32], "AcceptabilityJudgment", {s: "Yarın akşam sen ve bana pasta yapacakmış."}],
[["condition_yada", 32], "AcceptabilityJudgment", {s: "Yarın akşam sen ya da bana pasta yapacakmış."}],
[["condition_datve", 33], "AcceptabilityJudgment", {s: "Bugün yarın sana ve bana haber verebilirler."}],
[["condition_datyada", 33], "AcceptabilityJudgment", {s: "Bugün yarın sana ya da bana haber verebilirler."}],
[["condition_ve", 33], "AcceptabilityJudgment", {s: "Bugün yarın sen ve bana haber verebilirler."}],
[["condition_yada", 33], "AcceptabilityJudgment", {s: "Bugün yarın sen ya da bana haber verebilirler."}],
[["condition_datve", 34], "AcceptabilityJudgment", {s: "Olanları öğrenince sana ve bana gizlice söyleyecekmiş."}],
[["condition_datyada", 34], "AcceptabilityJudgment", {s: "Olanları öğrenince sana ya da bana gizlice söyleyecekmiş."}],
[["condition_ve", 34], "AcceptabilityJudgment", {s: "Olanları öğrenince sen ve bana gizlice söyleyecekmiş."}],
[["condition_yada", 34], "AcceptabilityJudgment", {s: "Olanları öğrenince sen ya da bana gizlice söyleyecekmiş."}],
[["condition_datve", 35], "AcceptabilityJudgment", {s: "Konferanstan önce sana ve bana sunum yapacakmış."}],
[["condition_datyada", 35], "AcceptabilityJudgment", {s: "Konferanstan önce sana ya da bana sunum yapacakmış."}],
[["condition_ve", 35], "AcceptabilityJudgment", {s: "Konferanstan önce sen ve bana sunum yapacakmış."}],
[["condition_yada", 35], "AcceptabilityJudgment", {s: "Konferanstan önce sen ya da bana sunum yapacakmış."}],
[["condition_datve", 36], "AcceptabilityJudgment", {s: "Yakın zamanda sana ve bana kısmet çıkacakmış."}],
[["condition_datyada", 36], "AcceptabilityJudgment", {s: "Yakın zamanda sana ya da bana kısmet çıkacakmış."}],
[["condition_ve", 36], "AcceptabilityJudgment", {s: "Yakın zamanda sen ve bana kısmet çıkacakmış."}],
[["condition_yada", 36], "AcceptabilityJudgment", {s: "Yakın zamanda sen ya da bana kısmet çıkacakmış."}],
[["condition_datve", 37], "AcceptabilityJudgment", {s: "Maaşını alınca sana ve bana bilgisayar alacakmış."}],
[["condition_datyada", 37], "AcceptabilityJudgment", {s: "Maaşını alınca sana ya da bana bilgisayar alacakmış."}],
[["condition_ve", 37], "AcceptabilityJudgment", {s: "Maaşını alınca sen ve bana bilgisayar alacakmış."}],
[["condition_yada", 37], "AcceptabilityJudgment", {s: "Maaşını alınca sen ya da bana bilgisayar alacakmış."}],
[["condition_datve", 38], "AcceptabilityJudgment", {s: "Yazdığı şarkıyı sana ve bana armağan etmiş."}],
[["condition_datyada", 38], "AcceptabilityJudgment", {s: "Yazdığı şarkıyı sana ya da bana armağan etmiş."}],
[["condition_ve", 38], "AcceptabilityJudgment", {s: "Yazdığı şarkıyı sen ve bana armağan etmiş."}],
[["condition_yada", 38], "AcceptabilityJudgment", {s: "Yazdığı şarkıyı sen ya da bana armağan etmiş."}],
[["condition_datve", 39], "AcceptabilityJudgment", {s: "Patron haftaya sana ve bana dosyaları düzenlettirecek."}],
[["condition_datyada", 39], "AcceptabilityJudgment", {s: "Patron haftaya sana ya da bana dosyaları düzenlettirecek."}],
[["condition_ve", 39], "AcceptabilityJudgment", {s: "Patron haftaya sen ve bana dosyaları düzenlettirecek."}],
[["condition_yada", 39], "AcceptabilityJudgment", {s: "Patron haftaya sen ya da bana dosyaları düzenlettirecek."}],
[["condition_datve", 40], "AcceptabilityJudgment", {s: "Müdür galiba sana ve bana iş kitleyecek."}],
[["condition_datyada", 40], "AcceptabilityJudgment", {s: "Müdür galiba sana ya da bana iş kitleyecek."}],
[["condition_ve", 40], "AcceptabilityJudgment", {s: "Müdür galiba sen ve bana iş kitleyecek."}],
[["condition_yada", 40], "AcceptabilityJudgment", {s: "Müdür galiba sen ya da bana iş kitleyecek."}] ];