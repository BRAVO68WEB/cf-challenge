import {
  Router
} from 'itty-router'
import {
  customAlphabet
} from 'nanoid';

import CryptoJS from 'crypto-js';

const reqHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
);

const router = Router()

router.get("/ipinfo", (request) => {
  const returnData = JSON.stringify(request.cf, null, 2);
  return new Response(returnData, {
    headers: reqHeaders
  })
})

router.post('/add', async (request) => {
  let data = {}
  let toStore = {}
  if (request.headers.get("Content-Type") === "application/json") {
    data = await request.json()
    toStore = {
      key: nanoid(),
      value: data.data,
      password: data.password
    }
  }
  var encrypted = ""

  if(toStore.password){
    encrypted = CryptoJS.AES.encrypt(toStore.value, toStore.password);
    // var decrypted = CryptoJS.AES.decrypt(encrypted, toStore.password);
  }
  else{
    encrypted = CryptoJS.AES.encrypt(toStore.value, "SecretPassphrase");
    // var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
  }

  // console.log(decrypted.toString(CryptoJS.enc.Utf8));

  // console.log(atob(t))
  // data.data = base64encode(data.data)

  await BRAVO68WEB.put(toStore.key,encrypted.toString())

  const returnData = JSON.stringify(data, null, 2);
  return new Response(returnData, {
    headers: reqHeaders
  })
})

router.post('/fetch', async (request) => {
  let data = {}
  let toFetch = {}
  if (request.headers.get("Content-Type") === "application/json") {
    data = await request.json()
    toFetch = {
      key: data.key,
      password: data.ppassword
    }
  }
  var decrypted = ""

  await BRAVO68WEB.get(toFetch.key)

  if(toFetch.password){
    // encrypted = CryptoJS.AES.encrypt(toFetch.value, toFetch.password);
    decrypted = CryptoJS.AES.decrypt(toFetch.value, toFetch.password);
  }
  else{
    // encrypted = CryptoJS.AES.encrypt(toFetch.value, "SecretPassphrase");
    decrypted = CryptoJS.AES.decrypt(toFetch.value, "Secret Passphrase");
  }

  // console.log(decrypted.toString(CryptoJS.enc.Utf8));

  // console.log(atob(t))
  // data.data = base64encode(data.data)

  

  const returnData = JSON.stringify(data, null, 2);
  return new Response(returnData, {
    headers: reqHeaders
  })
})

router.all("*", () => new Response("404, not found!", {
  status: 404
}))

addEventListener('fetch', async (e) => {
  e.respondWith(router.handle(e.request, e))
})