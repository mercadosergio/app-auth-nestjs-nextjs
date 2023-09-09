import { useState } from 'react'
import styles from './steps.module.css'

function StepOne({ formData, setFormData }) {
	const handleEmail = async (event) => {
		await setFormData({ ...formData, email: event.target.value })
	}

	const handlePassword = async (event) => {
		await setFormData({ ...formData, password: event.target.value })
	}

	const handleConfirmPassword = async (event) => {
		await setFormData({ ...formData, confirmPassword: event.target.value })
	}

	return (
		<div>
			<div className={styles.formField}>
				<label>Email:</label>
				<input onChange={handleEmail} className='' placeholder='' type='text' />
			</div>
			<div className={styles.formField}>
				<label>Contraseña:</label>
				<input
					onChange={handlePassword}
					className=''
					placeholder=''
					type='password'
				/>
			</div>
			<div className={styles.formField}>
				<label>Confirmar contraseña:</label>
				<input
					onChange={handleConfirmPassword}
					className=''
					placeholder=''
					type='password'
				/>
			</div>
		</div>
	)
}

export default StepOne
