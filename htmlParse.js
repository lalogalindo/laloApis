Element.prototype.setAttributes = function (attr) {
  var el = this
  for(var index in attr) {
    if( attr.hasOwnProperty( index ) )
      el.setAttribute( index, attr[index] )
  }
  return el
}

var htmlParse = function(type,options) {
    this.el = document.createElement( type )
    
    this.addContent = function(el) {
        if( typeof el === 'string' )
            this.el.textContent = el
        else if( typeof el === 'object' ) {
            if( el instanceof htmlParse )
                this.el.appendChild( el.getElement() )
            else
                this.el.appendChild( el )
        }
    }

    this.replaceContent = function(content) {
        if( typeof content === 'string' || typeof content === 'number' )
            this.el.textContent = content
        else if( typeof content === 'object' ) {
            if( content instanceof htmlParse )
                this.el.innerHTML = content.getContent()
            else
                this.el.innerHTML = content
        }        
    }

    this.prependContent = function(el) {
        if( typeof el === 'string' )
            this.el.textContent = el
        else if( typeof el === 'object' ) {
            if( el instanceof htmlParse )
                this.el.insertBefore( el.getElement(), this.el.childNodes[0] )
            else
                this.el.insertBefore( el, this.el.childNodes[0] )
        }
    }
    
    this.setOnClick = function(funct) {
        this.el.onclick = funct
    }

    this.getElement = function(){ 
        return this.el.cloneNode(true)
    }

    this.addClase = function(clase) {
        this.el.classList.add(clase)
    }

    this.setAttributes = function (el,attr) {
        for(var index in attr) {
            if( attr.hasOwnProperty( index ) ) {
                if( index === 'text' ) {
                    if( typeof attr[index] === 'object' ){
                        el.appendChild( attr )
                    } else
                        el.textContent = attr[index]
                } else
                    el.setAttribute( index, attr[index] )
            }
        }
        return el
    }

    if( type === "form" ) {
        this.input = function(opciones) {
            this.addContent( new htmlParse( 'input', opciones ) )
        }

        this.select = function(opciones) {
            this.addContent( new htmlParse( 'select',opciones ) )
        }
    }

    if( type === "select" ) {
        this.option = function(attr){
            var opcion = new htmlParse('option',attr)
            this.addContent( opcion )
        }

        this.toForm = function( idForm ) {
            this.el.form = idForm
            return this
        }
    }

    if( type === 'img' ) {
        this.src = function(src) {
            this.el.src = src
            this.el.onError = function(err){
                console.log('<== src inválido ==>')
            }
        }
    }

    if( type === 'ul' ) {
        this.li = function(el,attr) {
            var li = new htmlParse('li',attr)
            if( typeof el === 'undefined' ) {
                this.el.appendChild( li.getElement() )
            } else {
                li.addContent( el,attr )
            }
        }
    }

    if( typeof options === 'object' ) {
        this.setAttributes(this.el,options)
    } else if( typeof options === 'string' ) 
        this.el.textContent = options
}

var select = function(elemento) {

}