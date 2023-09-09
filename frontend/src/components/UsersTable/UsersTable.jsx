import axios from 'axios'
import { API_URL } from '@/config/environment'
import styles from './userstable.module.css'
import { format } from 'date-fns'

async function getUsers(accessToken) {
	const response = await axios.get(`${API_URL}/users`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	const data = await response.data
	return data
}

async function UsersTable({ accessToken }) {
	const users = await getUsers(accessToken)
	return (
		<>
			{
				<table className={styles.table}>
					<thead>
						<tr>
							<th>#</th>
							<th>Nombre</th>
							<th>Email</th>
							<th>Teléfono</th>
							<th>Biografía</th>
							<th>Género</th>
							<th>Rol</th>
							<th>Fecha de registro</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.phoneNumber}</td>
								<td>{user.biography}</td>
								<td>{user.gender}</td>
								<td>{user.role.name}</td>
								<td>{format(new Date(user.createdAt), 'dd MMM yyyy')}</td>
							</tr>
						))}
					</tbody>
				</table>
			}
		</>
	)
}

export default UsersTable
