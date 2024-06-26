import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { AuthGuard } from '@/components/useAuth';
import Logout from '@/components/ui/Logout';
import { useEffect } from 'react';
import PhoneVerification from '@/components/ui/PhoneVerification';
import { fetchHomePageData } from '@/components/redux/homePage/fetchHomePageData';
import { useAppDispatch } from '@/components/redux/store';
import checkAuth from '@/utils/checkAuth';
import EmailVerification from '@/components/ui/EmailVerification';


export function Home() {
    const dispatch = useAppDispatch();
    const { emailExists, phoneExists } = checkAuth();
    
    useEffect(() => {
        dispatch(fetchHomePageData());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {emailExists && !phoneExists && <PhoneVerification />}
            {phoneExists && !emailExists && <EmailVerification />}
            {phoneExists && emailExists && (
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href="https://nextjs.org">Next.js!</a>
                    </h1>

                    <p className={styles.description}>
                        Get started by editing{` `}
                        <code className={styles.code}>pages/index.js</code>
                    </p>

                    <p className={styles.description}>This is not an official starter!</p>

                    <div className={styles.grid}>
                        <a href="https://nextjs.org/docs" className={styles.card}>
                            <h3>Documentation &rarr;</h3>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href="https://nextjs.org/learn" className={styles.card}>
                            <h3>Learn &rarr;</h3>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className={styles.card}
                        >
                            <h3>Examples &rarr;</h3>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                            href="https://vercel.com/new?utm_source=typescript-nextjs-starter"
                            className={styles.card}
                        >
                            <h3>Deploy &rarr;</h3>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                        <a
                            href="https://vercel.com/docs/concepts/functions/serverless-functions"
                            className={styles.card}
                        >
                            <h3>Serverless Function &rarr;</h3>
                            <p>
                                Running code on-demand without needing to manage your own
                                infrastructure.
                            </p>
                        </a>
                        <a
                            href="https://vercel.com/docs/concepts/functions/edge-functions"
                            className={styles.card}
                        >
                            <h3>Edge Function &rarr;</h3>
                            <p>
                                Deliver dynamic, personalized content with the lightweight Edge
                                Runtime.
                            </p>
                        </a>
                        <Logout />
                    </div>
                </main>
            )}
        </div>
    );
}

const HomeWithAuthGuard = () => (
    <AuthGuard>
        <Home />
    </AuthGuard>
);

export default HomeWithAuthGuard;
