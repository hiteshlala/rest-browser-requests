const Router = require( 'koa-router' );
const fs = require( 'fs' );

let dummydata = [
  {
    name: 'jane doe',
    job: 'software engineer'
  },
  {
    name: 'john doe',
    job: 'house keeper'
  },
  {
    name: 'donald trump',
    job: 'traitor'
  }
];

const index = fs.readFileSync( 'index.html', 'utf8' );

let base = new Router();

base.get( '/', ctx => {
  console.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  const accept = ctx.headers.accept;
    ctx.status = 200;
    if ( accept.indexOf('html') > -1 ) {
      ctx.body = index.replace("'___DATA___'", JSON.stringify( dummydata) );
    }
    else {
      ctx.body = dummydata;
    }
});

base.post( '/', ctx => {
  console.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  let data = ctx.request.body;
  if ( data.name && data.job ) {
    console.log( 'New Record:', data );
    dummydata.push( data );
    ctx.status = 200;
  }
  else {
    console.log( 'Error New Record Invalid:', data );
    ctx.status = 400;
  }
  ctx.body = dummydata;
});

base.patch( '/', ctx => {
  console.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  let data = ctx.request.body;
  if ( data.id && ( data.name || data.job ) ) {
    console.log( 'Modify Record:', data );
    let i = parseInt( data.id );
    if ( data.name ) dummydata[i].name = data.name;
    if ( data.job ) dummydata[i].job = data.job;
    ctx.status = 200;
  }
  else {
    console.log( 'Record Data Invalid:', data );
    ctx.status = 400;
  }
  ctx.body = dummydata
});

base.put( '/', ctx => {
  console.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  let data = ctx.request.body;
  if ( data.id ) {
    console.log( 'Modify Entire Record:', data );
    let i = parseInt( data.id );
    if ( i < dummydata.length ) {
      dummydata[i].name = data.name || '';
      dummydata[i].job = data.job || '';
    }
    else {
      dummydata.push({ name: data.name, job: data.job } );
    }
    ctx.status = 200;
  }
  else {
    console.log( 'Record Data Invalid:', data );
    ctx.status = 400;
  }
  ctx.body = dummydata
});

base.delete( '/', ctx => {
  console.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  let data = ctx.request.body;
  if ( data.id ) {
    console.log( 'Delete Record - ID:', data.id );
    let i = parseInt( data.id );
    dummydata = dummydata.slice( 0, i ).concat( dummydata.slice( i + 1) )
    ctx.status = 200;
  }
  else {
    console.log( 'Delete Record ID Invalid:', data );
    ctx.status = 400;
  }
  ctx.body = dummydata
});


module.exports = base;
