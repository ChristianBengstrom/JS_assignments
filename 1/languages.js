var languages = [];     // languages is an indexed array, Key10a page 14
                        // each array element is an object, Key10a page 16
languages[0] = { countrycode: 'AFG'
    , language: 'Balochi', percentage: '0.9', population: '22720000' };
languages[1] = { countrycode: 'AFG'
    , language: 'Dari', percentage: '32.1', population: '22720000' };
languages[2] = { countrycode: 'AFG'
    , language: 'Pashto', percentage: '52.4', population: '22720000' };
languages[3] = { countrycode: 'AFG'
    , language: 'Turkmenian', percentage: '1.9', population: '22720000' };
languages[4] = { countrycode: 'AFG'
    , language: 'Uzbek', percentage: '8.8', population: '22720000' };
languages[5] = { countrycode: 'TJK'
    , language: 'Russian', percentage: '9.7', population: '6188000' };
languages[6] = { countrycode: 'TJK'
    , language: 'Tadzhik', percentage: '62.2', population: '6188000' };
languages[7] = { countrycode: 'TJK'
    , language: 'Uzbek', percentage: '23.2', population: '6188000' };
languages[8] = { countrycode: 'UZB'
    , language: 'Karakalpak', percentage: '2.0', population: '24318000' };
languages[9] = { countrycode: 'UZB'
    , language: 'Kazakh', percentage: '3.8', population: '24318000' };
languages[10] = { countrycode: 'UZB'
    , language: 'Russian', percentage: '10.9', population: '24318000' };
languages[11] = { countrycode: 'UZB'
    , language: 'Tadzhik', percentage: '4.4', population: '24318000' };
languages[12] = { countrycode: 'UZB'
    , language: 'Tatar', percentage: '1.8', population: '24318000' };
languages[13] = { countrycode: 'UZB'
    , language: 'Uzbek', percentage: '72.6', population: '24318000' };


// Assignment JS.1.1
let calcPersons = (people, percent) => {
  return people / 100 * percent;
};

var i = 0;
for (var i = 0; i < languages.length; i++) {
  var noPeople = calcPersons(languages[i].population, languages[i].percentage)
  console.log(languages[i].countrycode + " " + languages[i].language + " " + noPeople);
}

var countries = [];     // We create an array
//                         // if there is nothing at a certain index
//                         // index is associative
//                         // then we put some data in there
// if (! countries[languages[i].countrycode]) {
//     countries[languages[i].countrycode] = languages[i].countrycode;
// }

// Assignment JS.1.0
let makeContries = () => {
i = 0;
  for (var i = 0; i < languages.length; i++) {
    countries[i] = languages[i].countrycode;
  }
};
let printContries = () => {
i = 0;
  for (var i = 0; i < languages.length; i++) {
    console.log(countries[i]);
  }
};
makeContries();
printContries();
console.log(countries.length);


//
// // how to display what is at a certain index in associative array
// window.alert(countries[languages[i].countrycode]);
// window.alert(countries['UZB']);
