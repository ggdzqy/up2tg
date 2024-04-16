
const newHomepagePathName = "/g"

export function onRequest(context) {
  const url = new URL(context.request.url);
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
  console.log(JSON.stringify(context.params.date));
  //return new Response(JSON.stringify(context.params.date));

  url.pathname = newHomepagePathName;
  return context.env.ASSETS.fetch(url)
  const asset = context.env.ASSETS.fetch(url);
  let response = new Response(asset.body, asset);
    //   response.headers.append("Set-Cookie", `${cookieName}=${version}; path=/`)

  return response;
}
