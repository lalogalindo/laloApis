
	var cadena = $('#jamon').val(),str = []
	cadena = cadena.replace(/\n{2,}/g, '\n');
	String.prototype.capitalizeFirstLetter = function() {
		if( this.charAt(0) == ' ' || this.charAt(0).match(/\n/) != null )
			return this.charAt(0) + this.slice(1).capitalizeFirstLetter()
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	arreglo = cadena.split('.')
	for (var i = 0; i < arreglo.length; i++) {
		var str = arreglo[i].split('\n')
		for (var j = 0; j < str.length; j++) {
			str[j] = str[j].capitalizeFirstLetter()
		}
		arreglo[i] = str.join('\n')
		// arreglo[i] = arreglo[i].capitalizeFirstLetter()
	}
	arreglo = arreglo.join('.')