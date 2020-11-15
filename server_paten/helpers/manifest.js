const generateManifest = (id, name, image_url) => {
  return {
    short_name: `${name} App`,
    name: `${name}`,
    icons: [
      {
        src: `${image_url}`,
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: `${image_url}`,
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: `${image_url}`,
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    start_url: `https://shopmaker-pwa.web.app/${id}/shop`,
    scope: `https://shopmaker-pwa.web.app/${id}/shop`,
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
  }
}

module.exports = generateManifest
