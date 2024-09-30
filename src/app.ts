import { checkRecursivelyValues, debounce } from './helpers'
import { User } from './user'

class App {
	users: User[] = []
	filteredUsers: User[] = []
	userContainer = document.getElementById('user-cards')!
	searchInput = document.getElementById('search-input')! as HTMLInputElement

	constructor() {
		this.initialize()
	}

	async fetchUsers(): Promise<void> {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/users')
			const data = await response.json()

			this.users = data.map(
				(user: any) =>
					new User(
						user.id,
						user.name,
						user.username,
						user.email,
						user.phone,
						user.website,
						user.address,
						user.company
					)
			)
			this.filteredUsers = this.users
			this.renderUsers()
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	renderUsers(): void {
		this.userContainer.innerHTML = ''
		this.filteredUsers.forEach(user => {
			const userCard = user.createUserCard(this.searchInput.value)
			this.userContainer.appendChild(userCard)
		})
	}

	filterUsers(searchTerm: string): void {
		const lowerCaseTerm = searchTerm.toLowerCase()

		this.filteredUsers = this.users.filter(user =>
			checkRecursivelyValues(user, lowerCaseTerm)
		)
		this.renderUsers()
	}

	initialize(): void {
		this.fetchUsers()

		const debouncedFilterUsers = debounce(() => {
			this.filterUsers(this.searchInput.value)
		}, 500)

		this.searchInput.addEventListener('input', debouncedFilterUsers)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new App()
})
