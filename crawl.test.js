import { normalizeURL, getLinksFromHTML } from "./crawl"
import { test, expect } from "@jest/globals"

// const normalizeURL = require('./crawl')

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
test('normalizeURL slash', () => {
const input = 'https://blog.boot.dev/path/'
const actual = normalizeURL(input)
const expected = 'blog.boot.dev/path'
expect(actual).toEqual(expected)
})
  
test('normalizeURL capitals', () => {
const input = 'https://BLOG.boot.dev/path'
const actual = normalizeURL(input)
const expected = 'blog.boot.dev/path'
expect(actual).toEqual(expected)
})
  
test('normalizeURL http', () => {
const input = 'http://BLOG.boot.dev/path'
const actual = normalizeURL(input)
const expected = 'blog.boot.dev/path'
expect(actual).toEqual(expected)
})

test('getURLFromHTML', () => {
  const input = '<body><a href="/index/thing">Learn Backend Development</a> <a href="http://BLOG.boot.dev/path"</a></body>'
  const baseURL = 'boot.dev'
  const actual = getLinksFromHTML(input, baseURL)
  const expected = ['boot.dev/index/thing','http://blog.boot.dev/path']
  expect(actual).toEqual(expected)
})

test('getURLFromHTML', () => {
  const input = '<body><a href="http://blog.boot.dev/path"</a></body>'
  const baseURL = 'boot.dev'
  const actual = getLinksFromHTML(input, baseURL)
  const expected = ['http://blog.boot.dev/path']
  expect(actual).toEqual(expected)
})