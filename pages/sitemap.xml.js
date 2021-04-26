import React from 'react'
import Storyblok from '@utils/storyblok'

const EXTERNAL_DATA_URL = 'https://next-storyblok.playground.netlify.app'

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts
          .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
                    </url>
                `
          })
          .join('')}
    </urlset>
    `



class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    // Use the Storyblok Client.
    // const data = await Storyblok.getAll('cdn/links', {
    //   version: 'published',
    // })
    // Or... You can use graphQL with the API
    const query = `
      query getLinks {
        Links {
          items {
            published
            slug
          }
        }
      }
    `
    const { data, error } = await (await fetch('https://gapi.storyblok.com/v1/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Token: process.env.STORYBLOK_API_KEY,
      },
      body: JSON.stringify({
        query
      })
    })).json()
    if (error) throw new Error('Fetching Error', error)
    res.setHeader('Content-Type', 'text/xml')
    res.write(createSitemap(data.Links.items.filter(s => s.published)))
    res.end()
  }
}

export default Sitemap
