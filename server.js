
const Koa = require( 'koa' );
const bodyparse = require( 'koa-bodyparser' );

const myroute = require( './routes.js' );

const port = 5432;

function createServer() {
  let app = new Koa();
  app.keys = [ 'om', 'namah', 'shivaya', 'jay', 'gurumayi' ];
  
  app.on('error', ( err, ctx ) => {
    console.log(`Server Error: ${err}`);
    ctx.body = err;
  });
  app.use( bodyparse() );

  app.use( myroute.routes() );
  app.use( myroute.allowedMethods() );

  return app;
}


let app = createServer();
app.listen( port );
console.log( 'started on port', port );


