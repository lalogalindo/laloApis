/**
 * Objeto que controla llenado, vaciado y paginado de una tabla.
 * @param {CSS Selector} selectorTabla => Selector de la tabla.
 * @author Eduardo Galindo Franco <lalogalindo@gmail.com>
 */
function TablaDinamica(selectorTabla) {
	var TablaDinamica,tableBody
	if( !selectorTabla )
		throw new Error('-> Must provide selector as parameter')
	TablaDinamica = document.querySelector(selectorTabla)
	if( !TablaDinamica )
		throw new Error('-> Table "'+selectorTabla+'" not found')

	/**
	 * Elimina todos los datos dentro del cuerpo de la tabla
	 * @type {Method}
	 * @author Eduardo Galindo Franco <lalogalindo@gmail.com>
	 */
	function clearBody() {
		var body = getBody()
		while(body.children.length > 0) {
			body.removeChild(body.firstChild)
		}
	}

	/**
	 * Obtiene el cuerpo de la tabla.
	 * @type {Method}
	 * @returns {HTMLTableSectionElement} => Etiqueta <tbody>
	 * @author Eduardo Galindo Franco <lalogalindo@gmail.com>
	 */
	function getBody() {
		if( !tableBody ){
			var body = TablaDinamica.querySelector('tbody')
			if( body )
				tableBody = body
			else
				throw new Error('-> "tbody" not found')
		}
		return tableBody
	}

	Object.defineProperties(this,{
		getBody: {
			value: function(){
				return getBody()
			}
		},
		/**
		 * Crea atributos para el objeto asignado
		 * @param {Object} obj  => Objeto al cual se asignarán los atributos
		 * @param {Object} attr => Objeto con los atributos a asignar
		 */
		setAttributes: {
			value: function(obj,attr) {
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
		 * @author Eduardo Galindo Franco <lalogalindo@gmail.com>
		 */
		addRow: {
			value: function(item) {
				var tr = document.createElement('tr'),
				that = this
				if( !item )
					throw new Error("Can't create empty Row, try with method 'addEmptyRow'")
				else {
					if( item.attributes ) {
						if( item.attributes.constructor.name === 'Object' ) {
							for( var key in item.attributes ) {
								if( item.attributes.hasOwnProperty(key) ) {
									tr.setAttribute(key,item.attributes[key])
								}
							}
						} else if( attributes === 'String' ) {
							tr.setAttributeNode( document.createAttributeNode( attributes ) )
						} else {
							throw new Error('-> "attributes" is ' + attributes.constructor.name)
						}
					}
					for (var i = 0; i < item.items.length; i++) {
						var data = item.items[i]
						tr.appendChild( that.addData(data) )
					}

					try {
						that.getBody().appendChild(tr)
					} catch(e) {
						var message = '-> Stack from "addRows" -> ' + e.message
						throw new Error( message )
					}
				}
			}
		},
		/**
		 * Agrega n filas al cuerpo de la tabla.
		 * @type {Method}
		 */
		addRows: {
			value: function(items,overwrite) {
				var that = this,
				overwrite = overwrite || false
				if( overwrite )
					clearBody()
				Array.prototype.forEach.call(items,function(item){
					console.time('-> Init for Cycle ::addRows')
					that.addRow(item)
					console.log( '-> Added row ',i+1 )
					console.timeEnd('-> Init for Cycle ::addRows')
				})
			}
		},
		addData: {
			value: function(item) {
				var td = document.createElement('td')
				if( item.attributes ) {
					for(key in item.attributes) {
						if( item.attributes.hasOwnProperty(key) ) {
							if( key !== 'data' ) {
								td.setAttribute( key, item.attributes[key] )
							} else {
								console.log('jamon')
							}
						}
					}
				}
				if( !item.item ) {
					throw new Error("-> 'Item' ")
				}
				td.appendChild( this.generateTableData( item.item ) )
				return td
			}
		},
		generateTableData: {
			value: function(data) {
				var p = document.createElement('p')
				//if( typeof data === 'String' || typeof data === 'Number')
					p.textContent = data
				return p
			},
			writable: true,
			configurable: true
		}
	})
}