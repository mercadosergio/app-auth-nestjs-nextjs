import styles from './auth-template.module.css';

function AuthTemplate({ children }) {
    return (
        <main className={styles.theme}>
            <section className={styles.backGround}>
                    {children}
            </section>
        </main>
    )
}

export default AuthTemplate