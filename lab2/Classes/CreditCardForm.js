import { formatCardNumberByBrand } from '../functions';


export class Field {
  constructor({
    key,
    label,
    type = 'keyboard', //can be keyboard or 'dropdown'
    maxLength = 50,
    front = true,
    evaluate_input = (text) => text, // next as default
  }) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.maxLength = maxLength;
    this.front = front;
    this.evaluate_input = evaluate_input; // next as default

  }

  static cardNumber() {
    return new Field({
      key: 'cardNumber',
      label: 'Card Number',
      type: 'keyboard',
      maxLength: 19,
      front: true,
      evaluate_input: (text, cardBrand) => {
        //Get raw digits with string parsing (might not be needed we will see)
        const rawDigits = text.replace(/\D/g, '');

        //Detect brand
        //const brand = detectCardBrand(rawDigits);

        //format based on brand
        const formatted = formatCardNumberByBrand(rawDigits, cardBrand);

        return formatted;
      },

    });
  }


  static cardHolder() {
    return new Field({
      key: 'cardHolder',
      label: 'Card Holder',
      type: 'keyboard',
      maxLength: 30,
      front: true,
      evaluate_input: (text) => {
        // Tillåt bokstäver, mellanslag och bindestreck. Gör allt VERSALT.
        const cleaned = text.replace(/[^a-zA-ZåäöÅÄÖ\s-]/g, '');
        return cleaned.toUpperCase();
      },
    });
  }

  static expMonth() {
    return new Field({
      key: 'expMonth',
      label: 'Exp. Month',
      type: 'dropdown',
      maxLength: 2,
      front: true,
      evaluate_input: (text) => {
        // Bara siffror, max 2 tecken (t.ex. "25" för 2025)
        let cleaned = text.replace(/\D/g, '').slice(0, 2);
        return cleaned;
      },
    });
  }

  static expYear() {
    return new Field({
      key: 'expYear',
      label: 'Exp. Year',
      type: 'dropdown',
      maxLength: 2,
      front: true,
      evaluate_input: (text) => {
        // Bara siffror, max 2 tecken (t.ex. "25" för 2025)
        let cleaned = text.replace(/\D/g, '').slice(0, 2);
        return cleaned;
      },
    });
  }

  static cvv() {
    return new Field({
      key: 'cvv',
      label: 'CVV',
      keyboardType: 'numeric',
      maxLength: 4, // hard max
      front: false,
      evaluate_input: (text,cardBrand) => {

        const maxLen = cardBrand === 'amex' ? 4 : 3; //quick if else check depending on if mastercard. Sloppy but good for now

        const cleaned = text.replace(/\D/g, '').slice(0, maxLen);
        return cleaned;
      },

    });
  }
}

export class CreditCardForm {

    constructor(){
        this.fields = [
            Field.cardNumber(),
            Field.cardHolder(),
            Field.expMonth(),
            Field.expYear(),
            Field.cvv(),
        ]

    }
}