import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script>0</script>
          {/* https://github.com/vercel/next.js/issues/15642#issuecomment-710747889 */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
