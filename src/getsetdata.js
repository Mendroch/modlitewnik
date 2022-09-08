export const getQuote = () => {
    if (localStorage.getItem('quotes')) {
        let quotes = JSON.parse(localStorage.getItem('quotes'))
        return quotes[Math.floor(Math.random()*quotes.length)]
    } else {
        return ['Błąd wczytywania cytatu z Local Storage', 'Krzysztof M']
    }
}

export const getSongs = () => {
    if (localStorage.getItem('songs')) {
        return JSON.parse(localStorage.getItem('songs'))
    } else { alert('Błąd wczytywania songs') } // <- usunąć w oficjalnej wersji
}

export const getTextSettings = () => {
    if (localStorage.getItem('settings')) {
        return JSON.parse(localStorage.getItem('settings'))
    } else {
        let settings = {
            fontFamily: 'Inter',
            fontSize: '17px',
            lineHeight: '1.2'
        }
        localStorage.setItem('settings', JSON.stringify(settings))
        return settings
    }
}

export const setTextSettings = (fontFamily, fontSize, lineHeight) => {
    let settings = {
        fontFamily: fontFamily,
        fontSize: fontSize,
        lineHeight: lineHeight
    }
    localStorage.setItem('settings', JSON.stringify(settings))
}

export const setLocalStorageFiles = () => {
    if (!localStorage.getItem('songs')) {
        createSongsFile()
    }

    if (!localStorage.getItem('quotes')) {
        createQuoteFile()
    }
}

