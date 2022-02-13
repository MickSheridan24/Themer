const hexToHSL = (hex: string) : Hsl =>{
	let r = 0, g = 0, b = 0;
	hex = hex.slice(1);

	r = parseInt("0x" + hex.slice(0, 2), 16);
	g = parseInt("0x" + hex.slice(2, 4), 16);
	b = parseInt("0x" + hex.slice(4, 6), 16);
	
	r /= 255;
	g /= 255;
	b /= 255;

	let cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
  
	if (delta === 0)
	 {h = 0;}
	else if (cmax === r)
	 {h = ((g - b) / delta) % 6;}
	else if (cmax === g)
	 {h = (b - r) / delta + 2;}
	else
	 {h = (r - g) / delta + 4;}
  
	h = Math.round(h * 60);
  
	if (h < 0)
	 {h += 360;}
  
	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
  
	return {h: h, s: s, l: l};
 };

 function hslToHex(hsl: Hsl) {
	let {h, s, l} = hsl;
	h /= 360;
	s /= 100;
	l /= 100;
	let r, g, b;
	if (s === 0) {
	  r = g = b = l; // achromatic
	} else {
	  const hue2rgb = (p:number, q: number, t: number) => {
		if (t < 0) {t += 1;}
		if (t > 1) {t -= 1;}
		if (t < 1 / 6) {return p + (q - p) * 6 * t;}
		if (t < 1 / 2) {return q;}
		if (t < 2 / 3) {return p + (q - p) * (2 / 3 - t) * 6;}
		return p;
	  };
	  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	  const p = 2 * l - q;
	  r = hue2rgb(p, q, h + 1 / 3);
	  g = hue2rgb(p, q, h);
	  b = hue2rgb(p, q, h - 1 / 3);
	}
	const toHex = (x:number) => {
	  const hex = Math.round(x * 255).toString(16);
	  return hex.length === 1 ? '0' + hex : hex;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
interface Hsl {
	h: number, 
	s: number,
	l: number
}

class Color{

	base!: string;
	compliment!: string; 
	splitCompliments!: {first: string, second: string};
	triadics!: {first: string, second: string};
	tetradics!: {first: string, second: string, third: string};
	analogous!: {first: string, second: string};
	

	constructor(hexString: string) {
		this.base = hexString;
		this.compliment = this.calcCompliment();
		this.splitCompliments = this.calcSplitComplements();
		this.triadics = this.calcTriadicComplements();
		this.tetradics = this.calcTetradicComplements();
		this.analogous = this.calcAnalagousComplements();
	}

	static fromHSL(hsl: Hsl){
		return new Color(hslToHex(hsl));
	}

	asHsl(){
		return hexToHSL(this.base);
	}
	
	randomAspect(){
		var options = [this.base, this.compliment, this.splitCompliments.first, this.splitCompliments.second,
		this.triadics.first, this.triadics.second, this.tetradics.first, this.tetradics.second, this.tetradics.third,
		this.analogous.first, this.analogous.second];

		return options[Math.floor(Math.random() * options.length)];
	}


	private calcCompliment(){
		var hsl = this.asHsl();
		var compliment = {...hsl};
		compliment.h = (compliment.h + 180) % 360;
		return hslToHex(compliment);
	}

	private calcSplitComplements(){
		var hsl = this.asHsl();
		var compliment1 = {...hsl};
		var compliment2 = {...hsl};

		compliment1.h =(compliment1.h + 150) % 360;
		compliment2.h =(compliment2.h + 210) % 360;

		return {first: hslToHex(compliment1), second: hslToHex(compliment2)};
	}

	private calcTriadicComplements(){
		var hsl = this.asHsl();
		var compliment1 = {...hsl};
		var compliment2 = {...hsl};

		compliment1.h =(compliment1.h + 120) % 360;
		compliment2.h =(compliment2.h + 240) % 360;

		return {first: hslToHex(compliment1), second: hslToHex(compliment2)};
	}

	private calcTetradicComplements(){
		var hsl = this.asHsl();
		var compliment1 = {...hsl};
		var compliment2 = {...hsl};
		var compliment3 = {...hsl};

		compliment1.h =(compliment1.h + 90) % 360;
		compliment2.h =(compliment2.h + 180) % 360;
		compliment3.h =(compliment2.h + 270) % 360;

		return {first: hslToHex(compliment1), second: hslToHex(compliment2), third: hslToHex(compliment3)};
	}


	private calcAnalagousComplements(){
		var hsl = this.asHsl();
		var compliment1 = {...hsl};
		var compliment2 = {...hsl};
		var compliment3 = {...hsl};

		compliment1.h =(compliment1.h + 30) % 360;
		compliment2.h =(compliment2.h + 60) % 360;
		compliment3.h =(compliment2.h + 90) % 360;



		return {first: hslToHex(compliment1), second: hslToHex(compliment2), third: hslToHex(compliment3)};
	}

}
export default Color;
