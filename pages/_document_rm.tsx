import Document, { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <div className="grid-container">
                        <header>
                            <Link href="/">React Shopping Cart</Link><br/>
                            <Link href="/about"><a>About</a></Link>
                        </header>
                        <main>
                            <Main />
                            <NextScript />
                        </main>
                        <footer>
                            All right reserved
                        </footer>
                    </div>
                </body>
            </Html>

        )
    }
}

export default MyDocument;