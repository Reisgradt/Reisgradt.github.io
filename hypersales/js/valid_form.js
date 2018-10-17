  var errorMessage = {
    'name'        : 'Имя должно быть заполненно, и не должно содержать цифр!',

    'index'       : 'Укажите почтовый индекс.',

    'adress'      : 'Укажите корретный адрес.',

    'city'        : 'Укажите название города, где Вы сейчас проживайте.',

    'phone'       : 'Необходимо ввести номер телефона, в формате 89261234567'
  }

  function checkFields(event, thisLink){ 
    var form, inputDataCount;

    event.preventDefault();

    var dataForm = {};

    form = $(thisLink).closest('form')[0];

    inputDataCount = $('input, textarea', $(form) ).length;

    for(var i=0; i < inputDataCount; i++){

      input = $('input, textarea', $(form))[i];

      if(!validationData(input)){
        return false;
      }

    }

    $('.mm_button').hide();

    $('.ajax_loader').show();

    form.submit(function(event){

      event.preventDefault();

    });

    return true;
  }

  function validationData(inputData){

    var validateAttrName = $(inputData).attr('name');

    var dataVal = $(inputData).val();

    var validate = {
      
      name    : function (){
        if( (dataVal.length < 1) || issetNumber(dataVal) ){
          alert(errorMessage[validateAttrName]);
          return false;
        }
        return true;
      },

      email   : function (){
        if( validateRegEx( /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/, dataVal) ){
          alert(errorMessage[validateAttrName]);
          return false;
        }
        return true;
      },

      adress  : function (){
        if( (dataVal.length < 1) ){
          alert(errorMessage[validateAttrName]);
          return false;
        }
        return true;
      },

      /*phone   : function (){
        if( validateRegEx(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,13}$/, dataVal) ){
          alert(errorMessage[validateAttrName]);
          return false;
        }
        return true;
      },*/

      city    : function (){
        if( (dataVal.length < 1) ){
          alert(errorMessage[validateAttrName]);
          return false;
        }
        return true;
      }
    };

    if( validate.hasOwnProperty(validateAttrName) ){
      return validate[validateAttrName]();
    }

    return true;
  }

  function issetNumber(text){
    for(i=0; i<text.length; i++){
      if(!isNaN(text[i]) && (text[i] !== " ") ) {
        return true;
      }
    }
    return false;
  }

  function validateRegEx(regex, Str){
    if( !regex.test(Str) ){
      return true;
    }
    return false;
  }