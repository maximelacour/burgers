'use strict';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import * as QRCode from 'qrcode.react';
import {init,send} from 'emailjs-com';



import {
    FormDatePicker, FormNumericTextBox, FormInput,
    FormCheckbox, FormMaskedTextBox, FormTextArea
} from './form-components.js';

import {
    termsValidator, emailValidator, nameValidator,
    phoneValidator, guestsValidator, nightsValidator,
    arrivalDateValidator
} from './validators.js'

const e = React.createElement;

export default class NameForm extends React.Component {
	  constructor(props) {
    super(props);
	this.state = {
		Nom:"",
		Tel:"",
		email:"",
		dateA:"",
		nbjour:"",
		nbplace:"",
		cle:"",
		qrcode:0
	}
    const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));
	

  }
  
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js";
    script.async = true;
	  script.onload = () => this.scriptLoaded();
    document.body.appendChild(script);
}
  
  scriptLoaded() {
  init("user_cIONXFKUOA6iAnq5MvnRe");
}
  
  strRandom = (o) => {
  var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      e = ''+b;
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)];
      d = 1;
    }
    if (o.length) {
      a = o.length;
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase();
    }
    if (o.includeNumbers) {
      e += '1234567890';
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)];
  }
  return c;
}
  
  
  
  convertJson = () => {
	  
	  var obj = {
		  Nom : this.state.Nom.value,
		  Tel : this.state.Tel.value,
		  email : this.state.email.value,
		  dateA : this.state.dateA.value,
		  nbjour : this.state.nbjour.value,
		  nbplace : this.state.nbplace.value,
	  };
	  var str = JSON.stringify(obj);
	  
	var key = this.strRandom();
	this.state.cle = key;
	console.log("test" +key);
	  this.state.qrcode = 1;
	  this.forceUpdate();
	  
	  var templateParams = {
	destinataire: this.state.email.value,
    name: this.state.Nom.value,
    message: 'Votre réservation a été effectuée avec succès !'
};
 
send('service_mlhfez3', 'template_zztxojf', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });

	  
  }
  

  render(){
	  console.log(this.state.cle)
    return (
	<div>
        <Form
            onSubmit={this.handleSubmit}
            render={(formRenderProps) => (
                <FormElement style={{width: 500,fontSize:14}}>
                    <fieldset className={'k-form-fieldset'}>
                        <legend className={'k-form-legend'}>Réservez votre place de parking</legend>
                        <Field
                            id={'fullName'}
                            name={'fullName'}
                            label={'Nom Complet'}
							onChange={(text)=>this.setState({Nom:text})}
                            component={FormInput}
                        />
                        <Field
                            id={'phoneNumber'}
                            name={'phoneNumber'}
                            label={'N° Téléphone'}
                            mask={'00.00.00.00.00'}
							onChange={(text)=>this.setState({Tel:text})}
                            component={FormMaskedTextBox}
                        />
                        <Field
                            id={'email'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
							onChange={(text)=>this.setState({email:text})}
                            component={FormInput}
                        />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Field
                                id={'arrivalDate'}
                                name={'arrivalDate'}
                                label={'Date d\'arrivé'}
								onChange={(text)=>this.setState({dateA:text})}
                                component={FormDatePicker}
                                wrapperStyle={{width: '90%', marginRight: '18px'}}
                            />
                            <Field
                                id={'nightsCount'}
                                name={'nightsCount'}
                                label={'Nombre de jour'}
                                format={'n0'}
								onChange={(text)=>this.setState({nbjour:text})}
                                component={FormNumericTextBox}
                            />
                        </div>
                        <Field
                            id={'guestsCount'}
                            name={'guestsCount'}
                            label={'Nombre de place'}
                            format={'n0'}
							onChange={(text)=>this.setState({nbplace:text})}
                            component={FormNumericTextBox}
                        />
                        <span className={'k-form-separator'} />
                        <Field
                            id={'terms'}
                            name={'terms'}
                            label={'J\'accepte les termes et les conditions'}
                            component={FormCheckbox}
                            validator={termsValidator}
                        />
                        <div className="k-form-buttons">
                            <Button
                                primary={true}
                                type={'submit'}
                                disabled={!formRenderProps.allowSubmit}
								onClick={this.convertJson}
                            >
                                Envoyez Réservation
                            </Button>
                            <Button onClick={formRenderProps.onFormReset}>
                                Tout effacer
                            </Button>
                        </div>
                    </fieldset>
                </FormElement>
            )}
        />
		
		{	
		
			this.state.qrcode == 1 ? <QRCode value={this.state.cle} />
		: null}
		
	</div>
    );
};
}