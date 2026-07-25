import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ABJAD Kids Parent Portal',
    short_name: 'ABJAD Kids',
    description: 'Kids learn the Arabic alphabet through play with ABJAD Kids, a safe and ad-free learning app for children.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF9F1',
    theme_color: '#2B4238',
    icons: [
      {
        src: '/abjad.svg',
        sizes: '192x192',
        type: '/svg+xml',
      },
      {
        src: '/abjad.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
