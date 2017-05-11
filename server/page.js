import serialize from 'serialize-javascript'

export default ({store, head = '', html = ''})=> {
    return (`
        <!DOCTYPE html>
        
        <body>
            <div id='root'>${html}</div>
            <script charSet="UTF-8">window.__data=${serialize(store.getState())}</script>
            <script src="/public/bundle.js"></script>
        </body>
        </html>
`)
}