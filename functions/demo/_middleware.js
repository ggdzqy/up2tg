async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

function authentication(context) {
  const refer = context.request.headers.get('Referer');
  if (refer != "admin@example.com") {
    return new Response(refer, { status: 403 });
  }
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  console.log(env);
  console.log(params.code);
  
  return context.next();
}

export const onRequest = [errorHandling, authentication];
