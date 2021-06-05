const jsonServer = require('json-server')
const auth = require('json-server-auth')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
 
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp("Hello there!")
  })

server.use((req, res, next) => {
    if (isAuthorized(req)) { // add your authorization logic here
        next() // continue to JSON Server router
    } else {
        res.sendStatus(401)
    }
});

const rules = auth.rewriter({
    // Permission rules
    //users: 600,
    tasks: 660,
  })

server.db = router.db;

server.use(rules)
server.use(auth)
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running')
})

function isAuthorized(req) {
    return true;
}
