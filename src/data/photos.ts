export type Photo = { file: string; caption: string }

/**
 * Gallery photos live in public/photos (full size, ~1350×1800) and
 * public/photos/thumb (900px). Run new photos through scripts/photos.py
 * so both sizes exist and EXIF (including GPS) is stripped.
 */
export const photos: Photo[] = [
  { file: 'IMG_7413.jpg', caption: 'Above the clouds' },
  { file: 'IMG_4486.jpg', caption: 'Taj Mahal, Agra' },
  { file: 'IMG_8158.jpg', caption: 'Red room' },
  { file: 'IMG_5041.jpg', caption: 'Last light over the hills' },
  { file: 'IMG_7654.jpg', caption: 'Wingtip, golden hour' },
  { file: 'IMG_6917.jpg', caption: 'Into the fog' },
  { file: 'IMG_2774.jpg', caption: 'Rooftops & cumulus' },
  { file: 'IMG_7126.jpg', caption: 'Night market' },
  { file: 'IMG_2947.jpg', caption: 'Slow breakfast' },
  { file: 'IMG_6468.jpg', caption: 'Christmas at altitude' },
  { file: 'IMG_4295.jpg', caption: 'Unboxed' },
  { file: 'IMG_5613.jpg', caption: 'Croissant & roast tomatoes' },
  { file: 'IMG_7323.jpg', caption: 'Home-cooked' },
]

export const photoSrc = (p: Photo, size: 'thumb' | 'full' = 'thumb') =>
  size === 'thumb' ? `/photos/thumb/${p.file}` : `/photos/${p.file}`
