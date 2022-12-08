import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Container from '@mui/material/Container';
// import { query } from 'faunadb';

export function ActionDetails({action}) {
    // if (actionType) {

    // }
    return <Container>{action}</Container>
}

export default class CountItAction extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            actionType: null
        }

        this.handleActionChange = this.handleActionChange.bind(this)
    }

    static actionOptions = [
        {
            type: "watch",
            label: "Watch"
        },
        {
            type: "still_watching",
            label: "Still Watching"
        },
        {
            type: "stay_informed",
            label: "Stay Informed"
        },
        {
            type: "attend",
            label: "Attend"
        },
        {
            type: "refer",
            label: "Refer"
        },
        {
            type: "gear",
            label: "Gear"
        }
    ]

    /**
     * 
     * @param {*} event 
     */
    handleActionChange(event) {

        const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;

        this.setState({
            actionType: target.value
        })
    }

    /**
     * 
     * @returns 
     */
    render() {

        return (
            <div className={styles.container}>
                <Head>
                    <title>CountIt</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Container>
                    <main className={styles.main}>
                        <h1 className={styles.title}>Count It - Track my Action</h1>
                        <select>
                            {actionOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <ActionDetails action={actionType}></ActionDetails>
                    </main>
                </Container>
            </div>
        )
    }
}

//await async?
export function getServerSideProps({query}) {
    console.log('action========== static props')
    query.action

    // return { props: { data } }
}