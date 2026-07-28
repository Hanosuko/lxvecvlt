function roundedPath(ctx: CanvasRenderingContext2D, size: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.arcTo(size, 0, size, size, r)
  ctx.arcTo(size, size, 0, size, r)
  ctx.arcTo(0, size, 0, 0, r)
  ctx.arcTo(0, 0, size, 0, r)
  ctx.closePath()
}

export function setRoundedFavicon(src: string, size = 128, radiusPct = 20) {
  const smallSrc = src.replace(/\/\d+x\d+bb/, '/256x256bb')

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      roundedPath(ctx, size, (size * radiusPct) / 100)
      ctx.clip()
      ctx.drawImage(img, 0, 0, size, size)

      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.type = 'image/png'
      link.href = canvas.toDataURL('image/png')
    } catch {
    }
  }
  img.src = smallSrc
}
