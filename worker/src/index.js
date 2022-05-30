import {
  Router
} from 'itty-router'
import { customAlphabet  } from 'nanoid';
import { base64encode, base64decode } from 'nodejs-base64';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  6,
);

const router = Router()

router.get("/ipinfo", (request) => {
  const returnData = JSON.stringify(request.cf, null, 2);
  return new Response(returnData, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
})

router.post('/add', async (request) => {
  let data = {}
  let toStore = {}
  if (request.headers.get("Content-Type") === "application/json") {
    data = await request.json()
    toStore = { key : nanoid(), value : data.data }
  }
  // await BRAVO68WEB.put(toStore.key, base64encode(toStore.value))

  const returnData = JSON.stringify(data, null, 2);
  return new Response(returnData, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
})

router.all("*", () => new Response("404, not found!", {
  status: 404
}))

addEventListener('fetch', async (e) => {
  e.respondWith(router.handle(e.request, e))
})