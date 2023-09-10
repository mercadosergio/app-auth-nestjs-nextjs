import styles from './steps.module.css'

function StepOne({ formData, setFormData }) {
	const handleEmail = (event) => {
		setFormData({ ...formData, email: event.target.value })
	}

	const handlePassword = (event) => {
		setFormData({ ...formData, password: event.target.value })
	}

	const handleConfirmPassword = (event) => {
		setFormData({ ...formData, confirmPassword: event.target.value })
	}

	return (
		<div>
			<div className={styles.formField}>
				<label>Email:</label>
				<input
					onChange={handleEmail}
					value={formData.email}
					className=''
					placeholder=''
					type='text'
				/>
			</div>
			<div className={styles.formField}>
				<label>Contraseña:</label>
				<input
					onChange={handlePassword}
					value={formData.password}
					className=''
					placeholder=''
					type='password'
				/>
			</div>
			<div className={styles.formField}>
				<label>Confirmar contraseña:</label>
				<input
					onChange={handleConfirmPassword}
					value={formData.confirmPassword}
					className=''
					placeholder=''
					type='password'
				/>
			</div>
		</div>
	)
}

export default StepOne
