import {serialize, CookieSerializeOptions, parse} from 'cookie'
import {NextApiResponse, NextApiRequest} from 'next'
import signature from 'cookie-signature'

/**
 * This sets `cookie` using the `res` object
 */

const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k]
        return acc
      }, {}),
    {},
  )

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

export const clearCookie = (
  res: NextApiResponse,
  name: string,
  options: CookieSerializeOptions = {},
) => {
  const opts = merge({expires: new Date(1), path: '/'}, options)
  const stringValue = ''
  res.setHeader('Set-Cookie', serialize(name, String(stringValue), opts))
}

export type ResponseWithCookie = NextApiResponse & {
  cookie: (name: any, value: any, options: any) => void
  clearCookie: (name: string, options?: CookieSerializeOptions) => void
}

export type RequestWithCookie = NextApiRequest & {
  cookie: (name: any, value: any, options: any) => void
  clearCookie: (name: string, options?: CookieSerializeOptions) => void
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */

type handler = (req: NextApiRequest, res: ResponseWithCookie) => Promise<void>

const cookies = (handler: handler, _secret?: string) => (
  req: NextApiRequest,
  res: ResponseWithCookie,
) => {
  res.cookie = (
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {},
  ) => setCookie(res, name, value, options)

  res.clearCookie = (name: string, options: CookieSerializeOptions = {}) =>
    clearCookie(res, name, options)

  return handler(req, res)
}

/**
 * Parse Cookie header and populate `req.cookies`
 * with an object keyed by the cookie names.
 *
 * @param {string|array} [secret] A string (or array of strings) representing cookie signing secret(s).
 * @param {Object} [options]
 * @return {Function}
 * @public
 */

export function cookieParser(
  secret: string,
  options: CookieSerializeOptions = {},
) {
  const secrets = !secret || Array.isArray(secret) ? secret || [] : [secret]

  return function cookieParser(
    req: {
      cookies: object
      headers: {cookie: any}
      secret: string
      signedCookies: object
    },
    _res: any,
    next: () => void,
  ) {
    if (req.cookies) {
      return next()
    }

    const cookies = req.headers.cookie

    req.secret = secrets[0]
    req.cookies = Object.create(null)
    req.signedCookies = Object.create(null)

    // no cookies
    if (!cookies) {
      return next()
    }

    req.cookies = parse(cookies, options)

    // parse signed cookies
    if (secrets.length !== 0) {
      req.signedCookies = signedCookies(req.cookies, secrets)
      req.signedCookies = JSONCookies(req.signedCookies)
    }

    // parse JSON cookies
    req.cookies = JSONCookies(req.cookies)

    next()
  }
}

/**
 * Parse JSON cookie string.
 *
 * @param {String} str
 * @return {Object} Parsed object or undefined if not json cookie
 * @public
 */

function JSONCookie(str: string) {
  if (typeof str !== 'string' || str.substr(0, 2) !== 'j:') {
    return undefined
  }

  try {
    return JSON.parse(str.slice(2))
  } catch (err) {
    return undefined
  }
}

/**
 * Parse JSON cookies.
 *
 * @param {Object} obj
 * @return {Object}
 * @public
 */

function JSONCookies(obj: object) {
  const cookies = Object.keys(obj)
  let key: string
  let val: any

  for (let i = 0; i < cookies.length; i++) {
    key = cookies[i]
    val = JSONCookie(obj[key])

    if (val) {
      obj[key] = val
    }
  }

  return obj
}

/**
 * Parse a signed cookie string, return the decoded value.
 *
 * @param {String} str signed cookie string
 * @param {string|array} secret
 * @return {String} decoded value
 * @public
 */

function signedCookie(str: string, secret: any) {
  if (typeof str !== 'string') {
    return undefined
  }

  if (str.substr(0, 2) !== 's:') {
    return str
  }

  const secrets = !secret || Array.isArray(secret) ? secret || [] : [secret]

  for (let i = 0; i < secrets.length; i++) {
    const val = signature.unsign(str.slice(2), secrets[i])

    if (val !== false) {
      return val
    }
  }

  return false
}

/**
 * Parse signed cookies, returning an object containing the decoded key/value
 * pairs, while removing the signed key from obj.
 *
 * @param {Object} obj
 * @param {string|array} secret
 * @return {Object}
 * @public
 */

function signedCookies(obj: {[x: string]: any}, secret: string | string[]) {
  const cookies = Object.keys(obj)
  let dec: string | boolean
  let key: string
  let ret = Object.create(null)
  let val: any

  for (let i = 0; i < cookies.length; i++) {
    key = cookies[i]
    val = obj[key]
    dec = signedCookie(val, secret)

    if (val !== dec) {
      ret[key] = dec
      delete obj[key]
    }
  }

  return ret
}

export default cookies
