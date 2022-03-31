import { renameAuthors } from '../src/alpha/renameAuthors.js'
import { decoString }    from '@spare/logger'

export const NAME_LIST = [
  'Liam Gallagher, Paul Authors, Andy Bell, Wak-wok Pearce',
  'Ana Sofia Elias, Rosalind Gill etc.',
  'Whitehead, Robert',
  'Ansary, Adel I. Palmatier, Robert W. Sivadas etc.',
  'Saul Dubow,  Philippa Levine, Martin Shipway etc.',
  'Saul Dubow, Martin Shipway, Sarah Stockwell etc.',
  'Alan W. Partin MD PhD, Louis R. Kavoussi MD MBA, Craig A. Peters MD FACS FAAP, Roger R. Dmochowski MD MMHC FACS',
  'Didier Maleuvre (auth.)',
  'Jacque Lynn Foltyn (editor), Laura Petican (editor)',
  'Julie Emontspool,Ian Woodward (eds.)',
  'Dr. Frederick F. Wherry (editor), Dr. Ian Woodward (editor)',
  'Claudia Roden [Roden, Claudia]',
  'Aesthetic Movement (Firm)',
  'Deborah Lupton (editor), Zeena Feldman (editor)',
  'Kathleen Lebesco, Peter Naccarato (Eds.)',
  'Stokstad, MarilynCothren, Michael Watt(Contributor)',
]


const test = () => {
  for (let authors of NAME_LIST) {
    console.log(decoString(authors), '=>', decoString(renameAuthors(authors)))
  }
}

test()