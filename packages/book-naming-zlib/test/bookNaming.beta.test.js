import { deco, decoString, logger } from '@spare/logger'
import { FRESH }                    from '@palett/presets'
import { rename }                   from '../src/beta/rename.beta'

export const CANDIDATES = [
  'Aesthetic Labour Rethinking Beauty Politics in Neoliberalism (Ana Sofia Elias, Rosalind Gill etc.) (z-lib.org).pdf',
  'Architecture of the Islamic West. North Africa and the Iberian Peninsula, 700–1800 (Jonathan M. Bloom) (z-lib.org).pdf',
  'Bread Winner An Intimate History of the Victorian Economy (Emma Griffin) (z-lib.org).pdf',
  'Consumer Sexualities Women and Sex Shopping (Rachel Wood) (z-lib.org).pdf',
  'Cultural Linguistics Cultural Conceptualisations and Language (Farzad Sharifian) (z-lib.org).pdf',
  'Digitalization in the Luxury Fashion Industry Strategic Branding for Millennial Consumers (Anna Cabigiosu) (z-lib.org).pdf',
  'Face Value The Irresistible Influence of First Impressions (Project Muse.Todorov, Alexander B) (z-lib.org).pdf',
  'Florence Under Siege Surviving Plague in an Early Modern City (John Henderson) (z-lib.org).pdf',
  'Internationalization of Luxury Fashion Firms Examining the Business Models of SMEs (Andrea Runfola, Matilde Milanesi etc.) (z-lib.org).pdf',
  'Language Change and Sociolinguistics Rethinking Social Networks (Jonathan Marshall (auth.)) (z-lib.org).pdf',
  'Language, Culture, and Society An Introduction to Linguistic Anthropology (James Stanlaw  Nobuko Adachi  Zdenek Salzmann) (z-lib.org).pdf',
  'Le corps et lʻâme. De Donatello a Michel-Ange. Sculptures italiennesde la Renaissance (Marc Bormand) (z-lib.org).pdf',
  'Mantegna and Bellini. A Renaissance Family (Caroline Campbell, Dagmar Korbacher etc.) (z-lib.org).pdf',
  'Marketing Channel Strategy An Omni-Channel Approach (Ansary, Adel I. Palmatier, Robert W. Sivadas etc.) (z-lib.org).pdf',
  'One Dough, Ten Breads Making Great Bread by Hand (Sarah Black, Lauren Volo (photo)) (z-lib.org).pdf',
  'Principles of Linguistic Change, Volume 1 Internal Factors (William Labov) (z-lib.org).pdf',
  'Principles of Linguistic Change, Volume 2 Social Factors (William Labov) (z-lib.org).pdf',
  'Principles of Linguistic Change, Volume 3 Cognitive and Cultural Factors (William Labov) (z-lib.org).pdf',
  'SOC+ Introduction to Sociology (Robert J. Brym, John Lie) (z-lib.org).pdf',
  'Sociolinguistics Method and Interpretation (Language in Society) (Lesley Milroy, Matthew Gordon) (z-lib.org).pdf',
  'Style and Sociolinguistic Variation (Penelope Eckert, John R. Rickford) (z-lib.org).pdf',
  'The Cambridge handbook of sociolinguistics (Mesthrie, Rajend) (z-lib.org).pdf',
  'The Fashion System (Roland Barthes) (z-lib.org).pdf',
  'The Rise and Fall of Modern Empires, Volume I Social Organization (Philippa Levine Owen White) (z-lib.org).pdf',
  'The Rise and Fall of Modern Empires, Volume II Colonial Knowledges (Saul Dubow) (z-lib.org).pdf',
  'The Rise and Fall of Modern Empires, Volume III Economics and Politics (Saul Dubow,  Philippa Levine, Martin Shipway etc.) (z-lib.org).pdf',
  'The Rise and Fall of Modern Empires, Volume IV Reactions to Colonialism (Saul Dubow, Martin Shipway, Sarah Stockwell etc.) (z-lib.org).pdf',
  'The Social Stratification of English in New York City (William Labov) (z-lib.org).pdf',
  'Time in Fashion Industrial, Antilinear and Uchronic Temporalities (Caroline Evans (editor) etc.) (z-lib.org).pdf',
]

const test = () => {
  for (let candidate of CANDIDATES) {
    const output = candidate |> rename;
    [decoString(candidate), decoString(output, { presets: FRESH })]  |> deco  |> logger
  }
}

test()
