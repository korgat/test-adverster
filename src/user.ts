interface Geo {
	lat: string
	lng: string
}

interface Address {
	street: string
	suite: string
	city: string
	zipcode: string
	geo: Geo
}

interface Company {
	name: string
	catchPhrase: string
	bs: string
}

interface User {
	id: number
	name: string
	username: string
	email: string
	phone: string
	website: string
	address: Address
	company: Company
}

class User {
	constructor(
		public id: number,
		public name: string,
		public username: string,
		public email: string,
		public phone: string,
		public website: string,
		public address: Address,
		public company: Company
	) {}

	private highlightText(text: string, searchTerm: string): string {
		if (!searchTerm) return text
		const regex = new RegExp(`(${searchTerm})`, 'gi')
		return text.replace(regex, '<span class="highlight">$1</span>')
	}

	createUserCard(searchTerm: string = ''): HTMLElement {
		const card = document.createElement('div')
		card.className = 'card'

		const highlightedName = this.highlightText(this.name, searchTerm)
		const highlightedUsername = this.highlightText(this.username, searchTerm)
		const highlightedEmail = this.highlightText(this.email, searchTerm)
		const highlightedPhone = this.highlightText(this.phone, searchTerm)
		const highlightedWebsite = this.highlightText(this.website, searchTerm)
		const highlightedStreet = this.highlightText(
			this.address.street,
			searchTerm
		)
		const highlightedSuite = this.highlightText(this.address.suite, searchTerm)
		const highlightedCity = this.highlightText(this.address.city, searchTerm)
		const highlightedZipcode = this.highlightText(
			this.address.zipcode,
			searchTerm
		)
		const highlightedGeoLat = this.highlightText(
			this.address.geo.lat,
			searchTerm
		)
		const highlightedGeoLng = this.highlightText(
			this.address.geo.lng,
			searchTerm
		)
		const highlightedCompanyName = this.highlightText(
			this.company.name,
			searchTerm
		)
		const highlightedCatchPhrase = this.highlightText(
			this.company.catchPhrase,
			searchTerm
		)
		const highlightedBS = this.highlightText(this.company.bs, searchTerm)

		card.innerHTML = `
						<h2>${highlightedName}</h2>
						<p><strong>Username:</strong> ${highlightedUsername}</p>
						<p><strong>Email:</strong> ${highlightedEmail}</p>
						<p><strong>Phone:</strong> ${highlightedPhone}</p>
						<p><strong>Website:</strong> <a href="https://${highlightedWebsite}" target="_blank">${highlightedWebsite}</a></p>
						<div class="address">
										<h3>Address:</h3>
										<p><strong>Street:</strong> ${highlightedStreet}</p>
										<p><strong>Suite:</strong> ${highlightedSuite}</p>
										<p><strong>City:</strong> ${highlightedCity}</p>
										<p><strong>Zipcode:</strong> ${highlightedZipcode}</p>
										<p><strong>Geo:</strong> (${highlightedGeoLat}, ${highlightedGeoLng})</p>
						</div>
						<div class="company">
										<h3>Company:</h3>
										<p><strong>Name:</strong> ${highlightedCompanyName}</p>
										<p><strong>Catch Phrase:</strong> ${highlightedCatchPhrase}</p>
										<p><strong>BS:</strong> ${highlightedBS}</p>
						</div>
		`

		return card
	}
}

export { User }
