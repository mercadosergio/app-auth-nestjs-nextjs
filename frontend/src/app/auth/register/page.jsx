import styles from './register.module.css'
import Image from 'next/image';
import AuthTemplate from '@/components/AuthTemplate/AuthTemplate'
import Logo from './../../../../public/logo-smartinfo.svg';
import MultiStepForm from '@/components/Steps/MultiStepForm';

function Register() {
    return (
        <AuthTemplate>
            <div className={styles.formSpace}>
                <Image className={styles.logo} src={Logo} width={130} alt='Logo smart info' />
                <MultiStepForm />
            </div >
        </AuthTemplate >
    )
}

export default Register
