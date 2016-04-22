/**
 * Objeto que controla llenado, vaciado y paginado de una tabla.
 * @param {selector} selectorTabla => Selector de la tabla.
 */
function TablaDinamica(selectorTabla)
	var TablaDinamica
	if( !selectorTabla )
		throw new Error('-> "selectorTabla" not defined')
	TablaDinamica = document.querySelector(selectorTabla)
	if( !TablaDinamica )
		throw new Error('-> "Tabla" not found')

	Object.defineProperties(this,{
		/**
		 * Obtiene el cuerpo de la tabla.
		 * @type {Method}
		 * @returns {HTMLTableSectionElement} => Etiqueta <tbody>
		 * @author Eduardo Galindo Franco <egalindo@jobomas.com>
		 */
		getBody: {
			value: function() {
				var body = TablaDinamica.querySelector('tbody')
				if( body ){
					this.body = body
					return body
				} else
					throw new Error('-> "tbody" not found')
			},
		},
		/**
		 * Elimina todos los datos dentro del cuerpo de la tabla
		 * @type {Method}
		 * @author Eduardo Galindo Franco <egalindo@jobomas.com>
		 */
		clearBody: {
			value: function() {
				if( !this.body )
					this.getBody()
				while(this.body.children.length > 0) {
					this.body.removeChild(this.body.firstChild)
				}
			}
		},
		setAttributes: {
			value: function(obj,attr) {
				debugger
				for (var data in attr) {
					if (attr.hasOwnProperty(data)) {
						if( typeof attr.data == 'object' ) {
							this.setAttributes(obj,attr.data)
						} else {
							obj.setAttribute(data,attr.data)
						}
					}
				}
			}
		},
		/**
		 * Agrega una fila extra al cuerpo de la tabla.
		 * @param {array} items       => Es un arreglo con los valores a insertar.
		 * @param {object} attributes => Es un objeto con los atributos de la fila.
		 * @type {Method}
		 * @author Eduardo Galindo Franco <egalindo@jobomas.com>
		 */
		addRow: {
			value: function(item) {
				debugger
				var tr = document.createElement('tr')
				if( !item )
					throw new Error("Can't create empty Row, try with method 'addEmptyRow'")
				else {
					debugger
					for (var i = 0; i < item.data.length; i++) {
						var data = item.data[i]
						if( data.attributes ) {
							if( data.attributes.constructor.name === 'Object' ) {
								for( var key in data.attributes ) {
									if( data.attributes.hasOwnProperty(key) ) {
										tr.setAttribute(key,data.attributes.key)
									}
								}
							} else if( attributes === 'String' ) {
								tr.setAttributeNode( document.createAttributeNode( attributes ) )
							} else {
								throw new Error('-> "attributes" is ' + attributes.constructor.name)
							}
						}
					}
				}
			}
		},
		/**
		 * Agrega n filas al cuerpo de la tabla.
		 * @type {Method}
		 */
		addRows: {
			value: function(items) {
				debugger
				if( items.constructor.name === 'Array' ) {
					console.time('-> Init for Cycle ::addRows')
					for (var i = 0; i < items.length; i++) {
						this.addRow(items[i])
						console.log( '-> Added row ',i+1 )
					}
					console.timeEnd('-> Init for Cycle ::addRows')
				}
			}
		},
		addData: {
			value: function(attributes) {
				var td = document.createElement('td')
				for(key in attributes) {
					if( attributes.hasOwnProperty(key) ) {
						if( key !== 'data' ) {
							td.setAttribute( key, attributes.key )
						} else {
							td.appendChild( this.generateTableData( attributes.key ) )
						}
					}
				}
			}
		},
		createTableData: {
			value: function(data) {
				var p = document.createElement('p')
				p.textContent = data
				return p
			},
			writable: true,
			configurable: true
		}
	})
}
