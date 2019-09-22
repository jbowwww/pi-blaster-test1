const piblaster = require('pi-blaster.js');
const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms)); //require('p-delay');		

(async function main() {
	try {
		piblaster.setPwm(17, 0.7);
		piblaster.setPwm(27, 0.7);
		piblaster.setPwm(22, 0.7);
		let i = 0, pArr = [0, 0, 0], dir = 0;
		while(1) {
			let p = pArr[i];
			while(p <= 1 && p >= 0) {
				p += (dir === 0 ? +0.05 : -0.05);
				piblaster.setPwm([17, 22, 27][i], p);
				delay(4);	
			}
			pArr[i] = p;
			i = ++i % 3;
			await delay(200);
			if (pArr[i] >= 0.945) {
				dir = 1;
				pArr[i] = 1;
			} else {
				dir = 0;
				pArr[i] = 0;
			}
			console.log(`i = ${i} p = ${p} , pArr=${pArr} going ${dir === 1 ? 'down' : 'up'}`);
		}
		piblaster.setPwm(17, 0);
		piblaster.setPwm(27, 0);
		piblaster.setPwm(22, 0);
	} catch (err) {
		console.error(`error: ${err.stack||err}`);
	}
})();
