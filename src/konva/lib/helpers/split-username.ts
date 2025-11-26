import { MAX } from '../../../app/config/consts';

interface IResult {
	firstName: string;
	secondName: string;
}

export function splitUsername(userName: string): IResult {
	const splittedUsername = userName.split(' ');
	let userNameArr: string[] = [];

	// Алексей Сороко Витальевич
	if (splittedUsername[0].length > MAX.userName.first) {
		userNameArr.push(splittedUsername[0].slice(0, MAX.userName.first) + '...');
	} else {
		userNameArr.push(splittedUsername[0]);
	}

	const secName = splittedUsername[1];
	if (secName) {
		if (secName.length > MAX.userName.second) {
			userNameArr.push(secName.slice(0, MAX.userName.second) + '...');
		} else {
			userNameArr.push(splittedUsername[1]);
		}
	}

	const firstName = userNameArr[0];
	const secondName = userNameArr[1];

	return {
		firstName,
		secondName,
	};
}
