
let rezultat;

/**
 * posaljiAjaxZahtev(metoda, url, data) je funkcija koja u sebi sadrzi
 * AJAX objekat The XMLHttpRequest Object -> https://www.w3schools.com/js/js_ajax_http.asp
 * Metoda send() salje zahtev na udaljeni host i zato vreme ceka odgovor na njega, sto inicira
 * asihroni tok izvrsavanja.
 * 
 * Kada je potrebno dohvatiti podatke koji su rezultat asihronog toka izvrsavanja onda se u JS koristi 
 * specijal tip objekta JavaScript Promise  -> https://www.w3schools.com/JS//js_promise.asp
 * 
 * 
 * 
 * Ulazni parametar "data" mora da bude u JSON formatu koji se kao prosledjeni podatak koristi 
 * prilkom zahteva POST metode.
 *
*/
function posaljiAjaxZahtev(metoda, url, data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(metoda, url, true);
        xhr.onload = function () {

            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }; 
        if ( metoda==="POST") {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data)
        } else {
            xhr.send();
        }
    });

};



/**
 * ***********
 * Zadatak 3 *
 * ***********
 */


let elHTMLTemperatura = document.getElementById("temp");
let elHTMLGrad = document.getElementById("grad");  // elHTMLGrad.value je svojstvo cija je vrednost uneseni tekst


/** 
 * async/await su sintaksne reci koje na jedan elegatniji nacin formatiraju kod povezan sa Promise objektima.
 *  https://www.w3schools.com/JS//js_async.asp
 * 
 * Parametar "metoda" moze da ima samo dve vrednosti "POST" ili "GET", prametar "url" je restApi link tipa string.
 * 
*/
async function osveziVreme( metoda, url) {
    try {
        // await sintaksna rec se nalazi ispred funkcije koja inicira asihroni tok izvrsavanja tj. 
        // ceka da se zavrsi.
        let rez = await  posaljiAjaxZahtev(metoda, url);
        rezultat = JSON.parse(rez); // za JSON objekat vidi -> https://www.w3schools.com/js/js_json_intro.asp

        let temperatura = // zavrsi red koda

        //sadrzaj h3#temp ce se dobiti novu vrednost posle izvrsenog sledeceg reda
        elHTMLTemperatura.innerHTML = "Temperatura je " + temperatura.toPrecision(2) + " celzijusa";
    } catch(err) {
        elHTMLTemperatura.innerHTML = "Upss, pogresan grad!";
    }
};


function onClickBtnStartVreme() {

    // Unsei kod tako da se u html elementu h3#temp prikaze vrednost trenutne temperature grada
    // u tekstboksu input#grad kad se klikne na dugme Start.
}





/**
 * ***********
 * Zadatak 4 *
 * ***********
 */

const TEL = "";  // Unesi broj tvog telefona kojeg si registrovao/la na twilio nalogu  npr: +38164...

let elHTMLSms = document.getElementById("sms");  // elHTMLSms.value je svojstvo cija je vrednost uneseni tekst
let elHTMLPotvrda = document.getElementById("potvrda");


/**
 * Parametar "metoda" moze da ima samo dve vrednosti "POST" ili "GET", prametar "url" je restApi link tipa string,
 * parametar "poruka" je sam tekst sms poruke i tipa je string.
 *  
*/ 
async function posaljiSms( metoda, url, poruka) {
    try {

        let data = { 
            broj_tel: TEL,  
            telo_poruke: poruka
        };
        let rez = await  posaljiAjaxZahtev(metoda, url, JSON.stringify(data)); //https://www.w3schools.com/js/js_json_intro.asp
        rezultat = JSON.parse(rez);

        elHTMLPotvrda.innerHTML =  // zavrsi red koda

    } catch(err) {
        elHTMLTemperatura.innerHTML = "Upss, poruka nije poslata!";
    }
};

function onClickBtnStartSms() {
    // Unesi kod potreban da se posalje zahtev nasem lokalnom servisu koji ce poslati sms poruku na tvoj telefon 
}



