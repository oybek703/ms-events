import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function Search() {
	const [term, setTerm] = useState<string>('')
	const { push } = useRouter()

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (term) {
			await push(`/events/search?term=${term}`)
			setTerm('')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="my-3 my-md-1">
			<input
				value={term}
				placeholder="Search..."
				className="form-control py-1 px-2"
				onChange={event => setTerm(event.target.value)}
				type="text"
			/>
		</form>
	)
}
