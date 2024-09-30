export function debounce(
	func: (...args: any[]) => void,
	delay: number
): (...args: any[]) => void {
	let timeoutId: number
	return function (...args: any[]) {
		clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => func(...args), delay)
	}
}

export function checkRecursivelyValues(
	obj: any,
	lowerCaseTerm: string
): boolean {
	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			if (checkRecursivelyValues(obj[key], lowerCaseTerm)) {
				return true
			}
		} else if (
			typeof obj[key] === 'string' &&
			obj[key].toLowerCase().includes(lowerCaseTerm)
		) {
			return true
		}
	}
	return false
}
