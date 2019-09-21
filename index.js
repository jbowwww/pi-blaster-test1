const piblaster = require('@jbowwww/pi-blaster.js');
const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms)); //require('p-delay');		

(async function main() {
try {
	piblaster.setPwm(17, 0.7);
	piblaster.setPwm(27, 0.7);
	piblaster.setPwm(22, 0.7);



	let p = 0, dir = 0;	
	while(1) {
	await delay(1000);

	for (; p <= 1 && p >= 0; p += (dir === 0 ? +0.05 : -0.05)) {
		piblaster.setPwm(27, p);
	}

	await delay(1000);
	if (p >= 0.945) {
		dir = 1;
		p = 1;
	} else {
		dir = 0;
		p = 0;
	}
	console.log(`p = ${p} , going ${dir === 1 ? 'down' : 'up'}`);
}

	piblaster.setPwm(17, 0);
	piblaster.setPwm(27, 0);
	piblaster.setPwm(22, 0);
} catch (err) {
	console.error(`error: ${err.stack||err}`)		;
}
})();
