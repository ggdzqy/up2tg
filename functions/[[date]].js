const newHomepagePathName = "/test"

export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;
  //get the request url
  const url = new URL(request.url);
  if (context.params.date){
    console.log(JSON.stringify(context.params.date));
    //return new Response(JSON.stringify(context.params.date));
    //return Response.redirect(url.origin+"/_index.html", 302)
    // pass the request to /test
    url.pathname = newHomepagePathName
    return context.env.ASSETS.fetch(url)
  }
  else{
    //redirect to index page
    return Response.redirect(url.origin+"/_index.html", 302)
  }
}