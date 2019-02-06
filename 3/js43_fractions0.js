let initialize = () => {

  let Rational = {
    checkInput(n,d){
      if (n == null && d == null) {
        this.init(0,1)
      }else {
        this.init(n,d);
      }
    },
    init: function (n, d) {
        this.numerator = n;
        this.denominator = d;
    },
    getNumerator() {
      return this.numerator;
    },
    setNumerator(n) {
        this.numerator = n;
    },
    getDenominator() {
      return this.numerator;
    },
    setDenominator(d) {
        this.denominator = d;
    },
    toString() {
      if (this.denominator == 1) {
        return `${this.numerator}`;
      } else {
        return `${this.numerator}/${this.denominator}`;
      }
    },
    negate() {
      let newN = this.numerator * -1;
      this.setNumerator(newN);
      let newD = this.denominator * -1;
      this.setDenominator(newD);
    },
    invert() {
      let oldN = this.numerator;
      this.setNumerator(this.denominator);
      this.setDenominator(oldN);
    },
    toFloat() {
      return this.numerator / this.denominator;
    },
    reduce() {
      let gcd = function (n,d) {
        if (d == 0) {
            return n;
        } else {
            return gcd(d, n % d);
        }
      }
      let reduced = gcd(this.numerator,this.denominator)
      console.log('the gcd is = '+reduced);
      this.divide(reduced);

    },
    divide(i) {
      let newN = this.numerator / i;
      let newD = this.denominator / i;
      this.setNumerator(newN);
      this.setDenominator(newD);
    }
  };

  let output = $('result');      //place to display

  // buttons
  let btnNegate = $('negate');
  btnNegate.addEventListener('click',function() {
    ration1.negate();
    output.innerHTML = ration1.toString();
  });

  let btnReduce = $('reduce');
  btnReduce.addEventListener('click',function() {
    ration1.reduce();
    output.innerHTML = ration1.toString();
  });

  let btnInvert = $('invert');
  btnInvert.addEventListener('click',function() {
    ration1.invert();
    output.innerHTML = ration1.toString();
  });

  let btnToFloat = $('toFloat');
  btnToFloat.addEventListener('click',function() {
    let result = ration1.toFloat();
    output.innerHTML = 'Result: ' + result;
  });

  // first inputs:
  let n = parseInt(prompt('Give me an integer:'));
  let d = parseInt(prompt('Give me an integer:'));

  let ration1 = Object.create(Rational);  // create
  ration1.checkInput(n, d);               // "construct"
  output.innerHTML = ration1.toString();  // display

  // second inputs for fration calculation:
  let calc = $('calc');
  calc.addEventListener('click', function() {
    n = parseInt(prompt('Give me an integer:'));
    d = parseInt(prompt('Give me an integer:'));

    let ration2 = Object.create(Rational);  // create another
    ration2.checkInput(n, d);               // "construct"another
    output.innerHTML = ration1.toString() + "  " + ration2.toString();  // display both

    let btnAdd = $('add');
    btnAdd.addEventListener('click',function() {
      add();
    });

    let btnSub = $('sub');
    btnSub.addEventListener('click',function() {
      sub();
    });

    let btnMul = $('mul');
    btnMul.addEventListener('click',function() {
      mul();
    });

    let btnDiv = $('div');
    btnDiv.addEventListener('click',function() {
      div();
    });

    // formulars:
    let add = () => {
      let resN;
      let resD;
      if (ration1.denominator === ration2.denominator) {
        resN = ration1.numerator + ration2.numerator;
        resD = ration1.denominator;
      } else {
        resN = ration1.numerator * ration2.denominator + ration1.denominator * ration2.numerator;
        resD = ration1.denominator * ration2.denominator;
      }
      let rationResult = Object.create(Rational);
      rationResult.init(resN,resD);
      rationResult.reduce();
      output.innerHTML = rationResult.toString();
    };

    let sub = () => {
      let resN;
      let resD;
      if (ration1.denominator === ration2.denominator) {
        resN = ration1.numerator - ration2.numerator;
        resD = ration1.denominator;
      } else {
        resN = ration1.numerator * ration2.denominator - ration1.denominator * ration2.numerator;
        resD = ration1.denominator * ration2.denominator;
      }
      let rationResult = Object.create(Rational);
      rationResult.init(resN,resD);
      rationResult.reduce();
      output.innerHTML = rationResult.toString();
    };

    let mul = () => {
      let resN;
      let resD;
      resN = ration1.numerator * ration2.numerator;
      resD = ration1.denominator * ration2.denominator;

      let rationResult = Object.create(Rational);
      rationResult.init(resN,resD);
      rationResult.reduce();
      output.innerHTML = rationResult.toString();
    };

    let div = () => {
      let resN;
      let resD;
      resN = ration1.numerator * ration2.denominator;
      resD = ration1.denominator * ration2.numerator;

      let rationResult = Object.create(Rational);
      rationResult.init(resN,resD);
      rationResult.reduce();
      output.innerHTML = rationResult.toString();
    };
  });

};

window.addEventListener('load', initialize);
