import {
  Router
} from 'itty-router'
import {
  customAlphabet
} from 'nanoid';

import CryptoJS from 'crypto-js';
import { handleCors, wrapCorsHeader } from './corsHelper'

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
  try {
    let data = {}
    let toStore = {}
    if (request.headers.get("Content-Type") === "application/json") {
      data = await request.json()
      toStore = {
        key: nanoid(),
        value: data.data,
        password: data.password,
        readOnce: data.readOnce || false,
      }
      if (toStore.readOnce) {
        toStore.key = "rO-" + toStore.key
      }
    }
    var encrypted = ""

    if (toStore.password) {
      encrypted = CryptoJS.AES.encrypt(toStore.value, toStore.password);
    } else {
      encrypted = CryptoJS.AES.encrypt(toStore.value, "SecretPassphrase");
    }

    await BRAVO68WEB.put(toStore.key, encrypted.toString())

    const returnData = JSON.stringify(toStore, null, 2);
    return new Response(returnData, {
      headers: reqHeaders
    })
  } catch (err) {
    console.log(err)
    return new Response("Error", {
      headers: reqHeaders
    })
  }
})

router.options('/add', handleCors({ methods: 'POST', maxAge: 86400 }))

router.post('/fetch', async (request) => {

  try {
    let data = {}
    let toFetch = {}
    if (request.headers.get("Content-Type") === "application/json") {
      data = await request.json()
      toFetch = {
        key: data.key,
        password: data.password
      }
    }
    
    var decrypted = ""

    var dataFromCF = await BRAVO68WEB.get(toFetch.key)
    if (!dataFromCF){
      throw new Error("Key not found") 
    }

    if (toFetch.password !== undefined) {
      decrypted = CryptoJS.AES.decrypt(dataFromCF, toFetch.password);
    } else {
      decrypted = CryptoJS.AES.decrypt(dataFromCF, "SecretPassphrase");
    }

    var toReturn = {
      data: decrypted.toString(CryptoJS.enc.Utf8)
    };

    if(toReturn.data === ""){
      throw new Error("Either the password is wrong or the data is empty")
    }

    if(toFetch.key.startsWith("rO-")) {
      await BRAVO68WEB.delete(toFetch.key)
    }

    const returnData = JSON.stringify(toReturn, null, 2);
    return wrapCorsHeader(new Response(returnData, {
      headers: reqHeaders
    }))
  } catch (err) {
    console.log(err)
    return new Response(err, {
      headers: reqHeaders
    })
  }
})

router.all("*", () => new Response("404, not found!", {
  status: 404
}))

addEventListener('fetch', async (e) => {
  e.respondWith(router.handle(e.request, e))
})