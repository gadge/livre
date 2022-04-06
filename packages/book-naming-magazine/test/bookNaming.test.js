import { parsePath }          from '@acq/path'
import { decoString, logger } from '@spare/logger'
import { rename }             from '../src/rename'

export const candidates = [
  'Best of Detail Fassaden Facades by Christian Schittich (z-lib.org).pdf',
  'Islamic Geometric Patterns Their Historical Development and Traditional Methods of Construction by Jay Bonner (z-lib.org).pdf',
  'Layout Essentials Revised And Updated 100 Design Principles For Using Grids by Beth Tondreau (z-lib.org).pdf',
  'Materials and Design The Art and Science of Material Selection in Product Design by Michael F. Ashby, Kara Johnson (z-lib.org).pdf',
  'Signage and Wayfinding Design A Complete Guide to Creating Environmental Graphic Design Systems by Chris Calori, David Vanden-Eynden (z-lib.org).pdf',
  'Smashing Logo Design The Art of Creating Visual Identities by Gareth Hardy (z-lib.org).epub',
  'The Art of Typography An Introduction to Typo.Icon.Ography by Martin Solomon (z-lib.org).pdf',
  'Stand by Me by Liam Gallagher, Paul Authors, Andy Bell, Wak-wok Pearce.pdf',
]


for (let candidate of candidates) {
  const o = parsePath(candidate)
  o.base |> rename |> decoString|> logger
}
