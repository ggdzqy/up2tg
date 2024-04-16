async function errorHandling(context) {
    try {
      return await context.next();
    } catch (err) {
      return new Response(`${err.message}\n${err.stack}`, { status: 500 });
    }
  }
  
  export async function authentication(context) {
    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;
    context.request;
    const url = new URL(request.url);
    console.log(' -----------------------')
    console.log('onRequestPost url:', url)
    console.log(' -----------------------')
    return new Response('You need to login.', {
      status: 401,
      headers: {
      // Prompts the user for credentials.
      'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
      },
  });
  
    return context.next();
}

export const onRequest = [errorHandling, authentication];
