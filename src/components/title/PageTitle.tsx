import styles from './PageTitle.module.css'

interface PageTitleProps {
    title: string
}

const PageTitle: React.FC<PageTitleProps> = ({
    title
}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
        </div>
    )
}

export default PageTitle