const createSongsFile = () => {

    const songs = [
        ['Pieśni adwentowe', [
            ['Archanioł Boży Gabryel', 
            `Archanioł Boży Gabryel,
            Posłan do Panny Maryjej,
            Z Majestatu Trójcy świętej,
            Tak sprawował poselstwo kniej:
            Zdrowaś Panno łaskiś pełna,
            Pan jest z Tobą to rzecz pewna.
            
            Panna się wielce zdumiała
            Z poselstwa, które słyszała;
            Pokorniuchno się skłoniła,
            Jako Panna sromieźliwa,
            Zasmuciła się z tej mowy,
            Nic nie rzekła Aniołowi.
            
            Ale poseł z wysokości
            Napełnion Boskiej mądrości,
            Rzekł jej: nie bój się Maryja,
            Najszczęśliwszaś Panno miła,
            Nalazlaś łaskę u Pana,
            Oto poczniesz jego Syna.
            
            Jezus nazwiesz Imię jego,
            Będzie Synem najwyższego,
            Wielki z strony człowieczeństwa,
            A niezmierny z strony Bóstwa:
            Wieczny Syn Ojca wiecznego,
            Zbawiciel świata wszystkiego.
            
            A jakożby to mogło być,
            Jęła Panna kniemu mówić:
            
            
            Ja nie chcę męża nigdy znać;
            Jął jej Anioł tak powiadać:
            Iż duch święty z swej miłości,
            Sprawi to w tobie w czystości.
            
            Temu Panna uwierzyła,
            Przyzwalając tak mówiła:
            O Pośle Boga wiecznego,
            Gdyż to wola Pana mego,
            Toć ja służebnica jego,
            Stań się według słowa tego.
            
            Rychlej niżby kto mgnął okiem,
            Stał się Syn Boży człowiekiem,
            W żywocie Panny najczystszej,
            Ze krwie czystego serca jej,
            Sprawą Boga wszechmocnego,
            Miłośnika człowieczego.
            
            I toć wielka miłość była,
            Boga Ojca jego Syna;
            Iż dla człowieka grzesznego,
            Z majestatu najświętszego,
            Z miłości wiecznej przed wiekiem,
            Stał się Syn Boży człowiekiem.
            
            O Aniele Gabryelu!
            Najszlachetniejszy z tak wielu,
            O Pośle najznakomitszy,
            Nie jest równy tobie inszy:
            Z poselstwa któreś sprawował,
            Znać iż cię Bóg umiłował.
            
            Pośle Boga wszechmocnego,
            Gdyś tak w wielkiej łasce jego,
            Módl się do Pana za nami,
            I do tej najświętszej Panny,
            
            
            Abyśmy z grzechów powstali,
            Po śmierci z nim królowali.
            
            Bogu Ojcu wszechmocnemu,
            Synowi jego miłemu,
            I Duchowi najświętszemu,
            Bogu w Trójcy jedynemu,
            Dziękujmy dziś w pokorności,
            Za ten cud jego miłości.`],
            ['Boże wieczny, Boże żywy', 
            `Boże wieczny, Boże żywy!
            Odkupicielu prawdziwy,
            Wysłuchaj nasz głos płaczliwy!
            
            Któryś jest na wysokości,
            Schyl nieba, użycz litości:
            Spuść się w nasze głębokości.
            
            O niebieskie góry srogie,
            Spuśćcie rosę na ubogie,
            Dajcie nam zbawienie drogie.
            
            Nietrzymajcie przejrzanego,
            Chmury swoim dżdżem naszego
            Przynieście sprawiedliwego.
            
            Przyjdź co rychlej miłosierny,
            O Boże! człowiek mizerny,
            Ciebie czeka, tobie wierny.
            
            Obejdź się z nami łaskawie
            Zmiłuj się po nagłej sprawie,
            Racz przyjść ku twej wiecznej sławie.
            
            Odmień Panie twój gniew srogi,
            Odmień, niech człowiek ubogi
            Nawiedzi twe święte progi.
            
            
            Usłysz płacz stworzenia swego,
            Daj doczekać uciesznego
            Narodzenia Syna twego.
            
            Amen zakrzykniem wdzięcznemi
            Głosy, by nas Bóg z świętemi
            Złączył poczty anielskiemi.`]
        ]],
        ['Pieśni cerkiewne', [[]]],
        ['Pieśni maryjne', [['Amen, jak Maryja', 
            `Kiedy ci smutno i nic nie wychodzi, mów:
            Amen, jak Maryja,
            Amen, jak Maryja,
            Amen, widocznie Bóg tak chce.
            Tak jak Maryja wypełniaj wolę Boga
            I zanieś tam swój uśmiech
            Gdzie często płyną łzy.

            Gdy z ciebie szydzą i z ciebie się śmieją, mów.
            Amen, jak Maryja,
            Amen, jak Maryja,
            Amen, widocznie Bóg tak chce.

            Gdy w twoim sercu nic więcej prócz bólu, mów
            Amen, jak Maryja,
            Amen, jak Maryja,
            Amen, widocznie Bóg tak chce.`],
        ['Bogarodzica', `Bogurodzica, dziewica, Bogiem sławiena Maryja!
        U twego syna, Gospodzina, matko zwolena Maryja!
        Zyszczy nam, spuści nam.
        Kirielejson.
        
        Twego dziela Krzciciela, bożyce,
        Usłysz głosy, napełni myśli człowiecze.
        Słysz modlitwę, jąż nosimy,
        A dać raczy, jegoż prosimy,
        A na świecie zbożny pobyt,
        Po żywocie rajski przebyt.
        Kirielejson.
        
        Nas dla wstał z martwych syn boży,
        Wierzyż w to człowiecze zbożny,
        Iż przez trud Bog swoj lud
        Odjął diablej strożej.
        
        Przydał nam zdrowia wiecznego,
        Starostę skował pkielnego,
        Śmierć podjął, wspominął
        Człowieka pirwego.
        
        Jenże trudy cirzpiał zawiernie,
        Jeszcze był nie prześpiał zaśmierne,
        Aliż sam Bog z martwych wstał.
        
        Adamie, ty boży kmieciu,
        Ty siedzisz u Boga [w] wiecu,
        Domieściż twe dzieci,
        Gdzie krolują anjeli.
        
        Tegoż nas domieściż, Jezu Kryste miły,
        Bychom z Tobą byli,
        Gdzież się nam radują szwe niebieskie siły.
        
        Była radość, była miłość, było widzienie tworca
        Anjelskie bez końca,
        Tuć się nam zwidziało diable potępienie.
        
        Ni śrzebrzem, ni złotem nas diabłu odkupił,
        Swą mocą zastąpił.
        
        Ciebie dla, człowiecze, dał Bog przekłoć sobie
        Ręce, nodze obie.
        Kry święta szła z boka na zbawienie tobie.
        
        Wierzyż w to, człowiecze, iż Jezu Kryst prawy,
        Cirpiał za nas rany,
        Swą świętą krew’ przelał za nas krześcijany.
        
        O duszy o grzeszne sam Bog pieczą ima,
        Diabłu ją otyma,
        Gdzie to sam kroluje, k sob[ie] ją przyma.
        
        Maryja dziewice, prośmy synka twego
        Krola niebieskiego,
        Haza nas huchowa ote wszego złego.
        Amen tako Bog daj,
        Bychom szli szwyćcy w raj.`],
        ['Brzmi cichej godziny', `Brzmi cichej godziny,
        Przez góry doliny, Dzwonku Twój głos.
        Brzmij Pannie Maryi,
        Nieś pozdrowienie Jej, Aż do niebios.
        
        Bo Ona łask pełna,
        Niebo i ziemia ma Pokłon Jej dać.
        Chcę też Jej dzwonkiem być,
        Ją pozdrowieniem czcić, Ją miłować.
        
        Pan Bóg wszechmogący,
        Nas pocieszający, On jest z Tobą,
        Królowo Niebieska,
        Nasza pośredniczko, Bądź też ze mną.
        
        Panno wysławiona.
        Spraw niech Twa Dziecina, Nam tu sprzyja.
        Tyś błogosławiona,
        Bez grzechu poczęta. O Maryja!`]]],
        ['Pieśni na Boże Ciało', [[]]],
        ['Pieśni nabożne', [[]]],
        ['Pieśni o świętych', [[]]],
        ['Pieśni podczas Mszy świętej', [[]]]
    ]



    localStorage.setItem('songs', JSON.stringify(songs))
}

const createQuoteFile = () => {
    const quotes = [
        ['Marność nad marnościami, powiada Kohelet, marność nad marnościami – wszystko marność.', 'Koh 1:2'],
        ['Poznacie ich po ich owocach', 'Mt 7:16,20'],
        ['Proście, a będzie wam dane; szukajcie, a znajdziecie; kołaczcie, a otworzą wam.', 'Mt 7:7']
    ]

    localStorage.setItem('quotes', JSON.stringify(quotes))
}
